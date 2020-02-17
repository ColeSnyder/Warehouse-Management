// Copyright Cole Snyder 2020 
const mongoose = require('mongoose');

//schema
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    OrderID: String,
    OrderNumber: String,
    DateOrdered: String,
    CustomerName: String,
    CustomerAddress: String
});

// model
const OrderPost = mongoose.model('OrderPost', OrderSchema);

module.exports = OrderPost;