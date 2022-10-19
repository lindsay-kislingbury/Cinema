//Perform all operations on the data.  Return matching movies and the search terms
function modifyData(parsedData, search){
    splitGenres(parsedData);
    let movieData = searchMovies(parsedData, search);
    let outputData = {movies: movieData, search: search}
    return outputData;
}


//Split '|' separated genres into arrays. Returns array of objects
function splitGenres(movies){ 
    for(var obj of movies){
        obj.genres=obj.genres.split('|');
    }
}

//Search array of movies. Return array of matching movies
function searchMovies(movies, search){
    var matches = [];
    let searchTerms = search.genre;
    let searchType = search.type;

    //Make search terms into an array. Need to make this cleaner
    let searchArray = [];
    for(const index of searchTerms){
        searchArray.push(index);
    }
    
    //Fill matches with matching movies
    movies.forEach(movie => {         
        if(searchType === "all"){ //request body.type.id is all
            if(searchArray.every(term => movie.genres.includes(term))){
                matches.push(movie);
            }
        }
        else if(searchType === "any"){ //request body.type.id is any
            if(searchArray.some(term => movie.genres.includes(term))){
                matches.push(movie);
            } 
        }
    })
    return matches;
}


// export functions to be used in app.js
module.exports = { 
    modifyData: modifyData,
    splitGenres: splitGenres,
    searchMovies: searchMovies
}
