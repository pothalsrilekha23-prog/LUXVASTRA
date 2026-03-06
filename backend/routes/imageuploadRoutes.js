// const router = require("express").Router();
// const multer = require("multer");
// const imageQueue = require("../jobs/imageJob.js")
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + "-" + file.originalname)
// });

// const upload = multer({ storage });

// router.post("/", upload.single("image"), async (req, res) => {

//   // Push job to queue
//   await imageQueue.add({
//     image: req.file.filename
//   });

//   res.json({
//     imageUrl: `http://localhost:4000/uploads/${req.file.filename}`
//   });
// });

// module.exports = router;