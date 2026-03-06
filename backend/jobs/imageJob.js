// const Queue = require("bull");

// const imageQueue = new Queue("image-processing", {
//   redis: {
//     host: "127.0.0.1",
//     port: 6379
//   }
// });

// imageQueue.process(async (job) => {
//   console.log("Processing image:", job.data.image);

//   // Background logic here
// });

// module.exports = imageQueue;