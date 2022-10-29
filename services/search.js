//const { query } = require('express');

function matches(data){
    //Fuse: Fuzzy Search (used only for keyword search)
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
    let fuse = new Fuse(movieSearchList, options);

    //array of movieIds for movies matching keywords
    let keywordMatches = [];
    data.query.keywords.forEach(keyword => {
        let result = fuse.search(keyword);
        result.forEach(k => {
            keywordMatches.push(k.item.movieId);
        });
    });

    //array of movieIds for movies matching genres
    let genreMatches = [];
    //ADD ANY OR ALL HERE FOR GENRE-- IF ELSE ON SEARCH TYPE
    movieSearchList.forEach(movie => {
        if(data.query.genres.every(genre =>{
            toString(genre);
            return movie.genres.includes(genre);
        }))
        genreMatches.push(movie.movieId);
    });
    
    //array of movies that match genre and keyword 
    let bestMatches = [];
    //Include keyword matches and genre matches if keyword matches is not empty
    if(keywordMatches.length>0){ 
        for(const genre of genreMatches){
            if(keywordMatches.includes(genre)){
                if(!bestMatches.includes(genre)){
                    bestMatches.push(genre);
                }
            }
        }
        for(const keyword of keywordMatches){
            if(genreMatches.includes(keyword)){
                if(!bestMatches.includes(keyword)){
                    bestMatches.push(keyword);
                }
            }
        }
    }
    else{ //Include only genre matches if keyword matches is empty
        for(const keyword of genreMatches){
            if(!bestMatches.includes(keyword)){
                bestMatches.push(keyword);
            }
        }
    }

    //filter movies into new arrays of matches
    bestMatchMovies = [];
    bestMatchMovies.push(data.allData.movies.filter(movie => {
        if(bestMatches.includes(movie.id)) return movie;
    }))

    //package results to return
    let exportData = {
        searchGenres: data.query.genres,
        searchKeywords: data.query.keywords,
        bestMatches: bestMatchMovies[0]
    }
    return exportData;
}

module.exports = {matches};