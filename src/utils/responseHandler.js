export const responseHandler = (res, status, message, data = null) => {
  const success = status >= 200 && status < 400;
  res.status(status).json({
    success,
    status,
    message,
    data,
  });
};
