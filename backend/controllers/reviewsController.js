import  pool from "../db.js";

// create  new reviwe
export const createReview=async(req ,res) =>{
    const connection=await pool.getConnection();

    try{

        const {rating ,comments}=req.body;
        const product_id=req.params.product_id;
        // const user_id=req.user.user_id;
        const user_id=req.params.user_id;

        if(!product_id)
        {
            return res.status(404).json({message:"Product not found"});
        }

        if(!user_id)
        {
            return res.status(404).json({message:"User not found"});
        }

        //  Validate Review
        if(!rating || rating<1 || rating>5)
        {
            return res.status(400).json({message:"Rating should be b/w 1 to 5"});
        }

        //multiple reviews

            const[count]= await pool.query(`SELECT 1 FROM reviews 
            WHERE user_id=? AND product_id=?`,[user_id,product_id]);

        if(count.length>0)
        {
            return res.status(400).json({message:"User had already given review"})
        }

        // insert review
            const[result]=await pool.query(`INSERT INTO reviews (product_id,user_id,rating,comment) 
            VALUES (?,?,?,?)`,[product_id,user_id,rating,comments]);

            const reviewId =result.insertId;

            await pool.query(
            `INSERT INTO moderation_queue (content_type, content_id, status)
             VALUES ('review', ?, 'pending')`,
            [reviewId]
            ); 

            res.status(201).json({message:"Review submitted"});
    }
         catch(err)
        {
            await connection.rollback();
            connection.release();
            console.error(err);
            return res.status(500).json({message:"Server Error"});
        }
}


// read the reviews
export const readReviews=async(req , res) =>{

    try{
    const product_id=req.params.product_id;

    const[review]=await pool.query(`SELECT * FROM 
        reviews WHERE product_id=?`,[product_id]);
    
    if(review.length === 0)
    {
            return res.status(404).json({message:"Reviews Not Found"})
    }

        res.json({review});

    }
    catch(err)
    {
        return res.status(500).json({message:"Server Error"});
    }
}


// Update review

export const updateReview=async(req , res) =>
{

    try{
            const review_id=req.params.review_id;
            // const user_id=req.params.user.user_id;
            const user_id=req.params.user_id;
            const {rating,comments}=req.body;

            if(!rating || rating<1 || rating>5)
            {
                return res.status(400).json({message:"rating should be b/w 1 to 5"});

            }

            const[review]=await pool.query(`SELECT * FROM reviews 
                WHERE review_id=? AND user_id=? `,[review_id,user_id]);

                if(review.length === 0)
                {
                    return res.status(404).json({message:"Review Not Found"});
                }

             await pool.query(`UPDATE SET rating=? AND comments=? 
             WHERE review_id=?`[rating,comments,review_id]);

             res.status(200).json({message:"Review Updated Successfully"});

    }
    catch (err){
        res.status(500).json({message:"Server Error"});
    }
}

//------------------delete review-------------------------------------

export const deleteReview=async(req , res) =>
{

    try{
    const review_id=req.params.reviewId;
    const user_id=req.params.user.user_id;

    const[review]=await pool.query(`DELETE FROM reviews 
        WHERE review_id=? AND user_id=?`,[review_id,user_id]);

        if(review.affectedRows === 0)
        {
            res.status(404).json({message:"Review Not Found"})
        }

        res.status(200).json({message:"Review Deleted"});
    }
    catch(err)
    {
        res.status(500).json({message:"Server Error"});
    }

}