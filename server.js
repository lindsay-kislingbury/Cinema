//Express
const express = require('express') 
const app = express()
const port = 3000

//Express options
const path = require('path');
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

//Multer: Multi part request body
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

//File Handling 
const fs = require('fs'); //file stream
const csvFilePath = 'movieData/moviesA.csv'; //csv file path 
const csvParser = require("csv-parser") //csv-parser plug in

//JS Functions
const modify = require('./services/modify.js');
const search = require('./services/search.js');

//GET index page
app.get('/', (req, res) => {
  var parsedData = [];
  //Using csv-parser to parse csv data to array of objects
  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (data) => {
      parsedData.push(data);
    })
    .on("end", () => {
      //Extract genres from movie data
      let genres = modify.genreData(parsedData);
      //Render index page, send genres to the page
      res.render('index', { genres }) 
    })
})


//POST index page search form
//Using multer to get multipart form data
app.post('/search', upload.none(), function(req, res) {
  req.header('Content-Type', 'application/json')
  let query = req.body;
  var parsedData = [];
  //Using csv-parser to parse csv data to array of objects
  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (data) => {
      parsedData.push(data);
    })
    .on("end", () => {
      //Modify data to a more useable format, remove un-needed data
      let data = modify.movieData(parsedData);
      //Perform search 
      let searchResults = search.matches(query, data);
      //Render Results page, send search results to the page
      res.render('results', { searchResults })
    })
})

//GET about page
app.get('/about', (req, res) => {
  res.render('about')
})

//Server listening 
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})