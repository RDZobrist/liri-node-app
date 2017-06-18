const client = require('./keys.js');
const inquire = require('inquirer');
const fs = require('fs');
var command = process.argv[2];
var spotifyID = "ce82fafa69b7494280ac68da8425daa1";
var spotifySecret = "e1f0cbf99a9f4c2fbb23539ceda73f75";
var omdbKey = "40e9cece";
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var song;
var request = require("request");


var spotify = new Spotify({
     id: spotifyID,
     secret: spotifySecret
});
switch (command) {
     case "my-tweets":
          tweetTweet();
          break;

     case "spotify-this-song":
          if (process.argv[3]) { //if parameter exists
               song = process.argv[3]; // store parameter in variable named song
               clMySong(song); // print song data to console 
          } else { // if no paramter exisits at index [3]

               clMySong("the song ace"); // print default song data to console 
          }

          break;


     case "movie-this":
          movieData();
          break;

     case "do-what-it-says":
          extCmd();
          break;
}

// get tweets
function tweetTweet() {
     const twitter = new Twitter(client);
     var params = { screen_name: 'DEVrdz88' };
     twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
               console.log(tweets);
               console.log(response);
          } else { console.log(error); }
     });
}

// get spotify data
function clMySong(song) {

     // spotify search parameters
     spotify.search({
               type: 'track',
               query: song,

               limit: 1

          },
          // callback
          function(err, data) {
               if (err) {
                    return console.log('Error occurred: ' + err);
               } else {
                    let songData = data.tracks.items[0];

                    // extracting data from nestesd array of objects
                    // storing data to local variables
                    let artist = songData.artists[0].name;
                    let songName = songData.name;
                    let albumName = songData.album.name;
                    let songPreview = songData.preview_url;
                    // printing applicable data to screen
                    console.log("Artist: " + artist);
                    console.log("Song name : " + songName);
                    console.log("Album name: " + albumName);
                    console.log("Song Preview : " + songPreview);


               }
          });
};
// get data on movie from omdbbody
function movieData(movie) {
     if (process.argv[3]) {
          let movie = process.argv[3];
     }
     if (process.argv[4]) {
          movie = movie + " " + process.argv[4];
          // if movie title is two words, concatonate paramters 4 and 5

     } else if (process.argv[4] && process.argv[5]) {

          // store concatonated string in variable named movie
          movie = movie + " " + process.argv[4] + " " + process.argv[5];

          // if movie title is three words,  concatonate paramters 4 and 5 and 6
     } else if (process.argv[4] && process.argv[5] && process.argv[6]) {

          // store concatonated string iin variable named movie
          movie = movie + " " + process.argv[4] + " " + process.argv[5] + " " + process.argv[6];
          // if movie title is four words,  concatonate paramters 4, 5, 6 and 7
     } else if (process.argv[4] && process.argv[5] && process.argv[6] && process.argv[7]) {
          // store concatonated string iin variable named movie
          movie = movie + " " + process.argv[4] + " " + process.argv[5] + " " + process.argv[6] + " " + process.argv[7];
     }
     // Then run a request to the OMDB API with the movie specified
     request("http://www.omdbapi.com/?t=" + movie + "&apikey=40e9cece", function(error, response, body) {

          // If the request is successful (i.e. if the response status code is 200)
          if (!error && response.statusCode === 200) {
               let data = response.body;

               // console.log(data.split(","));

               // Parse the body of the site and recover just the imdbRating
               // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
               console.log("Title: " + JSON.parse(body).Title);
               console.log("Year of Initial Release: " + JSON.parse(body).Year);
               console.log("Imdb Rating: " + JSON.parse(body).imdbRating);
               console.log("Country Movie Produced in: " + JSON.parse(body).Country);
               console.log("Language: " + JSON.parse(body).Language);
               console.log("Plot: " + JSON.parse(body).Plot);
               console.log("Actors and Actresses: " + JSON.parse(body).Actors);


          }
     });
};



// get command from external js file 
function extCmd() {
     // This block of code will read from the "movies.txt" file.
     // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
     // The code will store the contents of the reading inside the variable "data"
     fs.readFile("random.txt", "utf8", function(error, data) {

          // If the code experiences any errors it will log the error to the console.
          if (error) {
               return console.log(error);
          }



          // Then split it by commas (to make it more readable)
          var dataAdj = data.split(",");

          // We will then re-display the content as an array for later use.
          let command = dataAdj[0];
          if (command === "spotify-this-song") {
               song = dataAdj[1];
               clMySong(song);

          }
          if (command === "movie-this") {
               movie = dataAdj[1];
               movieData(movie);

          }

     });

};
