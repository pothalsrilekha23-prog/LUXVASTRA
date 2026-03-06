//import redis from "../config/redis.js";

export const cacheBanners = async (req, res, next) => {
  try {
    const cachedData = await redis.get("banners");

    if (cachedData) {
      console.log("Serving from cache");
      return res.json(JSON.parse(cachedData));
    }

    // Override res.json
    const originalJson = res.json.bind(res);

    // res.json = async (data) => {
    //   await redis.set("banners", JSON.stringify(data), {
    //     EX: 60 // expires in 60 seconds
    //   });

    //  return originalJson(data);
    // };

    next();
  } catch (err) {
    console.error("Redis error:", err);
    next();
  }
};