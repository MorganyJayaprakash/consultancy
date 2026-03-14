const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type:String,
        required: true,
        unique:true,
    },
    buyerName:String,
    mobileNumber: String,
    email :String,
    orderItems:[{
        productName:String,
        productQuantity: Number,
        productPrice: Number
    },],
    address : String,
    totalPrice: Number,
    status:String,
},{
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;