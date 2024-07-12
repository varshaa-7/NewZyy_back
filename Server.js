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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
  useUnifiedTopology: true,

})
.then(()=> console.log("MongoDB connected..."))
.catch((err)=> console.log(err))

//API ROUTES
app.use("/api", routes);
app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: req.query.country,
        category: req.query.category,
        apiKey: process.env.NEWS_API_KEY,
        page: req.query.page,
        pageSize: req.query.pageSize,
      },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT,()=> console.log(`Listening at ${PORT}...`));
