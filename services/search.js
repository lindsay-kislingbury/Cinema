
//Movie Search Function: Combines genres and keywords into an array, 
//Uses fuse.js to do a fuzzy search on title, genres, and keywords of movies
//in the dataset
function matches(data){
    var searchGenres = []; //For use on results page
    var searchKeywords = data.query.keywords; //For use on results page
    var searchTerms = []; //To use for searching. includes keywords and genres
    if(data.query.genres){ //check if genres not empty
        if(Array.isArray(data.query.genres)){ //check if more than one genre
            data.query.genres.forEach(genre => { 
                if(genre != ''){
                    searchGenres.push(genre);
                    searchTerms.push(genre);
                }
            });
        }
        else{
            searchGenres.push(data.query.genres);
            searchTerms.push(data.query.genres);
        }
    }
    searchTerms.push(data.query.keywords);

    console.log(searchTerms);

    //Movie Searching List, includes only relevant data
    let movieSearchList = [];
    data.allData.movies.forEach(movie => {
        movieSearchList.push({
            movieId: movie.id,
            keywords: movie.keywords,
            genres: movie.genres
        })
    });    

    //Fuse options: Fuzzy Search on keyword, genres, and title
    const Fuse = require('fuse.js'); 
    var options = { //Fuse options
        includeScore: false,
        isCaseSensitive: false,
        includeMatches: false,
        shouldSort: true,
        findAllMatches: true,
        threshold: 0.2,
        keys: ['keywords', 'original_title', 'genres'],
    }

    //Create array of movieIds for matching movies
    let fuse = new Fuse(movieSearchList, options);
    let matches = [];
    searchTerms.forEach(term => {
        let result = fuse.search(term);
        result.forEach(r => {
            matches.push(r.item.movieId);
        });
    });
    console.log("matches", matches);

    //Filter movie objects into new arrays of matching movies
    bestMatchMovies = [];
    bestMatchMovies.push(data.allData.movies.filter(movie => {
        if(matches.includes(movie.id)) return movie;
    }))
    console.log(bestMatchMovies);

    //Package results to return, including the search terms
    let exportData = {
        searchGenres: searchGenres,
        searchKeywords: searchKeywords,
        bestMatches: bestMatchMovies[0]
    }
    return exportData;
}

module.exports = {matches};