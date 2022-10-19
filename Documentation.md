## Get Matching Movies

### POST/search/
First page: views/index.ejs

* Must include  `enctype = "multipart/form-data"` in form action.
    
How to format the post data sent in the HTML POST request (on the home page):
#### Search Genres:
* `name = genre`
* `value = {genre type}`    
* Example: `<input type = "checkbox" name = "genre" value = "Action">`   
#### Any or All:
* `name = type`
* `value = {search type}`    
    * only accepts `value = any` or `value = all`    
* Example: `<input type = "radio" id = "all" name = "type" value = "all">`

   

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


### GET/results/   
Second page: views/results.ejs

Example of data sent to results page on a search for Crime and Sci-Fi
```
{
    movies:
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
            }, {}, {}, ...
        ],
    search:
    {
        genres: [
            0: "Crime"
            1: "Sci-Fi"
        ],
        type: "all"      
    }
}

```

### Using EJS to Access the Data   

Access this data using ejs snippets. Documentation for using ejs snippets here:



Quick Reference for Tags:

`<%`'Scriptlet' tag, for control-flow, no output    
`<%_` ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it     
`<%=` Outputs the value into the template (HTML escaped)    
`<%-` Outputs the unescaped value into the template    
`<%#` Comment tag, no execution, no output    
`<%%` Outputs a literal '<%'    
`%>` Plain ending tag    
`-%>` Trim-mode ('newline slurp') tag, trims following newline    
`_%>` ‘Whitespace Slurping’ ending tag, removes all whitespace after it    


Example stub to display the genres searched and all matching movies and their genres:   

```
<body>
    <h2>
        List of all movies matching: 
        <% for(var i=0; i < data.search.genre.length; i++) { %>
                <%- data.search.genre[i] %> ,
        <% } %>
    </h2>
    <br>
    <% for(var i=0; i < data.movies.length; i++) { %>
        <li>
            <b> <%- data.movies[i].title %> </b> <br>
            Genres:  
            <% for(var j=0; j < data.movies[i].genres.length; j++) { %>
                    <%- data.movies[i].genres[j] %> ,
            <% } %>
            <br><br>
        </li>
    <% } %>
</body>
```




