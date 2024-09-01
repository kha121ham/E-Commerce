const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../model/Profile');
const { check, validationResult } = require('express-validator');

//@Path   Post  /api/profile
//@Desc.   Create or update profile
//Access   private
router.post('/',[auth,check('name','Name is required').exists()],async (req,res) =>{
    const errors =validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(401).json({ errors:errors.array() });
    }
    //Destructuring
    const { name,address, phone } = req.body;
    //Build profile object
    const ProfileField={};
    ProfileField.user = req.user.id;
    ProfileField.name = name;
    if(address) ProfileField.address = address;
    if(phone) ProfileField.phone = phone;
    //Create and update profile user
    try {
        let profile = await Profile.findOne({ user:req.user.id });
        if(profile) {
            //update
            profile = await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:ProfileField},
                {new:true}
             );
             return res.json(profile);
        }
        //Create
        profile = new Profile(ProfileField);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;