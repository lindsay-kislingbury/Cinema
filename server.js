//Express Routing 
const express = require('express') //express plug in
const app = express()   
const port = 3000
const path = require('path'); 
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

//Multer: Multi part request body
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

//File Handling 
const fs = require('fs'); //file stream
const csvFilePath = 'movieData/moviesA.csv'; //csv file path 
const csvParser = require("csv-parser") //csv-parser plug in

//JS Functions
const modify = require('./services/modify.js');

//Home page
app.get('/', (req,res,next) =>{
    req.header('Content-Type', 'application/json')
    var parsedData = [];
    //Parse csv data to array of objects
    fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (data) => {
            parsedData.push(data);
        })
        .on("end", () =>{
            console.log("csv-parser success, # of movies: ", parsedData.length);
            let data = modify.exportData(parsedData);
            app.set("allData", data);
            //console.log(data.allKeywords[0]);
            res.render('index', {data});
        })
})

//When html navigates to /search. using multer to get multipart form data
app.post('/search', upload.none(), function(req, res) {
    const allData = app.get("allData");
    let data = {
        allData: allData,
        query: req.body
    }
    res.render('results', {data});

})

app.get('/results', function(req, res){
    
})
//port 3000
app.listen(port, () => {
    console.log('app listening on port ${port}')
})

