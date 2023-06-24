const mongoose =require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemname:String,
    brand:String,
    color:String,
    year:Number
});

module.exports =mongoose.model('Item', ItemSchema);