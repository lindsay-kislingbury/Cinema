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



### POST/search/
First page: views/index.ejs

* Must include  `enctype = "multipart/form-data"` in form action.
* Example: `<form action = "/search" enctype = "multipart/form-data" method = "post">`
    
### Form Values:
How to format the form data sent in the HTML POST request (on the home page):
*   As an example, the form dynamically creates checkboxes with the value of each keyword in the allKeywords array passed to the index page.    
* This is done using EJS, read the documentation here: https://ejs.co/    
Heres a useful topic from stackoverflow on EJS:  https://stackoverflow.com/questions/10326950/render-a-variable-as-html-in-ejs

### Structure of the Data   
*This is how the data you have access to on the index page is structured:
```
data{
    movies: 
    id: *string 4 digit number*
    title: *string*        
    overview: *string description of the movie*
    tagline: *string tagline for the movie*
    runtime: *string time in minutes*
    homepage: *string url*
    language: *string*
    releaseDate: *string date in '2014-11-05' format*    
    genres: *array of strings*
    keywords: *array of strings*
    },
    allKeywords: *array of all keywords present in the whole dataset*
    allGenres: *array of all genres present in the dataset*
};
```








