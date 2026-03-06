const express = require("express");
const router = express.Router();
const verifyToken = require("../address-apis/src/middleware/verifyToken");
const controller = require("../controllers/addressController");

router.post("/", verifyToken, controller.addAddress);
router.get("/", verifyToken, controller.getAddresses);
router.put("/default/:addressId", verifyToken, controller.setDefaultAddress);
router.delete("/:id", verifyToken, controller.deleteAddress);

module.exports = router;
