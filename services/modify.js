//Returns modified array of movies with relevant info, better formatting
function exportData(parsedData, query){
    let movies = movieData(parsedData);
    let allKeywords = keywordData(movies);
    let allGenres = genreData(movies)

    let exportData = {
        movies: movies,
        allKeywords: allKeywords,
        allGenres: allGenres
    };

    return exportData;
}

function movieData(parsedData){
    var modifiedMovies = [];
    parsedData.forEach(movie => {
        var movieInfo = {};
        //Keep just the useful info
        movieInfo.id = movie.id;
        movieInfo.title = movie.title;
        movieInfo.overview = movie.overview;
        movieInfo.tagline = movie.tagline;
        movieInfo.runtime = movie.runtime;
        movieInfo.homepage = movie.homepage;
        movieInfo.language = movie.original_language;
        movieInfo.releaseDate = movie.release_date;
        //parse array of genres 
        let genreJson = JSON.parse(movie.genres);
        var genreArr = [];
        genreJson.forEach(genre => {genreArr.push(genre.name);});
        movieInfo.genres = genreArr;
        //parse array of keywords
        let keywordJson = JSON.parse(movie.keywords);
        var keywordArr = [];
        keywordJson.forEach(keyword => {keywordArr.push(keyword.name);});
        movieInfo.keywords = keywordArr;

        modifiedMovies.push(movieInfo);
    });
    return modifiedMovies;
}

function keywordData(movies){
    keywordArr = [];
    movies.forEach(movie => {
        movie.keywords.forEach(keyword => {
            if(!keywordArr.includes(keyword)) keywordArr.push(keyword);
        });
    });
    return keywordArr;
}

function genreData(movies){
    genreArr = [];
    movies.forEach(movie => {
        movie.genres.forEach(genre => {
            if(!genreArr.includes(genre)) genreArr.push(genre);
        });
    });
    return genreArr;
}


module.exports = {exportData};



