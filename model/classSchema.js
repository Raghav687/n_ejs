var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ClassSchema = new Schema({
    name:String,
    roll_no:Number,
    classes:Number
});
module.exports = mongoose.model('Class',ClassSchema)