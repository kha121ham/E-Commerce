const express = require("express");
const router = express.Router();
const Catigory = require('../../model/Category');
const auth = require('../../middleware/auth');
const { check, validationResult } = require("express-validator");
const isAdmin = require('../../middleware/isAdmin');
//@Path   Post  /api/category/add
//@Desc.   create new catigory
//Access   private
router.post('/add',
    [auth,
    isAdmin,
    check('name','Name is required').not().isEmpty(),
    check('description','Description is required').not().isEmpty()
    ],
    async(req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()) {
    return res.status(401).json({ errors:errors.array() });
}
const { name,description, imageUrl } = req.body;
try {
    const newCatigory = new Catigory({
        name:name,
        description:description,
        imageUrl:imageUrl
    });
    const catigory = await newCatigory.save();
    res.json(catigory);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

//@Path   Get  /api/category
//@Desc.   Get all catigory
//Access   puplic
router.get('/',async(req,res)=>{
    try {
        const catigories = await Catigory.find().sort({ date:-1 });
        if(!catigories) {
            return res.status(404).json({ msg:'No categories yet' })
        }
        res.json(catigories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@Path   Get  /api/category/:id
//@Desc.   Get catigory by id
//Access   puplic
router.get('/:id',async(req,res)=>{
    try {
        const catigory = await Catigory.findById(req.params.id);
        if(!catigory) {
            return res.status(404).json({ msg:'Category not found' });
        }
        res.json(catigory);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
          return res.status(404).json({ msg:'Category not found' })
        }
        res.status(500).send('Server Error');
    }
});

//@Path   Delete  /api/category/:id
//@Desc.   Delete catigory by id
//Access   private
router.delete('/:id',auth,isAdmin,async(req,res)=>{
    try {
        const catigory = await Catigory.findById(req.params.id);
        if(!catigory) {
            return res.status(404).json({ msg:'Category not found' });
        }
        await Catigory.deleteOne();
        res.json({msg:'Catigory removed'});
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
          return res.status(404).json({ msg:'Category not found' })
        }
        res.status(500).send('Server Error');
    }
});
module.exports = router;