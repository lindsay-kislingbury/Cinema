# Working with data passed to the HTML pages


## Search Form   
views/index.ejs

* Must include  `enctype = "multipart/form-data"` in form action.    

* Example:    
`<form action = "/search" enctype = "multipart/form-data" method = "post">`
    
### Form Values:

* The form can dynamically create checkboxes with the value of each genre present in the data set. 
* An array of all genres is passed to the index page. 
* The values sent from the form must have the `name` property set to "genres", and the `value` property set to the value of the specific genre chosen.
* Access this data using EJS.  
    EX:    
     `<%genres[0]%>` will output the first genre in the list 
     `<%=genres[i]%>` will read the value of the genre at i in a loop    
* Documentation for EJS here: https://ejs.co/    
    Heres a useful topic from stackoverflow on using EJS:  https://stackoverflow.com/questions/10326950/render-a-variable-as-html-in-ejs    

### Quick Reference for EJS Tags  

`<%`'   Scriptlet' tag, for control-flow, no output    
`<%_`   ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it     
`<%=`   Outputs the value into the template (HTML escaped)    
`<%-`   Outputs the unescaped value into the template    
`<%#`   Comment tag, no execution, no output    
`<%%`   Outputs a literal '<%'    
`%>`    Plain ending tag    
`-%>`   Trim-mode ('newline slurp') tag, trims following newline    
`_%>`   ‘Whitespace Slurping’ ending tag, removes all whitespace after it    


## Displaying Results 
views/results.ejs    

* Use EJS to access the movie data. 
* This is how the data you have access to on the results page is structured:
    ```
    searchResults
    {
        {
            "genreChoice"   : "any" / "all"
            "genreMatch"    : boolean
            "keywordMatch"  : boolean
            "searchGenres"  : […]
            "searchKeywords": ""
            "bestMatches"   : […]
            "matchFound"    : boolean
        }
    }, ...
    ```
#### <li>genreChoice
string "any" or "all". The user's choice to search for any or all genres.    
#### <li>genreMatch    
boolean. Indicates whether the search found a match for genre searched.    
EX: on a search for "horror" if the search found any horror movies, genreMatch will be `true`    
#### <li>keywordMatch    
boolean. Same as above applied to the search keyword 
#### <li>searchKeywords    
string. This is the string keyword the user entered on in the search form.  
#### <li>matchFound    
boolean. Indicates whether the search found any matches.   
`true` indicates that at least one match was found.  
#### <li>bestMatches   
array of movies returned from the search.     
closer look at the bestMatches array:  
```
bestMatches
{
    keywordMatch    : boolean
    genreMatch      : boolean
    id	            : ""
    title	        : ""
    overview        : ""
    tagline         : ""
    runtime	        : ""
    homepage        : ""
    language        : ""
    releaseDate     : ""
    genres	        : […]
    keywords	    : […]
}
```    
#### <li>keywordMatch    
boolean. Indicates whether the search found matches for the search keyword.    
#### <li>genreMatch    
boolean. Same as above for the search genres.    
#### <li>id    
string id number. unique for each movie    
#### <li>title    
string title. this is the original title for the movie.    
#### <li>overview    
string overview. ranges from one to five sentences. all movies have an overview.   
#### <li>tagline    
string tagline. short, one sentence tagline for the movie. 
#### <li>runtime    
string runtime in minutes.    
#### <li>homepage    
string homepage for a movie.    
WARNING! some of the homepage links are broken or point to old sites. 
#### <li>language    
string original language of the movie.    
#### <li>releaseDate    
string relase date. format: `2/5/2004`    
#### <li>genres    
array of genres associated with the specific movie.    
```genres
{
    0: "History",
    1: "Romance",
    2: "War"
} 
```    
#### <li>keywords    
array of keywords associated with the specific movie.    
```keywords   
{
    0:	"nurse"
    1:	"patriotism"
    2:	"hawaii"
    3:	"world war ii"
}
```











