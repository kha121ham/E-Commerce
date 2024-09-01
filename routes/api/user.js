const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const User = require('../../model/User');
const jwt = require('jsonwebtoken');
const config = require('config');
//@Path   Post  /api/user/register
//@Desc.   User register
//Access   Puplic
router.post('/register',[
    check('username','UserName is required').not().isEmpty(),
    check('email','Invalid email').isEmail(),
    check('password','Please enter a password with 6 or more chrarcters').isLength({ min: 6 })
]
,async (req,res)=>{
    //Check errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ errors:errors.array() });
    }
    //Destructuring user info
    const { username, email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ msg:'Invalid email or password' });
        }
        user = new User({
            username,
            email,
            password,
        });

        //Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        //save user in database
        await user.save();

        //return jsonwebtoken
        //*1 get user ID from database
        const payload = {
            user:{
                id:user.id
            }
        };
        //*2 Create JWT
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},(err,token)=>{
            if(err) throw err;
            res.json({ token });
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;