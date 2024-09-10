const express = require("express");
const router = express.Router();
const isAdmin = require('../../middleware/isAdmin');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Product = require('../../model/Product');
const User = require('../../model/User');
//@Path   Post  /api/product
//@Desc.   Create product
//Access   Private
router.post('/',[auth,isAdmin,check('name','Name is required').not().isEmpty(),check('price','Price is required').not().isEmpty()],async(req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()) {
    return res.status(400).json({ errors:errors.array() });
}
try {
    const newProduct = new Product({
        name:req.body.name,
        user:req.user.id,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:req.body.image
    });
    const product = await newProduct.save();
    res.json(product);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

//@Path   Get  /api/product
//@Desc.   Get Products
//Access   puplic
router.get('/',async(req,res)=>{
    try {
        const products = await Product.find().sort({ date:-1 });
        if (products.length === 0) {
            return res.status(404).json({ msg: 'No products found' }); // 404 is a more appropriate status code
        }
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//@Path   Get  /api/product/category/:categoryId
//@Desc.   Get Products by category id
//Access   puplic
router.get('/category/:categoryId',async(req,res)=>{
    try {
        const products = await Product.find({ category:req.params.categoryId });
        if (products.length === 0) {
            return res.status(404).json({ msg: 'No products found' }); // 404 is a more appropriate status code
        }
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@Path   Get  /api/product/:id
//@Desc.   Get Product by id
//Access   puplic
router.get('/:id',async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({ msg:'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        // Handle cases where the ID is not a valid ObjectId
        if(err.kind === 'ObjectId') {
          return res.status(404).json({ msg:'Product not found' })
        }
        res.status(500).send('Server Error');
    }
});


//@Path   Delete  /api/product/:id
//@Desc.   Delete Product by id
//Access   private
router.delete('/:id',auth,isAdmin,async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({ msg:'Product not found' });
        }
        await product.deleteOne();
        res.json({msg:'Product removed'});
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
          return res.status(404).json({ msg:'Post not found' })
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;