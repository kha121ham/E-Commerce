const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('catigory route')
});

module.exports = router;