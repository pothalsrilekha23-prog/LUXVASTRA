
import pool from "../db.js";
import express from "express";
const sellerrouter = express.Router();

export const addProductMapping = async (req, res) => {
  try {
// const seller_id = req.body.seller_id;
    const { product_id,seller_id, sku, selling_price, stock, shipping_days } = req.body;

    await pool.query(
      `INSERT INTO product_sellers
       (product_id, seller_id, sku, selling_price, stock, shipping_days)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [product_id, seller_id, sku, selling_price, stock, shipping_days]
    );

    res.json({ message: "Product mapped successfully" });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const viewSellerProducts = async (req, res) => {
  try {
    // const seller_id = req.body.seller_id;

    const [products] = await pool.query(
      `SELECT ps.*, p.name
       FROM product_sellers ps
       JOIN products p ON ps.product_id = p.id
       WHERE ps.seller_id = ?`,
      [seller_id]
    );

    res.json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const updateSellerProduct = async (req, res) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // const seller_id = req.body.seller_id;
    const { mappingId } = req.params;
    const { selling_price, stock } = req.body;

    const [[product]] = await conn.query(
      `SELECT stock FROM product_sellers
       WHERE id = ? AND seller_id = ?
       FOR UPDATE`,
      [mappingId, seller_id]
    );

    if (!product)
      return res.status(403).json({ message: "Unauthorized" });

    const previousStock = product.stock;
    const newStock = stock;

    await conn.query(
      `UPDATE product_sellers
       SET selling_price = ?, stock = ?
       WHERE id = ? AND seller_id = ?`,
      [selling_price, stock, mappingId, seller_id]
    );

    await conn.query(
      `INSERT INTO stock_logs
       (product_seller_id, change_type, quantity,
        previous_stock, new_stock, reference_type)
       VALUES (?, 'ADJUSTMENT', ?, ?, ?, 'MANUAL')`,
      [
        mappingId,
        Math.abs(newStock - previousStock),
        previousStock,
        newStock
      ]
    );

    await conn.commit();

    res.json({ message: "Product updated successfully" });

  } catch (err) {
    await conn.rollback();
    res.status(400).json({ error: err.message });
  } finally {
    conn.release();
  }
};



export const acceptOrder = async (req, res) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // const seller_id = req.body.seller_id;
    const { orderItemId } = req.params;

    const [[orderItem]] = await conn.query(
      `SELECT oi.id, oi.quantity, oi.product_seller_id,
              ps.stock
       FROM order_items oi
       JOIN product_sellers ps ON oi.product_seller_id = ps.id
       WHERE oi.id = ? AND ps.seller_id = ?
       FOR UPDATE`,
      [orderItemId, seller_id]
    );

    if (!orderItem)
      return res.status(403).json({ message: "Unauthorized" });

    if (orderItem.stock < orderItem.quantity)
      return res.status(400).json({ message: "Insufficient stock" });

    const previousStock = orderItem.stock;
    const newStock = previousStock - orderItem.quantity;

    await conn.query(
      `UPDATE product_sellers SET stock = ? WHERE id = ?`,
      [newStock, orderItem.product_seller_id]
    );

    await conn.query(
      `UPDATE order_items SET seller_status = 'Accepted'
       WHERE id = ?`,
      [orderItemId]
    );

    await conn.query(
      `INSERT INTO stock_logs
       (product_seller_id, change_type, quantity,
        previous_stock, new_stock, reference_type, reference_id)
       VALUES (?, 'OUT', ?, ?, ?, 'ORDER', ?)`,
      [
        orderItem.product_seller_id,
        orderItem.quantity,
        previousStock,
        newStock,
        orderItemId
      ]
    );

    await conn.commit();

    res.json({ message: "Order accepted & stock reduced" });

  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
};



export const cancelOrder = async (req, res) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // const seller_id = req.body.seller_id;
    const { orderItemId } = req.params;

    const [[orderItem]] = await conn.query(
      `SELECT oi.id, oi.quantity, oi.product_seller_id,
              oi.seller_status, ps.stock
       FROM order_items oi
       JOIN product_sellers ps ON oi.product_seller_id = ps.id
       WHERE oi.id = ? AND ps.seller_id = ?
       FOR UPDATE`,
      [orderItemId, seller_id]
    );

    if (!orderItem)
      return res.status(403).json({ message: "Unauthorized" });

    if (orderItem.seller_status !== "Accepted")
      return res.status(400).json({ message: "Only accepted orders can be cancelled" });

    const previousStock = orderItem.stock;
    const newStock = previousStock + orderItem.quantity;

    await conn.query(
      `UPDATE product_sellers SET stock = ? WHERE id = ?`,
      [newStock, orderItem.product_seller_id]
    );

    await conn.query(
      `UPDATE order_items SET seller_status = 'Cancelled'
       WHERE id = ?`,
      [orderItemId]
    );

    await conn.query(
      `INSERT INTO stock_logs
       (product_seller_id, change_type, quantity,
        previous_stock, new_stock, reference_type, reference_id)
       VALUES (?, 'IN', ?, ?, ?, 'CANCEL', ?)`,
      [
        orderItem.product_seller_id,
        orderItem.quantity,
        previousStock,
        newStock,
        orderItemId
      ]
    );

    await conn.commit();

    res.json({ message: "Order cancelled & stock restored" });

  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
};



export const approveReturn = async (req, res) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // const seller_id = req.body.seller_id;
    const { returnId } = req.params;

    const [[returnData]] = await conn.query(
      `SELECT r.id, r.order_item_id,
              oi.product_seller_id, oi.quantity,
              ps.stock
       FROM returns r
       JOIN order_items oi ON r.order_item_id = oi.id
       JOIN product_sellers ps ON oi.product_seller_id = ps.id
       WHERE r.id = ? AND ps.seller_id = ?
       FOR UPDATE`,
      [returnId, seller_id]
    );

    if (!returnData)
      return res.status(403).json({ message: "Unauthorized" });

    const previousStock = returnData.stock;
    const newStock = previousStock + returnData.quantity;

    await conn.query(
      `UPDATE product_sellers SET stock = ? WHERE id = ?`,
      [newStock, returnData.product_seller_id]
    );

    await conn.query(
      `UPDATE returns SET status = 'Approved' WHERE id = ?`,
      [returnId]
    );

    await conn.query(
      `UPDATE order_items SET seller_status = 'Returned'
       WHERE id = ?`,
      [returnData.order_item_id]
    );

    await conn.query(
      `INSERT INTO stock_logs
       (product_seller_id, change_type, quantity,
        previous_stock, new_stock, reference_type, reference_id)
       VALUES (?, 'IN', ?, ?, ?, 'RETURN', ?)`,
      [
        returnData.product_seller_id,
        returnData.quantity,
        previousStock,
        newStock,
        returnId
      ]
    );

    await conn.commit();

    res.json({ message: "Return approved & stock updated" });

  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
};