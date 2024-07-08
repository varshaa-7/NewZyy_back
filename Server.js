const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/NotesRoutes")
const cors = require("cors");
const schedule = require("node-schedule");
require("dotenv").config();

const app= express();
const PORT = process.env.PORT || 5000

const NotesModel = require("./models/notesModel");

//MIDDLEWARE
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
  useUnifiedTopology: true,

})
.then(()=> console.log("MongoDB connected..."))
.catch((err)=> console.log(err))

//API ROUTES
app.use("/api", routes);


app.listen(PORT,()=> console.log(`Listening at ${PORT}...`));
