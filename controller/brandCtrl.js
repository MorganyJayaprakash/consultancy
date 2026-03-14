const Brand = require('../models/brandModel');
var fs = require('fs');
var path = require('path');
exports.getAddBrand = (req,res)=>{
    res.render('addbrand',{message: req.flash('error')});
};
exports.postAddBrand = async (req, res) => {
    const { brandid, brandname } = req.body;
   

    try {
        const exists = await Brand.exists({ brandId: brandid });

        if (exists) {
            req.flash('error', 'Brand Id already exists');
        } else {
            const newBrand = new Brand({
                brandId: brandid,
                brandName: brandname,
                brandImage: {
                    data: fs.readFileSync(path.join(__dirname + '../../uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
            });

            await newBrand.save();
            req.flash('success', 'Brand added successfully');
        }
    } catch (err) {
        req.flash('error', 'Error processing brand');
    }

    res.redirect('/addbrandpage');
};

exports.getbrand= async (req, res)=>{
    try{
        const brand = await Brand.find({});
        res.render('deletebrand',{ brand });
    } catch (error) {
        console.error('Error fetching brand:', error);
        res.status(500).send('Error fetching brand');
    }
};

exports.deletebrand = async (req,res)=>{
    const brandId = req.params.brandId;
    try{
        const deletebrand = await Brand.findByIdAndDelete(brandId);
        if(deletebrand){
            return res.status(200).send('Brand deleted successfully');
        } else {
            return res.status(404).send('Brand not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
};
