
module.exports = { //export the functions to be used in app.js

    splitGenres: function(movies){ //split | separated generes into arrays
        for(var obj of movies){
            obj.genres=obj.genres.split('|');
        }
        return movies;
    },

    searchMovies: function(movies){
        //Filter movies by genre
        var output = movies.filter(movie => {
            return movie.genres.find(genre =>{
                if(genre === "Comedy"){
                    return true;
                };
            });
        });
        return output;
    },

    //const filtered = search.filter((entry) => Object.values(entry).flat().some((val) => typeof val === 'string' && val.includes(searchTerm)));

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