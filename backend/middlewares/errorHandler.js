export const errorHandler = (err, _req, res, _next) => {
  console.error("ERROR:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  
  if (err.code === "ER_DUP_ENTRY") {
    statusCode = 409;
    message = "Duplicate entry already exists";
  }

  
  if (err.code === "ECONNREFUSED") {
    statusCode = 500;
    message = "Database connection failed";
  }

  
  if (err.code === "ER_BAD_FIELD_ERROR") {
    statusCode = 400;
    message = "Invalid database field";
  }

 
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  
  if (process.env.NODE_ENV === "production") {
    if (!err.isOperational) {
      message = "Something went wrong";
    }
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};