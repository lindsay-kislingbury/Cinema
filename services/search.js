const { query } = require('express');

function matches(data){
    //Fuse: Fuzzy Search
    const Fuse = require('fuse.js');

    //Searching List, includes only relevant data
    let movieSearchList = [];
    data.allData.movies.forEach(movie => {
        movieSearchList.push({
            movieId: movie.id,
            keywords: movie.keywords,
            genres: movie.genres
        })
    });

    //fuse options
    var options = {
        includeScore: false,
        isCaseSensitive: false,
        includeMatches: false,
        shouldSort: true,
        findAllMatches: true,
        threshold: 0.05,
        keys: ['keywords'],
    }

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
        if(data.query.genres.some(genre =>{
            toString(genre);
            return movie.genres.includes(genre);
        }))
        genreMatches.push(movie.movieId);
    });
    
    //array of movies that match genre and keyword 
    //loop both ways to get unique items in each list
    let bestMatches = [];
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

    genreMatchMovies= [];
    genreMatchMovies.push(data.allData.movies.filter(movie => {
        if(genreMatches.includes(movie.id)) return movie;
    }))
    keywordMatchMovies = [];
    keywordMatchMovies.push(data.allData.movies.filter(movie => {
        if(keywordMatches.includes(movie.id)) return movie;
    }))
    bestMatchMovies = [];
    bestMatchMovies.push(data.allData.movies.filter(movie => {
        if(bestMatches.includes(movie.id)) return movie;
    }))

    //package results to return
    let exportData = {
        searchGenres: data.query.genres,
        searchKeywords: data.query.keywords,
        genreMatches: genreMatchMovies[0],
        keywordMatches: keywordMatchMovies[0],
        bestMatches: bestMatchMovies[0]
    }
    return exportData;
}

module.exports = {matches};