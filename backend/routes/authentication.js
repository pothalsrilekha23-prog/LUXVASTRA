import express from "express";
//import axios from "axios";
import { authenticate } from "../middlewares/authenticate.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { ROLES } from "../constants/roles.js";

// -----------------  USER ,ADMIN,VENDOR APIS-------------------------------
import { 
  loginUser,
  userloginVerify,
  userregisterRequest,
  userregisterVerify, 
  adminresetPassword, 
  adminLogin,
  regristeResendOtp/* sellerresetPassword,sellerecomLogin,
    sellerecomRegister*/ } from "../controllers/auth.js";

//--------------------------BANNERS CRUD APIS---------------------
 import { cacheBanners } from "../middlewares/cacheBanners.js";
    import {
      createBanner,
      getAllBanners,
      getBannerById,
      updateBanner,
      deleteBanner
    } from "../controllers/bannerController.js";

// ---------------------------------CATEGORY CRUD----------------------------------
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/categorycrud.js";

// ------------------------------IMAGE UPLOAD-----------------------
import { upload } from "../middlewares/upload.middleware.js";
import { uploadProductImage } from "../controllers/imageController.js";

//--------------------------PRODUCTS CRUD----------------
import { 
  allProducts,
  getproductById,
  createProduct,
  getProductBySlugController,
  updateProductDetails,
  deleteProductById } from "../controllers/ProductController.js";

//--------------------------------SITEMAP------------------
import { generateSitemap } from "../controllers/sitemapxml.js";

//----------------------USER PREFERENCES----------------------
import { 
  getUserPreferences,
  updateUserPreferences,
  updateLocation,
  addRecentlyViewed,
  addToWishlist,
  saveSearchTerm } from "../controllers/userpreferences.js";

//--------------------------USER PROFILE CRUD---------------------
import { 
  getProfile,
  updateProfile,
  deleteAccount } from "../controllers/userProfileController.js";

//--------------------MASTER  PRODUCT -------------
import { 
  getallMasterProduct,
  createMasterProduct,
  getMasterProductById,
  updateMasterProductById,
  deleteMasterProduct } from "../controllers/masterProduct.js";

//----------------------------REVIEWS -------------------------------
import { 
  createReview,
  readReviews,
  updateReview,
  deleteReview
 } from "../controllers/reviewsController.js";

//------------------------------PRICING  ENGINE-------------
import { priceEngine } from "../controllers/priceEngine.js";

//---------------------Moderation----------------
import { 
  getPendingItems,
  approveItem,
  rejectItem
 } from "../service/moderationServices.js";

 //------------------------------------SELLER RATING ------------------------
 import { 
  addRatingController,
  getRatingController
 } from "../controllers/ratingContoller.js";

 //-------------- PRODUCTS VARIANT(NO OF IMAGES to be UPLOAD)------------------

// import { upload } from "../middlewares/upload.middleware.js";
import {
  uploadVariantImages,
  getVariantsByProduct
} from "../controllers/variantController.js";

//-----------------------------------AGGREGATION ---------------------

import{
approveReview
} from "../controllers/aggregation.js";

//-----------------------------------BUY BOX---------------------
import { 
  getBuyBoxWinner 
} from "../controllers/buyBoxController.js";

//-----------------------------------SELLER MAPPING-------------------------
import {
  addProductMapping,
  viewSellerProducts,
  updateSellerProduct,
  acceptOrder,
  cancelOrder,
  approveReturn
} from "../controllers/sellermappingController.js";

//-------------------------Cart CRUD operations------
import { 
  addToCart,
  updateItemQuantity,
  getCartItems,
  removeItems,
  removeCart, 
 } from "../controllers/CartControllers.js";

//--------------------------------ALL ROUTES-------------------------------
  const authRouter=express.Router();
  const aggregationRouter=express.Router();
  const bannerRouter=express.Router();
  const categoryRoutes=express.Router();
  const imageRouter=express.Router();
  const productRouter=express.Router();
  const siteRouter=express.Router();
  const userpreferenceRouter=express.Router();
  const userprofileRouter=express.Router();
  const roleRouter=express.Router();
  const masterProductRouter=express.Router();
  const priceEngineRouter=express.Router();
  const reviewRouter=express.Router();
  const moderationRouter=express.Router();
  const sellerRouter=express.Router();
  const varaiantRouter = express.Router();
  const  buyBoxRoutes= express.Router();
  const sellermappingRouter=express.Router();
  const cartRouter=express.Router();


// ----------------------------ALL API LINKS-----------------------------

//-----------------USER ,ADMIN,VENDOR-----------------------
authRouter.post("/user-registerrequest",userregisterRequest);
authRouter.post("/user-registerverify",userregisterVerify);
authRouter.post("/user-registerresendotp",regristeResendOtp);
authRouter.post("/user-login",loginUser);
authRouter.post("/user-loginverify",userloginVerify);
authRouter.post("/resend-otp", regristeResendOtp);
authRouter.post("/admin-login", adminLogin);
authRouter.post("/admin-resetpassword", adminresetPassword);
// authRouter.post("/seller-ResetPassword", sellerresetPassword)
// authRouter.post("/sellerecom-Login", sellerecomLogin)
// authRouter.post("/sellerecom-register", sellerecomRegister )

// -----------------------------------BANNERS------------------------------------
bannerRouter.post("/create-banner", createBanner);
bannerRouter.get("/allbanners",cacheBanners, getAllBanners);
bannerRouter.get("/banner/:id", getBannerById);
bannerRouter.put("/update-banner/:id", updateBanner);
bannerRouter.delete("/delete-banner/:id", deleteBanner);

