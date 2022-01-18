function checkImage(req, res, next) {
  const { data: { image_url } = {} } = req.body;

  if (image_url) {
    return next();
  }
  next({ status: 400, message: "Dish must include a image_url" });
}

module.exports = checkImage;
