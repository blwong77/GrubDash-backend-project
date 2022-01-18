const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// Validation Imports
const checkDeliverTo = require("./validation/check.deliverTo");
const checkDishQuantity = require("./validation/check.dish.quantity");
const checkDishes = require("./validation/check.dishes");
const checkMobileNumber = require("./validation/check.mobilenumber");
const checkOrder = require("./validation/check.order");
const checkId = require("./validation/check.id");
const checkStatus = require("./validation/check.status");
const checkPending = require("./validation/check.pending");

// TODO: Implement the /orders handlers needed to make the tests pass
function list(req, res) {
  res.status(200).json({ data: orders });
}

function create(req, res) {
  const {
    data: { deliverTo, mobileNumber, status, dishes },
  } = req.body;
  const newOrder = {
    id: nextId(),
    deliverTo,
    mobileNumber,
    status,
    dishes,
  };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
}

function read(req, res) {
  const foundOrder = res.locals.foundOrder;
  res.status(200).json({ data: foundOrder });
}

function update(req, res) {
  const foundOrder = res.locals.foundOrder;
  const {
    data: { deliverTo, mobileNumber, status, dishes },
  } = req.body;

  foundOrder.deliverTo = deliverTo;
  foundOrder.mobileNumber = mobileNumber;
  foundOrder.status = status;
  foundOrder.dishes = dishes;

  res.status(200).json({ data: foundOrder });
}

function destroy(req, res) {
  const { orderId } = req.params;
  const index = orders.findIndex((order) => order.id === orderId);
  if (index > -1) {
    orders.splice(index, 1);
  }
  res.sendStatus(204);
}

module.exports = {
  list,
  create: [
    checkDeliverTo,
    checkMobileNumber,
    checkDishes,
    checkDishQuantity,
    create,
  ],
  read: [checkOrder, read],
  update: [
    checkOrder,
    checkDeliverTo,
    checkMobileNumber,
    checkDishes,
    checkDishQuantity,
    checkId,
    checkStatus,
    update,
  ],
  destroy: [checkOrder, checkPending, checkId, destroy],
};
