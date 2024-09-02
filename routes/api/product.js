const express = require("express");
const router = express.Router();
const isAdmin = require('../../middleware/isAdmin');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Product = require('../../model/Product');
//@Path   Post  /api/product
//@Desc.   Create or update Productr
//Access   Private
router.post('/',[auth,check('name','Name is required').exists(),check('price','Price is required').exists()],isAdmin,async(req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()) {
    return res.status(401).json({ errors:errors.array() });
}
//Destructuring
const { name, descreption, price, category, image } =req.body;
//Build product opejct
const ProfileField = {};
ProfileField.user=req.user.id;
ProfileField.name = name;
ProfileField.price = price;
if(descreption) ProfileField.descreption = descreption;
if(category) ProfileField.category = category;
if(image) ProfileField.image = image;
try {
    let product = await Product.findOne({ user:req.user.id });
    if(product) {
        product = await Product.findOneAndUpdate(
            {user:req.user.id},
            {$set:ProfileField},
            {new:true}
         );
         return res.json(product);
    }
    product = new Product(ProfileField);
    await product.save();
    res.json(product);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

module.exports = router;