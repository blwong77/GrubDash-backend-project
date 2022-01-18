const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// Validation imports
const checkDescription = require("./validation/check.description");
const checkDish = require("./validation/check.dish");
const checkId = require("./validation/check.id");
const checkImage = require("./validation/check.image");
const checkName = require("./validation/check.name");
const checkPrice = require("./validation/check.price");

// TODO: Implement the /dishes handlers needed to make the tests pass
function list(req, res) {
  res.status(200).json({ data: dishes });
}

function read(req, res) {
  const foundDish = res.locals.foundDish;
  res.status(200).json({ data: foundDish });
}

function create(req, res) {
  const {
    data: { name, description, price, image_url },
  } = req.body;
  const newDish = {
    id: nextId(),
    name,
    description,
    price,
    image_url,
  };
  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}

function update(req, res) {
  const foundDish = res.locals.foundDish;

  const {
    data: { name, description, price, image_url },
  } = req.body;

  foundDish.name = name;
  foundDish.description = description;
  foundDish.price = price;
  foundDish.image_url = image_url;

  res.status(200).json({ data: foundDish });
}

module.exports = {
  list,
  create: [
    checkName, 
    checkDescription, 
    checkPrice, 
    checkImage, 
    create
  ],
  read: [checkDish, read],
  update: [
    checkDish,
    checkName,
    checkDescription,
    checkPrice,
    checkImage,
    checkId,
    update,
  ],
};
