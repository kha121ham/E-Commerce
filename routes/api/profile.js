const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../model/Profile');
const { check, validationResult } = require('express-validator');
const User = require('../../model/User');
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

//@Path   Get  /api/profile
//@Desc.   Get user Profile by id
//Access   private
router.get('/me',auth,async (req,res)=>{
    try {
        //Get profile by user ID
        const profile =await Profile.findOne({ user:req.user.id }).populate('user',['username']);
        //check if user profile not exist
        if(!profile){
            return res.status(400).json({ msg: 'This is no profile for this user' });
            }
            res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@Path   Delete  /api/profile
//@Desc.   Delete user and Profile 
//Access   private
router.delete('/',auth,async (req,res)=>{
    try {
        await Profile.findOneAndDelete({ user:req.user.id });
        await User.findOneAndDelete({ _id:req.user.id });
        res.json({ msg:'User Deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;