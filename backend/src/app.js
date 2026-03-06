
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import {
  authRouter,
  buyBoxRoutes,
  bannerRouter,
  moderationRouter,
  aggregationRouter,
  sellerRouter,
  masterProductRouter,
  categoryRoutes,
  priceEngineRouter,
  imageRouter,
  productRouter,
  siteRouter,
  userpreferenceRouter,
  userprofileRouter,
  varaiantRouter,
  roleRouter,
  cartRouter,
  sellermappingRouter,
  reviewRouter,} from "../routes/authentication.js";
  import trustBadgeRoutes from "../trustBadge.js";
  import { requestLogger } from "../middlewares/requestLogger.js";
  import notificationRoutes from "../routes/notificationRoutes.js";

//import varaiantRouter from "../routes/variantRoutes.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { AppError } from "../utils/AppError.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins=process.env.CORS_ORIGINS.split(",");

app.use(
  cors({
    origin: function(origin,callback){
      if(!origin || allowedOrigins.includes(origin)) {
        callback(null,true)
      }else{
        callback(new Error("Not Allowed by CORS"))
      }
    
    },
    credentials:true,
  })
);

//------------------ Request Logger (Logging Task) ------------

app.use(requestLogger);

app.use("/api/auth/product", productRouter);
app.use("/api/auth/banners", bannerRouter);
app.use("/api/auth", authRouter);
app.use("/api/auth/trustbadge" ,trustBadgeRoutes);
app.use("/api/auth/sellermapping",sellermappingRouter);
app.use("/api/auth/buybox",buyBoxRoutes);
app.use("/api/auth/categories", categoryRoutes);
// app.use("/auth/variant",varaiantRouter);
app.use("/api/auth/userprofile",userprofileRouter);
app.use("/api/auth/userpreferences",userpreferenceRouter);
app.use("/api/auth/imageupload",imageRouter);
app.use("/api/auth/sitemap",siteRouter);
app.use("/api/auth/totalcount", aggregationRouter);
app.use("/api/auth/masterproducts",masterProductRouter);
app.use("/api/auth",priceEngineRouter);
app.use("/api/auth/reviews",reviewRouter);
app.use("/api/auth/moderation", moderationRouter);
app.use("/api/auth/sellerratings", sellerRouter);
app.use("/api/auth/count-img",varaiantRouter);
app.use("/api/auth/cart",cartRouter);
app.use("/api/auth/notifications", notificationRoutes);

// app.use("/api", variantMappingRoutes);
// app.use("/api/trust-badges", trustBadgeRoutes);


app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

export default app;