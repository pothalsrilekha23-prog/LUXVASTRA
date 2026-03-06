import { getVariantMapping } from "./variantService.js";

export const getVariants = async (req, res, next) => {
  try {
    const masterId = Number(req.params.masterId);

    if (Number.isNaN(masterId)) {
      return res.status(400).json({ error: "Invalid masterId" });
    }

    const data = await getVariantMapping(masterId);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};