//Express Routing Stuff
const express = require('express') //express plug in
const app = express()   
const port = 3000

//Plug-in to get the body of html requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//File Handling Stuff
const fs = require('fs'); //file stream
const path = require('path'); //http path
const csvFilePath = 'movieData/movies.csv'; //csv file path 
const csvParser = require("csv-parser") //csv-parser plug in

//JS Functions
const tools = require('./tools.js')

//When html navigates to /seach
app.post('/search', function(req, res) {
    let query = req.body.genre; 
    console.log("query: ", query);
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
            let movieData = tools.splitGenres(parsedData); //split '|' separated genres into arrays
            let searchResults = tools.searchMovies(movieData, query);//search for matching movies, return array of matches
            let jsonResults = JSON.parse(JSON.stringify(searchResults));//convert array of objects to json
            console.log("completed json: ", jsonResults);
            res.json(jsonResults)//send results as json data
        })
})


//Static home page
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,'/index.html'));
})

//port 3000
app.listen(port, () => {
    console.log('app listening on port ${port}')
})

