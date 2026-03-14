const mongoose = require('mongoose');

const myorderSchema = new mongoose.Schema({
    orderId: {
        type:String,
        required: true,
        unique:true,
    },
    buyerName:String,
    email :String,
    orderItems:[{
        productName:String,
        productQuantity: Number,
        productPrice: Number
    },],
    totalPrice: Number,
    status:String,
},{
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const myorder = mongoose.model('myorder', myorderSchema);

module.exports = myorder;