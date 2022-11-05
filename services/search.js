//const { query } = require('express');

//const { query } = require('express');

function matches(data){

    //Put json search terms into arrays
    //genres
    var searchGenres = [];
    if(Array.isArray(data.query.genres)){
        data.query.genres.forEach(genre => {
            if(genre != '') searchGenres.push(genre);
        });
    }
    else{
        searchGenres.push(data.query.genres);
    }
    //keywords
    var searchKeywords = [];
    data.query.keywords.forEach(keyword => {
        if(keyword != '') searchKeywords.push(keyword);
    });

    //Fuse options: Fuzzy Search (used only for keyword search)
    const Fuse = require('fuse.js'); 
    var options = { //Fuse options
        includeScore: false,
        isCaseSensitive: false,
        includeMatches: false,
        shouldSort: true,
        findAllMatches: true,
        threshold: 0.3,
        keys: ['keywords'],
    }

    //Searching List, includes only relevant data
    let movieSearchList = [];
    data.allData.movies.forEach(movie => {
        movieSearchList.push({
            movieId: movie.id,
            keywords: movie.keywords,
            genres: movie.genres
        })
    });

    //Create array of movieIds for movies matching keywords
    let fuse = new Fuse(movieSearchList, options);
    let keywordMatches = [];
        searchKeywords.forEach(keyword => {
            console.log("keyword: ",keyword);
        let result = fuse.search(keyword);
        result.forEach(r => {
            keywordMatches.push(r.item.movieId);
        });
    });

    //Creat array of movieIds for movies matching genres
    let genreMatches = [];
    console.log("search genres: ", searchGenres);
    //ADD ANY OR ALL GOES HERE FOR GENRE-- IF ELSE ON SEARCH TYPE
    movieSearchList.forEach(movie => {
        if(searchGenres.every(genre =>{
            return movie.genres.includes(genre);
        }))
        genreMatches.push(movie.movieId);
    });
    
    //Create array of movies that match both genre and keyword 
    let bestMatches = [];
    console.log(genreMatches);
    if(genreMatches.length > 0){ //if genres are searched
        for(const genre of genreMatches){ //only add movies that match genre and keyword
            if(keywordMatches.includes(genre)){
                if(!bestMatches.includes(genre)){
                    bestMatches.push(genre);
                }
            }
        }
    }
    else{ //if no genres searched, only add keywords
        for(const keyword of keywordMatches){
            if(!bestMatches.includes(keyword)){
                bestMatches.push(keyword);
            }
        }
    }

    if(keywordMatches > 0){ //if keywords are searched
        for(const keyword of keywordMatches){ //only add movies that match genre and keyword
            if(genreMatches.includes(keyword)){
                if(!bestMatches.includes(keyword)){
                    bestMatches.push(keyword);
                }
            }
        }
    }
    else{ //only add genres
        for(const genre of genreMatches){
            if(!bestMatches.includes(genre)){
                bestMatches.push(genre);
            }
        }
    }


    //Filter movie objects into new arrays of matching movies
    bestMatchMovies = [];
    bestMatchMovies.push(data.allData.movies.filter(movie => {
        //console.log("movie id: ", movie.id);
        if(bestMatches.includes(movie.id)) return movie;
    }))

    //Package results to return, including the search terms
    let exportData = {
        searchGenres: searchGenres,
        searchKeywords: searchKeywords,
        bestMatches: bestMatchMovies[0]
    }
    return exportData;
}

module.exports = {matches};