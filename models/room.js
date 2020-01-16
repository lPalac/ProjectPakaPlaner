const mongoose = require('mongoose');

const RoomScheme = new mongoose.Schema({
    RoomID:{
        type:String,
        required:true,
        unique:true
    },
    roomName:{
        type: String,
        required:true,
        unique:true
    },
    userAdmin:{
        type:String,
        required:true,
        unique:true
    },
    user:[{
        type:String,
        required:true,
        unique:true
    }]
})

const Room = mongoose.model('Room',RoomScheme);
module.exports = Room;