
## LIRI - A Node App via Command Line 

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Usage

1. Clone repo
2. npm install
3. cd liri-node-app
4. Please see `notes` below to run the app 
5. ENJOY! 

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Tech Used 

* NodeJS
* JavaScript
* NPM Inquirer[Inquirer](https://npmjs.com/package/inquirer)
* NPM Request [Request](https://www.npmjs.com/package/request).
* NPM Twitter [Twitter](https://www.npmjs.com/package/twitter).
* NPM Spotify [Spotify](https://www.npmjs.com/package/spotify).
* NPM OMDB    [OMDB API](http://www.omdbapi.com).
* Ajax 

## License

N/A

##Notes 

* LIRI will display your latest tweets. If you dont have a Twitter account it will default to my Twitter if no parameters are inputted


Liri will work four different ways which can take in one of the following commands:
<hr>

* `my-tweets`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`

##What Each Command Should Do

<strong>node liri.js my-tweets `<twitter user name here>`<strong>

* This will show your last 20 tweets and when they were created at in your terminal/bash window.
* If no username is entered my default twitter will show.

node liri.js spotify-this-song `<song name here>`
* This will show the following information about the song in your terminal/bash window
* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from
* if no song is provided then your program will default to
* "Dig" by Incubus
<hr>
<strong>node liri.js movie-this `<movie name here>`<strong>
* This will output the following information to your terminal/bash window:
* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.
* Rotten Tomatoes URL.
* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
* If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
* It's on Netflix!
<hr>

<strong>node liri.js do-what-it-says<strong>
* This uses the fs Node package.  Liri will choose one of the three previous commands; using the fs package, Liri will write the randomly-generated command in random.txt, read it, then use the string to call one of LIRI's commands.