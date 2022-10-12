const express = require('express') //routing
const app = express()
const port = 3000
const fs = require('fs'); //file stream
const papa = require('papaparse'); //csv parser
const tools = require('./tools.js')//more js functions
const path = require('path');
const file = fs.createReadStream('movieData/movies.csv', 'utf8'); //raw data from csv file

app.get('/search/:genre', (req, res) => {
    //Load data from local csv file
    papa.parse(file, {
        header: true,
        worker: false,
        complete: function(results) {
            let movieData = tools.splitGenres(results.data); //split | separated genres into arrays
            let result = tools.searchMovies(movieData);
            let jsonResults = JSON.parse(JSON.stringify(result));
            res.json(jsonResults)
        }
    });
})

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,'/index.html'));
})

app.listen(port, () => {
    console.log('app listening on port ${port}')
})

