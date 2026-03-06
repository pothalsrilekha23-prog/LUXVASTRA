import pool from "../db.js";

export const priceEngine=async(req , res) =>{

    try{
        
       const productid=req.params.productid;

       if(!productid){
        return res.status(400).json({message:"ProductId Is required"})
       }

       // To get Sellers details for the master product
       const[sellers]=await pool.query(`SELECT * FROM product_sellers WHERE product_id=?`,[productid]);

        //to chech the active price rules
        const[rules]=await pool.query(`SELECT * FROM price_rules WHERE is_active=1`);

        for(let seller of sellers)
        {
            let finalPrice=seller.selling_price;

            // for  total disc
           for(let rule of rules)
            {
                if(rule.rule_type === "global")
                {
                    if(rule.discount_type === "percentage")
                        {
                            finalPrice-=(finalPrice * rule.discount_value) / 100;         
                        }
                        else
                        {
                            finalPrice-= rule.discount_value;
                        }                       
                }

            // for  product price based
            if(rule.rule_type ==="price_based" && finalPrice>=rule.min_price)
                {
                    if(rule.discount_type === "percentage")
                        {
                            finalPrice-=(finalPrice * rule.discount_value)/100;
                        }
                        else
                        {
                            finalPrice -= rule.discount_value
                        }
                }
           }

           //  to prevent neg value
           if(finalPrice<0) finalPrice=0;

           await pool.query(`UPDATE product_sellers SET final_price=? WHERE seller_id=?`,[finalPrice,seller.id]);

        }

        res.status(200).json({message:"Price Engine Applied"});
    }
    catch(err){
        res.status(500).json({message:"Server Error"});
    }
}