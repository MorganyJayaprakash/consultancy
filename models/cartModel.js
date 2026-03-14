const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: String,
    productName:String,
    userName: String,
    productImage:{
        data:Buffer,
        contentType: String
    },
    productPrice :Number,
    productQuantity: String,
});

const cartItem = mongoose.model('cartItem', cartItemSchema);

module.exports = cartItem;