const mongoose = require('mongoose');

const RoomScheme = new mongoose.Schema({
    RoomID:{
        type:String,
        required:false,
        unique:true
    },
    roomName:{
        type: String,
        required:false,
        unique:true
    },
    // user:[{
    //     type:String,
    //     required:false
    // }],
    Choices:[{
        Category:String,
        Item:[{name:String,votes:Number, usersVoted:[String]}]
    }]    
})

const Room = mongoose.model('Room',RoomScheme);
module.exports = Room;