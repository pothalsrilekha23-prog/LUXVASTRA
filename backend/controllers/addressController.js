const db = require("../address-apis/src/config/db");

exports.addAddress = (req, res) => {
  const userId = req.userId;
  const {
    name, phone, pincode, house_flat,
    area, landmark, city, state,
    address_type, is_default
  } = req.body;

  if (is_default) {
    db.query(
      "UPDATE addresses SET is_default = false WHERE user_id = ?",
      [userId]
    );
  }

  const sql = `
    INSERT INTO addresses
    (user_id, name, phone, pincode, house_flat, area, landmark, city, state, address_type, is_default)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    userId, name, phone, pincode,
    house_flat, area, landmark,
    city, state, address_type, is_default
  ], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Address added successfully" });
  });
};

// Get saved address
exports.getAddresses = (req, res) => {
  db.query(
    "SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC",
    [req.userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// set default address
exports.setDefaultAddress = (req, res) => {
  const { addressId } = req.params;

  db.query(
    "UPDATE addresses SET is_default = false WHERE user_id = ?",
    [req.userId]
  );

  db.query(
    "UPDATE addresses SET is_default = true WHERE id = ? AND user_id = ?",
    [addressId, req.userId],
    () => res.json({ message: "Default address updated" })
  );
};


// delete address
exports.deleteAddress = (req, res) => {
  db.query(
    "DELETE FROM addresses WHERE id = ? AND user_id = ?",
    [req.params.id, req.userId],
    () => res.json({ message: "Address deleted" })
  );
};
