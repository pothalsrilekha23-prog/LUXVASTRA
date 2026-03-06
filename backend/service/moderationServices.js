// import * as moderationRepo from "./moderationRepository.js";

import * as moderationRepo from "../schemas/moderationRepository.js";

export async function getPendingItems() {
  return moderationRepo.findPending();
}

export async function approveItem(id) {
  const item = await moderationRepo.updateStatus(id, "approved");

  if (!item) throw new Error("Moderation item not found");

  await moderationRepo.updateContentStatus(
    item.content_type,
    item.content_id,
    "approved"
  );

  return item;
}

export async function rejectItem(id, reason) {
  const item = await moderationRepo.updateStatus(id, "rejected", reason);

  if (!item) throw new Error("Moderation item not found");

  await moderationRepo.updateContentStatus(
    item.content_type,
    item.content_id,
    "rejected"
  );

  return item;
}