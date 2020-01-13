const mongoose = require('mongoose');

const VotingScheme = new mongoose.Schema({
    Title:{
        type:String,
        required:true,
        unique:false
    },
    Choices:{
        type:[Choice],
        required:true,
        unique:false
    },
    Choice:{
        type:String,
        required:true,
        unique:false
    }
    
});


const vote = new mongoose.Model('Vote',VotingScheme);
module.exports = vote;