import db from "../db.js";

export const applyRules = async (productId) => {

    //--------- Rules engins ----------
    const [rules] = await db.query(
        "SELECT * FROM rules WHERE is_active = 1"
    );

    const [sellers] = await db.query(`
        SELECT ps.*, s.rating, s.trust_badge
        FROM product_sellers ps
        JOIN sellers s ON ps.seller_id = s.id
        WHERE ps.product_id = ? AND ps.status = 'Active'
    `, [productId]);

    
    let filteredSellers = sellers;

    rules.forEach(rule => {
        if (rule.rule_type === "min_rating") {
            filteredSellers = filteredSellers.filter(
                s => s.rating >= rule.rule_value
            );
        }

        if (rule.rule_type === "min_stock") {
            filteredSellers = filteredSellers.filter(
                s => s.stock >= rule.rule_value
            );
        }

        if (rule.rule_type === "max_shipping") {
            filteredSellers = filteredSellers.filter(
                s => s.shipping_days <= rule.rule_value
            );
        }
    });

    return filteredSellers;
};