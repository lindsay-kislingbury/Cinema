//Express: Routing 
const express = require('express') //express plug in
const app = express()
const port = 3000
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


//pre load movie data before loading index
app.get('/', (req, res) => {
  var parsedData = [];
  //Parse csv data to array of objects
  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (data) => {
      parsedData.push(data);
    })
    .on("end", () => {
      //Modify data to a more useable format, remove un-needed data
      let data = modify.indexData(parsedData);
      res.render('index', { data }); //render index page
    })
})


//Using multer to get multipart form data
app.post('/search', upload.none(), function(req, res) {
  req.header('Content-Type', 'application/json')
  let query = req.body;
  var parsedData = [];
  //Parse csv data to array of objects
  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (data) => {
      parsedData.push(data);
    })
    .on("end", () => {
      //Modify data to a more useable format, remove un-needed data
      let data = modify.resultsData(parsedData);
      let searchResults = search.matches(query, data);
      res.render('results', { searchResults }); //render index page
    })
})

app.get('/about', (req, res) => {
  res.render('about');
})

//port 3000
app.listen(port, () => {
  console.log('app listening on port 3000')
})

