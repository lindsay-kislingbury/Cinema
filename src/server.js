//Express Routing 
const express = require('express') //express plug in
const app = express()   
const port = 3000
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Multer: Multi part request body
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

//File Handling 
const fs = require('fs'); //file stream
const path = require('path'); //http path
const csvFilePath = 'movieData/movies.csv'; //csv file path 
const csvParser = require("csv-parser") //csv-parser plug in

//JS Functions
const util = require('./util.js')

//Home page
app.get('/', (req,res) =>{
    req.header('Content-Type', 'application/json')
    res.render('index')
})

//When html navigates to /search. using multer to get multipart form data
app.post('/search', upload.none(), function(req, res) {
    let query = req.body; 
    var parsedData = [];
    //Parse csv data to array of objects
    fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (data) => {
            parsedData.push(data);
        })
        .on("end", () =>{
            console.log("csv-parser success, # of movies: ", parsedData.length);
            //Operations on the parsed data, these functions are in tools.js
            let results = util.modifyData(parsedData, query)
            //console.log(results);
            //Render results page, passing results to the page
            //console.log(query);
            res.render('results', {'data': results});
        })
})

//port 3000
app.listen(port, () => {
    console.log('app listening on port ${port}')
})

