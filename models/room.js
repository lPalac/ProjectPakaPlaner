const mongoose = require('mongoose');
const RoomScheme = new mongoose.Schema({
    RoomName:{
        type: String,
        required:true,
        unique:true
    },
    UserName:{
        type:String,
        required:true,
        unique:true
    }
});


const Room = mongoose.model('Room',RoomScheme);
module.exports = Room;
