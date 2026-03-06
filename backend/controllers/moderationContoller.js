import * as moderationService from "./moderationService.js";

export async function getPendingItems(req,res, next) {
    try {
        const items = await moderationService.getPendingItems();
        res.json(items);

    } catch (err) {
        next(err);
    }
}

export async function approveItem(req,res, next) {
    try{
        const {id} = req.params;
        const result = await moderationService.approveItem(id);
        res.json({message: "Item approved", result});

    }catch (err) {
        next(err);
    }
}

export async function rejectItem(req,res, next) {
    try {
        const {id} = req.params;
        const {reason} = req.body;
        const result = await moderationService.rejectItem(id, reason);
        res.json({message: "ItemRejected", result});
    } catch (err) {
        next(err);
    }
}