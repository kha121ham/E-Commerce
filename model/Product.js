const mongoose = require('mongoose');
const ProuductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    image:{
        trpe:[{String}]
    },
    createdAt:{
        type:Date,
        default:Date
    }
});

module.exports = Product =mongoose.model('product',ProuductSchema);