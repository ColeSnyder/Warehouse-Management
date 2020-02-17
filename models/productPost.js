// Copyright Cole Snyder 2020 
const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    ProductID: String,
    SKU: String,
    ProductDescription: String
});

// model
const ProductPost = mongoose.model('ProductPost', ProductSchema);

module.exports = ProductPost;