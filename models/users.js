const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    RoomID:{
        type:String,
        required:false,
        unique:true
    },    
    user:[{
        type:String,
        required:false
    }]
})

const Room = mongoose.model('Room',RoomScheme);
module.exports = Room;


//PROBS USELESS