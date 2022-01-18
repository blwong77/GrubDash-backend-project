const path = require("path");
const dishes = require(path.resolve("src/data/dishes-data"));

function checkDish(req, res, next) {
  const dishId = req.params.dishId;
  const foundDish = dishes.find((dish) => dish.id === dishId);

  if (foundDish) {
    res.locals.foundDish = foundDish;
    return next();
  }

  next({ status: 404, message: `Dish does not exist: ${dishId}` });
}

module.exports = checkDish;
