const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    notes:{
        type:String,
        required: true,
    },
   
});

module.exports = mongoose.model("Notes", notesSchema);
