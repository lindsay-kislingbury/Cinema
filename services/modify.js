//Return all genres present in the dataset
function genreData(movies){
    let modifiedMovies = movieData(movies);
    genreArr = [];
    modifiedMovies.forEach(movie => {
        movie.genres.forEach(genre => {
            if(!genreArr.includes(genre)) genreArr.push(genre);
        });
    });
    return genreArr;
}

//Returns modified movie data
function movieData(parsedData){
    var modifiedMovies = [];
    parsedData.forEach(movie => {
        var movieInfo = {};
        //Keep just the useful info
        movieInfo.keywordMatch = false;
        movieInfo.genreMatch = false;
        movieInfo.id = movie.id;
        movieInfo.title = movie.title;
        movieInfo.overview = movie.overview;
        movieInfo.tagline = movie.tagline;
        movieInfo.runtime = movie.runtime;
        movieInfo.homepage = movie.homepage;
        movieInfo.language = languageCnv(movie.original_language);
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
        keywordArr.push(movieInfo.language);
        movieInfo.keywords = keywordArr;
        modifiedMovies.push(movieInfo);
    });
    return modifiedMovies;
}

//Return the string name of language
function languageCnv(language){ 
    if (language === "af") return "Afrikaans";
    if (language === "ar") return "Arabic";
    if (language === "cn") return "Chinese";
    if (language === "cs") return "Czech";
    if (language === "da") return "Danish";
    if (language === "de") return "German";
    if (language === "el") return "Greek";
    if (language === "en") return "English";
    if (language === "es") return "Spanish";
    if (language === "fa") return "Farsi";
    if (language === "fr") return "French";
    if (language === "he") return "Hebrew";
    if (language === "hi") return "Hindi";
    if (language === "hu") return "Hungarian";
    if (language === "id") return "Indonesian";
    if (language === "is") return "Icelandic";
    if (language === "it") return "Italian";
    if (language === "ja") return "Japanese";
    if (language === "ko") return "Korean";
    if (language === "ky") return "Kyrgyz";
    if (language === "nb") return "Norwegian";
    if (language === "nl") return "Dutch";
    if (language === "no") return "Norwegian";
    if (language === "pl") return "Polish";
    if (language === "ps") return "Dari";
    if (language === "pt") return "Portuguese";
    if (language === "ro") return "Romanian";
    if (language === "sl") return "Slovenian";
    if (language === "sv") return "Swedish";
    if (language === "ta") return "Tamil";
    if (language === "te") return "Telugu";
    if (language === "th") return "Thai";
    if (language === "tr") return "Turkish";
    if (language === "vi") return "Vietnamese";
    if (language === "xx") return "Invented Language";
    if (language === "zh") return "Chinese";
    if(!language) return "No Language Information";

}

module.exports = {genreData, movieData};