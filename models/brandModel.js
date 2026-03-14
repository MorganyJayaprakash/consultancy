const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brandId:{
        type: String,
        require: true,
        unique: true
    },
    brandName: String,
    brandImage: {
        data: Buffer,
        contentType: String
    }
});

const Brand = mongoose.model('Brand',brandSchema);

module.exports = Brand;