import crypto from "crypto";

export const generateSessionId = (token) => {
  return crypto.randomUUID();
};