import pool from "../db.js";

export const addToCart= async(req , res)=>{

    try 
    {
        const user_id=req.params.user_id;
        const {product_id, quantity, seller_id}=req.body;
        
        if(!user_id || !product_id || !seller_id || !quantity)
        {
            return res.status(400).json({message:"All Fields Are Required"});

        }

        //check the cart is exits or not

        let [cart_exist]= await pool.query(` SELECT * FROM cart WHERE user_id=?`,[user_id]);

        let cart_id;

        if(cart_exist.length === 0)
        {
           const[newCart]=await pool.query(`INSERT INTO cart (user_id) VALUES (?)`,
            [user_id]);

            cart_id=newCart.insertId;
        }
        else{
            cart_id=cart_exist[0].cart_id;
        }

        //check product exis or not in cart
        const[itemexist]=await pool.query(`SELECT * FROM cart_items WHERE 
        cart_id=? AND product_id=? AND seller_id=?`,
        [cart_id,product_id,seller_id]);

        // to get the product price 
        const [product]=await pool.query(`SELECT final_price 
        FROM product_seller WHERE product_id=? AND seller_id=? `,[product_id,seller_id]);

        // If product not there
        if(product.length===0){
            return res.status(404).json({message:"Product Not Found"});
        }

        const price=product[0].final_price;
       
        // if product already there in cart add the qunatity
        if(itemexist.length>0)
        {
            const newQuan=itemexist[0].quantity + quantity;
            const total_price=newQuan * price;

            await pool.query(`UPDATE cart_items 
            SET quantity = ?, total_price= ? WHERE cart_item_id=?`,
            [newQuan, total_price, itemexist[0].cart_item_id]);
        }
        // if prodct not there in the cart add to cart
        else
        {
             const totalPrice=price * quantity;

          await pool.query(`INSERT INTO cart_items 
          (cart_id,product_id,seller_id,quantity,price,total_price) 
          VALUES (?,?,?,?,?,?)`,
          [cart_id,product_id,seller_id,quantity,price,totalPrice]
           );
        }

        res.status(200).json({message:"item added success"});
    } 
    catch (error)  
    {
        res.status(500).json({message:"Server Error"});
    }
}

// read the product

export const getCartItems= async (req , res) => {

    try{
    const user_id=req.params.user_id;
    
    // to get thhe cart details of user
    const[cart]=await pool.query(`SELECT cart_id FROM cart WHERE user_id=?`,[user_id]);

    if(cart.length === 0)
    {
        return res.json({message:"Cart is empty",
            items:[], subTotal : 0
        });
    }
    
    // to get the items in cart
    const [items]= await pool.query(`SELECT * FROM cart_items 
        WHERE cart_id=?`,[cart[0].cart_id]);

        // to get subtotal of the products
    const subTotal=items.reduce((acc,item) => acc + item.total_price,0);
    
        res.json({
            items,
            subTotal
        });
    }
    catch (error) {
    res.status(500).json({message: "Server Error"  });
  }
}

// to update the quantity

export const updateItemQuantity= async(req, res) =>{

    try {
        const cart_item_id=req.params.cart_item_id;
        const{quantity}=req.body;

        if(!quantity || quantity<1)
        {
            return res.status(400).json({message:"Invalid Qunatiy"})
        }

        const[cart]=await pool.query(`SELECT * FROM cart_items WHERE cart_items_id=? `,[cart_item_id])

        const price=cart[0].price;
        const totalPrice= price * quantity;

        await pool.query(`UPDATE cart_items SET quantity=?,total_price=? 
            WHERE cart_items_id=? `,[quantity,totalPrice,cart_item_id]);

    } catch (error) {
        res.json({message:"Server Error"});
    }
}

// remove items from cart

export const removeItems=async(req, res)=>{
    try {
        
        const cart_item_id=req.params.cart_item_id;

        if(!cart_item_id) res.json({message:"cart not found"});

        await pool.query(`DELETE FROM cart_items WHERE cart_items_id=?`,[cart_item_id]);

        res.json({message:"Item removed"});

    } catch (error) {
        res.json({message:"Server Error"})
    }
}

// remove the whole cart

export const removeCart=async(req, res)=>{
    try {
        
        const id=req.params.user_id;

        if(!id) res.json({message:"User Not Found"});

        const[cart]=await pool.query(`SELECT cart_id from cart 
            WHERE user_id=?`,[id]);

        if(cart.length>0)
        {
            await pool.query(`DELETE FROM cart_items 
                WHERE cart_id=?`,[cart[0].cart_id]);
        }

    } catch (error) {
        
    }
}