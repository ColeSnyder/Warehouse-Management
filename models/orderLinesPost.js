// Copyright Cole Snyder 2020 
const mongoose = require('mongoose');

//schema
const Schema = mongoose.Schema;

const OrderLinesSchema = new Schema({
    OrderLineID: String,
    OrderID: String,
    ProductID: String,
    QTY: String
});

// model
const OrderLinesPost = mongoose.model('OrderLinesPost', OrderLinesSchema);

module.exports = OrderLinesPost;