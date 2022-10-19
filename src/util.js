//Perform all operations on the data return search results
function modifyData(parsedData, search){
    splitGenres(parsedData);
    let movieData = searchMovies(parsedData, search);
    let outputData = {movies: movieData, search: search}
    console.log("search: ", outputData.search.genre[0])
    return outputData;
}


//Split '|' separated genres into arrays. Returns array of objects
function splitGenres(movies){ 
    for(var obj of movies){
        obj.genres=obj.genres.split('|');
    }
}

//Search array of movie objects. Return array of matching movie objects
function searchMovies(movies, search){
    var matches = []; //array of matching movie objects
    let searchTerms = search.genre;
    let searchType = search.type;

    //make search terms into an array
    let searchArray = [];
    for(const index of searchTerms){
        searchArray.push(index);
    }
    
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
