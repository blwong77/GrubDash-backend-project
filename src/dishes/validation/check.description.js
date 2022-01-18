function checkDescription(req, res, next) {
  const { data: { description } = {} } = req.body;

  if (description) {
    return next();
  }
  next({ status: 400, message: "Dish must include a description" });
}

module.exports = checkDescription;
