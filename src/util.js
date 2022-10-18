//Perform all operations on the data and return search results
function modifyData(parsedData, search){
    var outputData = splitGenres(parsedData);
    outputData = searchMovies(outputData, search);
    outputData = JSON.parse(JSON.stringify(outputData));
    return outputData;
}


//Split '|' separated genres into arrays. Returns array of objects
function splitGenres(movies){ 
    for(var obj of movies){
        obj.genres=obj.genres.split('|');
    }
    return movies;
}

//Search array of movie objects. Return array of matching movie objects
function searchMovies(movies, search){
    var matches = []; //array of matching movie objects
    let searchTerms = search.genre;
    let searchType = search.type;
    
    movies.forEach(movie => {         
    if(searchType === "all"){ //request body.type.id is all
        if(searchTerms.every(term => movie.genres.includes(term))){
            matches.push(movie);
        }
    }
    else if(searchType === "any"){ //request body.type.id is any
        if(searchTerms.some(term => movie.genres.includes(term))){
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
