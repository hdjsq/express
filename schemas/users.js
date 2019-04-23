const mongoose = require('mongoose');

//用户标结构
const Schema = mongoose.Schema;


module.exports = new Schema({
    username:String,
    password:String
})