/**
 * Created by abi on 18/4/18.
 */

const mongoose  = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const schema = mongoose.Schema;

const userSchema = new schema({
    name:{
        type:String,
        required:[true,'Name field is required']
    },
    email:{
        type:String,
        required:[true,'Email field is required'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'Password field is required']
    },
    admin:{
        type:Boolean,
        default:false
    }
});
userSchema.plugin(uniqueValidator);
const User  = mongoose.model('User',userSchema);

module.exports = User;