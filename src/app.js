//Express Routing Stuff
const express = require('express') 
const app = express()   
const port = 3000

//File Handling Stuff
const fs = require('fs'); //file stream
const papa = require('papaparse'); //csv parser plug in
const path = require('path'); //http path
const csvFilePath = 'movieData/movies.csv'; //csv file path
const file = fs.createReadStream(csvFilePath, 'utf8'); //raw data from csv file

//JS Functions
const tools = require('./tools.js')


//Get JSON list of matching movies (query: one genre)
app.get('/search/:genre', (req, res) => {
    let query = req.params;
    console.log("This is what the query looks like: ", query);
    //Load data from local csv file
    papa.parse(file, {
        header: true,
        download: true,
        worker: false,
        complete: function(results) {
            let movieData = tools.splitGenres(results.data); //split '|' separated genres into arrays
            let result = tools.searchMovies(movieData, query);//search for matching movies, return array of matches
            let jsonResults = JSON.parse(JSON.stringify(result));//convert array of objects to json
            res.json(jsonResults)//send results as json data
        }
    });
})

//Get static home page
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,'/index.html'));
})

//port 3000
app.listen(port, () => {
    console.log('app listening on port ${port}')
})

