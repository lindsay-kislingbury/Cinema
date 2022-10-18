## Get Matching Movies

### PATH    
POST/search/

* Must include  `enctype = "multipart/form-data"` in form action.

### POST REQUEST     
How to format the post data sent in the HTML POST request:
#### Search Genres:
* `name = genre`
* `value = {genre type}`    
* Example: `<input type = "checkbox" name = "genre" value = "Action">`   
#### Any or All:
* `name = type`
* `value = {search type}`    
    * only accepts `value = any` or `value = all`    
* Example: `<input type = "radio" id = "all" name = "type" value = "all">`

### POST RESPONSE    
* Response data is sent in a json file.       
This is an an array of Movie objects
 
### Response Example:    
Post Request:   
``` 
genre: ['Action', 'Crime', 'Sci-Fi'],
type:  'all'
```    
Post Response:    
```
[
{
    movieId: '519'
    title: 'RoboCop 3 (1993)'
    genres: [
        0:    "Action"
        1:    "Crime"
        2:    "Drama"
        3:    "Sci-Fi"
        4:    "Thriller"
    ]
},
{
    movieId: '1396'
    title: 'Sneakers (1992)'
    genres: [
        0:    "Action"
        1:    "Comedy"
        2:    "Crime"
        3:    "Drama"
        4:    "Sci-Fi"
    ]
}, ...
]

```
### Searchable Genres:   
These are the genres that exist in the data set that we can search for:    

    Adventure   
    Animation    
    Children    
    Comedy    
    Crime    
    Documentary    
    Drama    
    Fantasy    
    Film-Noir    
    Horror    
    IMAX    
    Musical    
    Mystery    
    Romance    
    Sci-Fi   
    Thriller   
    War   
    Western   
