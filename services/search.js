//Movie Search. Return all data for results page
function matches(query, movieData){
    var matchFound = false; 

    //create array of selected genres for searching
    var searchGenres = []; 
    var searchKeywords = query.keywords; 
    if(query.genres){ //check genres not empty
        if(Array.isArray(query.genres)){ //check more than one genre
            query.genres.forEach(genre => { 
                if(genre != ''){
                    searchGenres.push(genre);
                }
            });
        }
        else{
            searchGenres.push(query.genres);
        }
    }

    //Movie Searching List, includes only data needed for search
    let movieSearchList = [];
    movieData.forEach(movie => {
        movieSearchList.push({
            movieId: movie.id,
            keywords: movie.keywords,
            genres: movie.genres
        })
    });    

    //Fuse options: Fuzzy Search on keyword and title
    const Fuse = require('fuse.js'); 
    var options = { //Fuse options
        includeScore: false,
        isCaseSensitive: false,
        includeMatches: false,
        shouldSort: true,
        findAllMatches: true,
        threshold: 0.1,
        keys: ['keywords', 'original_title'],
    }

    //Keyword Search. Store matching movieIds in array
    let fuse = new Fuse(movieSearchList, options);
    let keywordMatches = [];
    var keywordMatchFound = false;
    if(searchKeywords){//Find keyword matches using fuse.js
        if(searchKeywords){
            let result = fuse.search(searchKeywords);
            if(result){
                result.forEach(result => {
                    keywordMatches.push(result.item.movieId);
                })
            }
        }
        if(keywordMatches.length > 0){
            keywordMatchFound = true;
        } else {
            keywordMatchFound = false;
        }
    }

    //Genre Search. Store matching movieIds in array. Search for all or any 
    let genreMatches = [];
    var genreMatchFound = false;
    if(searchGenres.length > 0){
        if(query.genreChoice == 'any'){ //Any 
            movieSearchList.forEach(movie => {
                let isMatch = searchGenres.some(genre => movie.genres.includes(genre));
                if(isMatch){
                    genreMatches.push(movie.movieId);
                }
            });
        }
        else if(query.genreChoice == 'all'){ //All
            movieSearchList.forEach(movie => {
                let isMatch = searchGenres.every(genre => movie.genres.includes(genre));
                if(isMatch){
                    genreMatches.push(movie.movieId);
                }
            });
        }
        if(genreMatches.length > 0){
            genreMatchFound = true;
        } else {
            genreMatchFound = false;
        }
    }
    
    //Set match found 
    if(genreMatchFound || keywordMatchFound){
        matchFound = true;
    } 

    //Filter movie objects into new arrays of matching movies
    var bestMatchMovies = [];
    if(keywordMatchFound && genreMatchFound){ //movies matching genre && keyword
        bestMatchMovies.push(movieData.filter(movie => {
            if(keywordMatches.includes(movie.id) && genreMatches.includes(movie.id)){
                let tempMovie = movie;
                tempMovie.genreMatch = true;
                tempMovie.keywordMatch = true;
                return tempMovie;
            } 
        }))

    }
    else if(genreMatchFound){//movies matching only genre
        bestMatchMovies.push(movieData.filter(movie => {
            if(genreMatches.includes(movie.id)){
                let tempMovie = movie;
                tempMovie.genreMatch = true;
                return tempMovie;
            } 
        }))
    }
    else if (keywordMatchFound) {//movies matching only keyword
        bestMatchMovies.push(movieData.filter(movie => {
            if(keywordMatches.includes(movie.id)){
                let tempMovie = movie;
                tempMovie.keywordMatch = true;
                return tempMovie;
            } 
        }))
    }

    //Package results for results page, including the search terms
    let exportData = {
        genreChoice: query.genreChoice,
        genreMatch: genreMatchFound,
        keywordMatch: keywordMatchFound,
        searchGenres: searchGenres,
        searchKeywords: searchKeywords,
        bestMatches: bestMatchMovies[0],
        matchFound: matchFound,
    }
    return exportData;
}

module.exports = {matches};