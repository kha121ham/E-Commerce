const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('cart route')
});

module.exports = router;