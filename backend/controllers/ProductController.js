// import { 
//     getAllProducts,
//     createNewProduct,
//     getProductById,
//     updateProduct,
//     deleteProduct
//  } from "../service/products.js";


//  // Get all produuts

//  export const allProducts=async(req  , res)=>{

//     try{
//     const products= await getAllProducts(req.query);

//     res.status(200).json({
//         success:true,
//         count:products.length,
//         data:products

//     });
//     }
//     catch (error){
//         res.status(500).json({message:"Server error"});
//     }
//  };

//  // Get product by id

//  export const getproductById=async(req , res)=>{

//     try{
//     const product=await getProductById(req.params.id);

//     if(!product){
//         return res.status(404).json({message:"Product Not Found"})
//     }

//     res.status(200).json({success:true,data:product});
//     }
//     catch(error){
//              res.status(500).json({message:"Server error"})
//     }

//  };

//  // Create product

//  export const createProduct=async(req, res)=>{

//     try{
//     await createNewProduct(req.body);

//     res.status(200).json({
//         success:true,
//         message:"Product Created",
//         // productId
//     });
//     }
//     catch (error){
//             res.status(500).json({message:"server Error"})
//     }
//  }

//  // update product details

// export const updateProductDetails=async(req,res)=>{
//     try{
//     const updateProducts= await updateProduct(req.params.id,req.body);

//     if(!updateProduct){
//         return res.status(404).json({message:"Product Not Found"});
//     }

//     res.status(200).json({
//         success:true,
//         message:"Product Updated"
//     })
//     }
//     catch(error){
//         res.status(500).json({message:"Server error"});
//     }

//  }

//  //delete product 

//  export const deleteProductById=async(req,res)=>{

//     try{
//          const deleteProducts= await deleteProduct(req.params.id);

//           if(!deleteProduct){
//         return res.status(404).json({message:"Product Not Found"});
//          }

//          res.status(200).json({
//             success:true,
//             message:"Product deleted"
//          })

//     }
//     catch(error){
//         res.status(500).json({message:"Server error"})
//     }
//  }


import { 
    getAllProducts,
    createNewProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from "../service/products.js";

import logger from "../config/logger.config.js";
import { getProductBySlugService } from "../service/products.js";


// Get all products
export const allProducts = async (req, res) => {

    try {
        const products = await getAllProducts(req.query);

        logger.info("Fetched all products", {
            query: req.query,
            count: products.length
        });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    }
    catch (error) {

        logger.error("Error fetching all products", {
            message: error.message,
            stack: error.stack
        });

        res.status(500).json({ message: "Server error" });
    }
};


// Get product by id
export const getproductById = async (req, res) => {

    try {
        const product = await getProductById(req.params.id);

        logger.info("Fetching product by ID", {
            productId: req.params.id
        });

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        res.status(200).json({ success: true, data: product });
    }
    catch (error) {

        logger.error("Error fetching product by ID", {
            productId: req.params.id,
            message: error.message,
            stack: error.stack
        });

        res.status(500).json({ message: "Server error" });
    }

};

// GET product by slug

export const getProductBySlugController = async (req, res) => {
  try {
    const product = await getProductBySlugService(req.params.slug);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.status(200).json({ success: true, data: product });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Create product
export const createProduct = async (req, res) => {

    try {
        await createNewProduct(req.body);

        logger.info("Product created", {
            body: req.body
        });

        res.status(200).json({
            success: true,
            message: "Product Created",
        });
    }
    catch (error) {

        logger.error("Error creating product", {
            body: req.body,
            message: error.message,
            stack: error.stack
        });

        res.status(500).json({ message: "server Error" });
    }
};


// Update product details
export const updateProductDetails = async (req, res) => {

    try {
        const updateProducts = await updateProduct(req.params.id, req.body);

        logger.info("Updating product", {
            productId: req.params.id,
            body: req.body
        });

        if (!updateProduct) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        res.status(200).json({
            success: true,
            message: "Product Updated"
        });
    }
    catch (error) {

        logger.error("Error updating product", {
            productId: req.params.id,
            message: error.message,
            stack: error.stack
        });

        res.status(500).json({ message: "Server error" });
    }

};


// Delete product
export const deleteProductById = async (req, res) => {

    try {
        const deleteProducts = await deleteProduct(req.params.id);

        logger.info("Deleting product", {
            productId: req.params.id
        });

        if (!deleteProduct) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted"
        });

    }
    catch (error) {

        logger.error("Error deleting product", {
            productId: req.params.id,
            message: error.message,
            stack: error.stack
        });

        res.status(500).json({ message: "Server error" });
    }
};