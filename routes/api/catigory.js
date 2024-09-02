const express = require("express");
const router = express.Router();
const Catigory = require('../../model/Category');
const auth = require('../../middleware/auth');
const { check, validationResult } = require("express-validator");

//@Path   Post  /api/catigory/add
//@Desc.   create new catigory
//Access   private
router.post('/add',
    [auth,
    check('name','Name is required').exists(),
    check('description','Description is required')
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

module.exports = router;