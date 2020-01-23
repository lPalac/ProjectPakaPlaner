const mongoose = require('mongoose');

const VotingScheme = new mongoose.Schema({
    RoomID:{
        type:String,
        required:false,
        unique:true
    },
    VoteID:{
        type:Number,
        required:true,
        unique:true
    },
    Title:{
        type:String,
        required:true,
        unique:false
    },
    Choice:{
        name:String,
        ammount:Number
    }      
});


const Vote = mongoose.model('Vote',VotingScheme);
module.exports = Vote;