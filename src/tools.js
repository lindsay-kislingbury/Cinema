
module.exports = { //export the functions to be used in app.js

    //Split '|' separated generes into arrays. Returns array of objects
    splitGenres: function(movies){ 
        for(var obj of movies){
            obj.genres=obj.genres.split('|');
        }
        return movies;
    },

    //Search array of movie objects. Return array of matching movie objects
    //Right now only searches based on one genre. 
    //Need to expand to search against array of search terms?
    //Create a dictionary?
    searchMovies: function(movies, search){
        var output = movies.filter(movie => {
            return movie.genres.find(genre =>{
                if(genre === search){
                    return true;
                };
            });
        });
        return output;
    }
    

};