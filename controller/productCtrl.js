const Product = require('../models/productModel');
const Brand = require('../models/brandModel');
var fs = require('fs');
var path = require('path');
const exp = require('constants');

// get and render the page
// exports.getAddProduct = async (req, res)=>{
//     res.render('addproduct',{message : req.flash('error')});
// };

exports.getAddProduct = async (req, res) => {
    try {
      const brands = await Brand.find({}, 'brandName -_id'); // Assuming 'name' is the field with brand names
      res.render('addproduct', { 
        message: req.flash('error'),
        brands: brands // Pass brands to the template
      });
    } catch (error) {
      req.flash('error', 'Error fetching brand');
      res.redirect('/addproduct');
    }
  };

  exports.postAddProduct =  (req, res)=>{
    const {productId, productName, brandName, productImage, productPrice, productDescription} = req.body;

    Product.exists({productId:productId})
        .then((exists)=>{
            if(exists){
                req.flash('error','Product Id already exists');
                return res.redirect('/addproduct');
            } else {
                const newProduct = new Product({
                    productId: productId,
                    productName: productName,
                    brandName: brandName,
                    productImage: {
                        data: fs.readFileSync(path.join(__dirname + '../../uploads/' + req.file.filename)),
                        contentType: 'image/png'
                    }, 
                    productPrice: productPrice, // Assuming productPrice is a number
                    productDescription: productDescription
                });
                newProduct.save()
                    .then(()=>{
                        req.flash('sucess','Product added succesfully');
                        return res.redirect('/addproduct');
                    })
                    .catch((err)=>{
                        req.flash('error','Error adding product');
                        return res.redirect('/addproduct');
                    });
            }
        }) .catch((err)=>{
            req.flash('error','Error checking product existence');
            return res.redirect('/addproduct');
        });
  };

  exports.getEditProduct = async (req,res)=>{
    try{
        const products = await Product.find({});
        res.render('editproduct',{products});
    } catch(err){
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
    }
  }
  exports.updateProduct = async (req, res) => {
    const productId = req.params.productId; // Extract productId from the request parameters
      //console.log('Received product data:', req.body);
    //   console.log('Received product data:', req.body);
      // Log specific fields like productName and productDescription
    //   console.log('Received productName:', req.body.productPrice);
    //   console.log('Received productDescription:', req.body.productDescription);
    try {
        // Find the product by its ID in the database
        const productToUpdate = await Product.findByIdAndUpdate(productId, {
            // Update the fields you want to change
            productPrice: req.body.productPrice,
            productDescription: req.body.productDescription
            // Add more fields as needed
        }, { new: true }); // To get the updated product
  
        if (!productToUpdate) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully'});
        // try{
        //     const products = await Product.find({});
        //     res.render('editproduct',{products});
        // } catch(err){
        //     console.error('Error fetching products:', err);
        //     res.status(500).send('Error fetching products');
        // }
        // res.redirect('/editproduct');
        // Respond with the updated product
        
    } catch (error) {
        // Handle errors and respond with an error message
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product' });
    }
  };
//   , updatedProduct: productToUpdate 

// Express route handling deletion of products by ID
exports.deleteproduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        
      const deletedproduct = await Product.findByIdAndDelete(productId);
      if (deletedproduct) {
          return res.status(200).send('Product deleted successfully');
      } else {
          return res.status(404).send('product not found');
      }// Your logic to delete the user with the provided userId
        // Example: await User.findByIdAndDelete(userId);
       // res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting uproduct:', error);
        res.status(500).send('Server error');
    }
  };

  exports.getStoctProducts =  async (req, res)=>{
      try{
        const products = await Product.find({});
        res.render('managestock',{products});
    } catch(err){
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
    }
  
  };
  
  exports.getAddProduct = async (req, res) => {
    try {
      const brands = await Brand.find({}, 'brandName -_id'); // Assuming 'name' is the field with brand names
      res.render('addproduct', { 
        message: req.flash('error'),
        brands: brands // Pass categories to the template
      });
    } catch (error) {
      req.flash('error', 'Error fetching brand');
      res.redirect('/addproduct');
    }
  };

  exports.managestock = async (req, res) => {
    const productId = req.params.productId; // Extract productId from the request parameters
    try {
        // Find the product by its ID in the database
        const productToUpdate = await Product.findByIdAndUpdate(productId, {
            // Update the fields you want to change
            
            productStock: req.body.productStock
            // Add more fields as needed
        }, { new: true }); // To get the updated product
  
        if (!productToUpdate) {
            return res.status(404).json({ message: 'Product not found' });
        }
  
        // Respond with the updated product
        res.status(200).json({ message: 'Stock updated successfully', updatedProduct: productToUpdate });
    } catch (error) {
        // Handle errors and respond with an error message
        console.error('Error updating Stock:', error);
        res.status(500).json({ message: 'Failed to update Stock' });
    }
  };
  