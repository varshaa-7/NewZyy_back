const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/NotesRoutes")
const cors = require("cors");
const schedule = require("node-schedule");

require("dotenv").config();

const app= express();
const PORT = process.env.PORT || 5000
const NEWS_API_KEY = process.env.NEWS_API_KEY;

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
  const { country, category, page, pageSize } = req.query;
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`;
  
  try {
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
  } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ error: 'Failed to fetch news' });
  }
});


app.listen(PORT,()=> console.log(`Listening at ${PORT}...`));
