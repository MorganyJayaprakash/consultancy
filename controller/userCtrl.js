const Order = require('../models/placeorderModel'); 
var fs = require('fs');
var path = require('path');
const exp = require('constants');
const mongoose = require('mongoose');
exports.getOrder = async (req,res)=>{
    const status = "Processing"
    try{
        const orders = await Order.find({status:status});
        res.render('vieworder',{orders});
    } catch (err){
        console.error(err);
        res.status(500).send('Error fecting userorder');
    }
};

exports.confirmStatus = async (req,res)=>{
    const orderId = req.params.orderId;
    const status = "Confirmed";
    console.log(orderId);
    try{
        const statusToUpdate = await Order.findOneAndUpdate(
             { orderId: orderId},
            { status: status },
            { new: true }
          );

        if(!statusToUpdate)
        {
            return res.status(404).json({message:'Order Id not found',updatedStatus});
        }
        res.status(200).json({message: 'Status Updated Successfully'});
    } catch (err){
        console.error(err);
        res.status(500).json({message: 'Error Updating Status'});
    }
};