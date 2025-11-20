const errorHandling = (err, req, res, next) => {
  const message = err.customMessage || "Something went wrong";
  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      message,
      details: process.env.NODE_ENV != "production" ? err.message : undefined,
    },
    meta: {
      status: err.statusCode || 500,
    },
  });
};

export default errorHandling;
