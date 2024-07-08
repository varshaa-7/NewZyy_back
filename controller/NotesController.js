const NotesModel = require("../models/notesModel");

module.exports.getNotes = async(req,res)=>{
    try {
        const notes = await NotesModel.find();
        res.status(200).send(notes);
    } catch (err) {
        console.log("Error in getNotes:", err);
        res.status(500).send({ error: err, msg: "Error fetching notes!" });
    }
};

module.exports.saveNotes=(req, res) =>{
    const {notes} = req.body;

    NotesModel.create({notes})
    .then((data) =>{
        console.log("Saved Successfully...");
        res.status(201).send(data);
    })
    .catch((err) => {
        console.log(err)
        res.send({error:err,msg:"Something went wrong!"});
    });
};

module.exports.updateNotes=(req, res) =>{
    const {id} = req.params;
    const {notes} = req.body;

    NotesModel.findByIdAndUpdate(id,{notes})
    .then(() =>{
        
        res.send("Updated Successfully...");
    })
    .catch((err) => {
        console.log(err)
        res.send({error:err,msg:"Something went wrong!"});
    });
};


module.exports.deleteNotes=(req, res) =>{
    const {id} = req.params;

    NotesModel.findByIdAndDelete(id)
    .then(() =>{
        
        res.status(200).send("Deleted Successfully...");
    })
    .catch((err) => {
        console.log(err)
        res.send({error:err,msg:"Something went wrong!"});
    });
};

