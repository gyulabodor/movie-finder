# Movie Finder

## UI & Design:
### I used Material UI components for building the application's UI.
For changing the default styles I created `"style.js"` beside every components whiches including JS objects with CSS key-value pairs.
I gave these objects to the MUI components' `sx={}` attributes.

In one case I used `ThemeProvider` and `createTheme()`, for changing the font-family for the whole project. 
There's only 1 css file `index.css` where I only defined the body's padding and margin, and the box-sizing for the whole document.

## Components:
### There are 5 components that are managing the app.
**App component** 
- Contains and wrappes all the components and global states whiches can be managed via *ContextProviders* and *useContext()* hooks.

**SearchField component**
- Renders and manages the input textbox and search button, TMBD searchMovies request takes place here.

**MovieList component**
- Renders the given list of movies and manages and renders informations about the search type (simple/related).

**MovieListItem component**
- Renders, manages and validates the details of one movie.
    - Wikipedia request and result validation
    - IMDB request and result validation
    - Related search feature and process
    take places here.

**Spinner component**
- Renders a spinner on the given boolean.

## Contexts
### There are 3 contexts that helps to reach and manage global states

**MovieListContext**
- For managing the global `movies` state to change list of movie which will be rendered on it's changing.

**InfoContext**
- For managing the global `isRelated` and `searched` state to change the    information message about the search type.

**LoadingContext**
- For managing the global `isLoading` state to turn ON/OFF the Spinner.

## APIs
### I used 3 different APIs
I used `fetch()` for all the API calls.

**TMDB**
- There are 3 different requests:
 - `searchMovies()` for getting a list of movies with their details by the given title.
 - `fetchTMDBGetActorByMovie()` used for related search, it is getting the Actor's id who is casting in the given movie.  
 - `fetchTMDBDiscoverMovies()` used for getting the movies related to the given actor.

**WIKIPEDIA**
- There's 1 request:
 - `fetchWikipedia()` - for getting a list of pages with the given name.

**IMDB**
- I wasn't sure that you would like me to get the external IMDB link from the movie's wikipedia page and as I saw a lot of articles don't have IMDB urls, so I decided to choose the way to use IMDB api, I registered to rapidapi.com and took it from there.
 - `fetchIMDB()` for getting a list of movies with their details by the given title.

## Related search
### How does it works:
- On `Related Movies` button click it start fetching TMDB with the given `movieID` to get the actors list who play in the movie, I decided to choose the first actor's ID from the result I got, so we will got movies related to that first actor. So I start a new TMBD fetch by that 1 actor's ID and get all the movies He/She plays in and then re-render the list.

## Known weakness/issue

- Fetching english wikipedia was the most difficult part of the exercise I think, the only way I could solve this task is to put together those search parameters as I did. 
For popular movies and for not tha populars (which don't have any article) my fetch() is working great, but in some cases We got wrong articles, I tried different ways to handle this problem, search for categories etc.. but I found that It would be a really hard and complex to fix this. And I would like to send my homework.

Thank you for the chance to solve this exercise, It was a great fun! 