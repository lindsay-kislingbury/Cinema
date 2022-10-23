//Returns modified array of movies with relevant info, better formatting
module.exports = { 
    modifyData(parsedData){
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
            //console.log(modifiedMovies);
        });
        return modifiedMovies;
    }
}