//-----------------------------------CATEGORY CRUD-------------------------------
categoryRoutes.post("/", createCategory);
categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.put("/:id", updateCategory);
categoryRoutes.delete("/:id", deleteCategory);

//---------------------------------IMAGE UPLOAD--------------------------------------
imageRouter.post("/upload", upload.array("images"), uploadProductImage);

//--------------------------------AGGREGATION(Rating count)-------------------------
aggregationRouter.put("/approvereview", approveReview);

// -----------------------------------BUY BOX-----------------------------
buyBoxRoutes.get("/product/:productId", getBuyBoxWinner);

//--------------------------------PRODUCTS CRUD----------------------------------
productRouter.post("/", createProduct);
productRouter.put("/:id", authenticate, updateProductDetails);
productRouter.delete("/:id", authenticate, deleteProductById);

productRouter.get("/", allProducts);
productRouter.get("/slug/:slug", getProductBySlugController);  
productRouter.get("/:id", getproductById);

//-------------------------------------SITEMAP-------------------
siteRouter.get("/sitemap.xml", generateSitemap);

//---------------------------------USER PREFERENCES----------------------
userpreferenceRouter.get("/", getUserPreferences);
userpreferenceRouter.put("/location", updateLocation);
userpreferenceRouter.put("/update/:id", updateUserPreferences);
userpreferenceRouter.post("/recently-viewed", addRecentlyViewed);
userpreferenceRouter.post("/wishlist", addToWishlist);
userpreferenceRouter.post("/search", saveSearchTerm);

//-----------------------------USER PROFILE CRUD------------------
userprofileRouter.post("/user-getprofile",getProfile);
userprofileRouter.post("/user-updateprofile",authenticate,updateProfile);
userprofileRouter.post("/user-deleteaccount",deleteAccount);

//---------------------------------MASTER PRODUCT----------------------
masterProductRouter.post("/create",createMasterProduct);
masterProductRouter.get("/getAll",getallMasterProduct);
masterProductRouter.get("/getById/:id",getMasterProductById);
masterProductRouter.put("/update/:id",updateMasterProductById);
masterProductRouter.delete("/delete/:id",deleteMasterProduct);

//--------------------------PRICING  ENGINE----------------------------------
priceEngineRouter.post("/price-engine/:productId",priceEngine);

//--------------------------------SELLER MAPPINNG------------------------------
sellermappingRouter.post("/products", addProductMapping);
sellermappingRouter.get("/products", viewSellerProducts);
sellermappingRouter.put("/products/:mappingId", updateSellerProduct);
sellermappingRouter.put("/orders/:orderItemId/accept", acceptOrder);
sellermappingRouter.put("/orders/:orderItemId/cancel", cancelOrder);
sellermappingRouter.put("/returns/:returnId/approve", approveReturn);

//------------------------------------REVIEW API----------------------------------------
reviewRouter.post("/createreview/:product_id/:user_id",createReview);
reviewRouter.get("/readreview/:product_id",readReviews);
reviewRouter.put("/updatereview/:review_id/:user_id",updateReview);
reviewRouter.delete("/deletereview",deleteReview);

//-------------------------------------MODERATION------------------------------------
moderationRouter.get("/pending", getPendingItems);
moderationRouter.post("/approve/:id", approveItem);
moderationRouter.post("/reject/:id", rejectItem);

//----------------------------------------SELLER RATING-------------------------------
sellerRouter.post("/",addRatingController );
sellerRouter.get("/:sellerId",getRatingController );

//----------------PRODUCTS VARIANT IMG COUNT (no of pics to be upload)------------
varaiantRouter.post("/variant/upload",upload.array("images", 20),uploadVariantImages);
varaiantRouter.get( "/variants/:productId",getVariantsByProduct);

//---------------------------CART CRUD---------------
cartRouter.post("/add/:user_id",addToCart);
cartRouter.get("/cartitems/:user_id",getCartItems);
cartRouter.put("/updatequantity/:cart_item_id",updateItemQuantity);
cartRouter.delete("/removeitems/:cart_item_id",removeItems);
cartRouter.delete("/removecart/:user_id",removeCart);

//-------------------------ROLE ACCESS----------------------------------------------------------

// superadmin  //

roleRouter.get(
  "/superadmin",
  authenticate,
  authorizeRoles(ROLES.SUPERADMIN),
  (req, res) => {
    res.json({ message: "Superadmin access granted" });
  }
);

//for superadmin and admin //

roleRouter.get(
  "/admin",
  authenticate,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  (req, res) => {
    res.json({ message: "Admin / Superadmin access granted" });
  }
);

// sellers //

roleRouter.get(
  "/seller",
  authenticate,
  authorizeRoles(ROLES.SELLER),
  (req, res) => {
    res.json({ message: "Seller access granted" });
  }
);

// for users //

roleRouter.get(
  "/profile",
  authenticate,
  (req, res) => {
    res.json({
      message: "Authenticated user",
      user: req.user
    });
  }
);

export {
  authRouter,
  bannerRouter,
  aggregationRouter,
  categoryRoutes,
  imageRouter,
  productRouter,
  siteRouter,
  varaiantRouter,
  userpreferenceRouter,
  userprofileRouter,
  roleRouter,
  masterProductRouter,
  priceEngineRouter,
  reviewRouter,
  moderationRouter,
  sellerRouter,
  buyBoxRoutes,
  cartRouter,
  sellermappingRouter
}