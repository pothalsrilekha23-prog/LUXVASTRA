import pool from "../db.js";

//----------CREATE NEW MASTER PRODUCT-----------------

export const createMasterProduct= async(req  , res) =>{
    
    try{
    const{title,brand,desription,categoryid}=req.body;

    if(!title || !brand || !desription || !categoryid){
        return res.status(400).json({message:"All Fields Are Reqired"})
    };

    const[result]= await pool.query(`INSTER INTO master_product WHERE
         (title,brand,desription,categoryid) VALUES(?,?,?,?)`,[title,brand,desription,categoryid]);

     res.status(200).json({
        success:true,
        master_product_Id: result.insertId
     });

}
catch(err){
    return res.status(500).json({message:"Server Error"});
}
}

// ------------------------------------------Get All Master Prodcuts-----------------------------
export const getallMasterProduct=async(req , res)=>{

    try{
    const [product]=await pool.query(`SELECT * FROM master_product WHERE is_Active=1`);

    res.json(product);

    }
    catch (err){
        res.status(500).json({message:"Server Error"})
    }

}

// -------------------------------Get master Product  by Id------------------------

export const getMasterProductById= async(req , res) =>{

    try{
    const id= req.params.id;

    const [products]=await pool.query(`SELECT * FROM master_product WHERE id=? AND is_active=1`,[id]);

    if(!products.length){
        return res.status(404).json({message:"Product Not Found"});
    }
        res.json(products[0]);
}
catch(err){
    res.status(500).json({message:"Server Error"});
}
}

// ---------------------------update product by id

export const updateMasterProductById= async(req  , res) =>{
    
    try{
    const{title,brand,desription,categoryid,is_Active}=req.params.id;


    const[result]= await pool.query(`UPDATE master_product SET
         (title,brand,desription,categoryid,is_Active) VALUES(?,?,?,?,?) WHERE id=?`,
         [title,brand,desription,categoryid,is_Active,id]);

         res.status(200).json({message:"Details Updated"})

}
catch(err){
    return res.status(500).json({message:"Server Error"});
}
}

export const deleteMasterProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    await pool.query(
      `UPDATE master_products SET is_active = 0 
       WHERE id = ?`,
      [id]
    );

    res.json({ message: "Master product deactivated" });

  } catch (error) {
    next(error);
  }
};
