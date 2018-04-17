/**
 * Created by abi on 17/4/18.
 */
const mongoose  = require('mongoose');
const schema = mongoose.Schema;

//create ninja schema & model

const ninjaSchema =new  schema({
    name:{
        type:String,
        required:[true,'Name field is required']
    },
    rank:{
        type:String

    },
    availablity:{
        type:Boolean,
        default:false
    }
    //add in geo location
});

const Ninja  = mongoose.model('ninja',ninjaSchema);
//mongoose.model('ninja') this represent the collection name in the mongoose db

//export  the models

module.exports = Ninja;