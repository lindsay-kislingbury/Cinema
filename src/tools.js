
module.exports = { //export the functions to be used in app.js

    //Split '|' separated generes into arrays. Returns array of objects
    splitGenres: function(movies){ 
        for(var obj of movies){
            obj.genres=obj.genres.split('|');
        }
        return movies;
    },

    //Search array of movie objects. Find movies that match search genre. Return array of matching movies
    //Right now only searches based on one string genre. 
    //Need to expand to search against array of search terms?
    //Create a dictionary?
    searchMovies: function(movies,query){
        let search = query.genre;
        //Filter movies by genre
        var output = movies.filter(movie => {
            return movie.genres.find(genre =>{
                if(genre === search){
                    return true;
                };
            });
        });
        return output;
    },


    //Old testing Function. Not using anymore. 
    testing: function(){ //function to test on test data
        //Test Data
        let testquery = "comedy";
        let movies = [
            {
                movieId: 1,
                title: "Toy Story",
                genres: "Adventure|Animation|Children|Comedy|Fantasy"
            },
            {
                movieId: 2,
                title: "Jumanji",
                genres: "Adventure|Children|Fantasy"
            }
        ]
        for(var obj of movies){
            obj.genres=obj.genres.split('|');
        }

        return movies;
    }
    
};