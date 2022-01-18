function checkMobileNumber(req, res, next) {
  const { data: { mobileNumber } = {} } = req.body;

  if (mobileNumber) {
    return next();
  }
  next({ status: 400, message: "Order must include a mobileNumber" });
}

module.exports = checkMobileNumber;
