import { ROLES } from "../config/roles.js";

export const validateRole = (req, res, next) => {
  const validRoles = Object.values(ROLES);

  if (!validRoles.includes(req.user.role_id)) {
    return res.status(403).json({
      message: "Invalid role detected"
    });
  }

  next();
};