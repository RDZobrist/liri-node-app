const keys = require('./keys.js');
const inquire = require('inquirer');
const Twitter = require('twitter');
const moment = require('moment')
const Spotify = require('node-spotify-api');
const request = require("request");
const fs = require('fs');
var command = process.argv[2];
var spotifyID = "ce82fafa69b7494280ac68da8425daa1";
var spotifySecret = "e1f0cbf99a9f4c2fbb23539ceda73f75";
var omdbKey = "40e9cece";
// var prompt = inquirer.createPromptModule();
var song;
var movie;
var command;

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
               song = process.argv[3]; //set that value to variable song
               if (process.argv[4]) {
                    song = song + " " + process.argv[4];
               }
               if (process.argv[5]) {
                    song = song + " " + process.argv[4] + " " + process.argv[5];
               }
               if (process.argv[6]) {
                    song = song + " " + process.argv[4] + " " + process.argv[5] + " " + process.argv[6];

               } // store parameter in variable named song
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

     const client = new Twitter(keys.twitterKeys);

     var params = { screen_name: '@DEVrdz88' };
     client.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
              
                
               for (let i = 0; i < 20; i++) {

                    console.log('Tweet # ' + i + "\n\n\t"+ tweets[i].text  +"\n Time: \n\t"+ tweets[i].created_at+ "\n\n\n"); 

                    fs.appendFile("log.txt",  moment() + '\n\n\t\tTweet# :' + i + "'" + tweets[i].text + "   "  , function(err) {
                         // If the code experiences any errors it will log the error to the console.
                         if (err) {
                              return console.log(err);
                         }
                         // Otherwise, it will print: "log.txt was updated!"
                         console.log("log.txt was updated!");

                    });
               }

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
                    // object literal ontaining song's data 

                    // printing applicable data to screen
                    console.log("\t\nArtist:\t\t\n " + artist );
                    console.log("\t\nSong name:\t\t\n " + songName);
                    console.log("\t\nAlbum name:\t\t\n " + albumName);
                    console.log("\t\n Song Preview:\t\t\n " + songPreview );
                    fs.appendFile("log.txt", "\t\nArtist: \t\n" + artist+ " \t\n Song:\t\n " + songName+  " \t\n Album: \t\n" + albumName+ " \t\n Song Preview: \t\n " + songPreview + "\t\n\n\n", function(err) {
                         // If the code experiences any errors it will log the error to the console.
                         if (err) {
                              return console.log(err);
                         }
                         // Otherwise, it will print: "log.txt was updated!"
                         console.log("log.txt was updated!");

                    });

               }
          });
};
/// get data on movie from omdbbody
function movieData() {
     if(!(process.argv[3])){
          movie = "Mr. Nobody";
     }else
     if (process.argv[3]) {
          movie = process.argv[3];
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

               // console.log formatted data 
               console.log("Title: " + JSON.parse(body).Title);
               console.log("Year of Initial Release: " + JSON.parse(body).Year);
               console.log("Imdb Rating: " + JSON.parse(body).imdbRating);
               console.log("Country Movie Produced in: " + JSON.parse(body).Country);
               console.log("Language: " + JSON.parse(body).Language);
               console.log("Plot: " + JSON.parse(body).Plot);
               console.log("Actors and Actresses: " + JSON.parse(body).Actors);
          }

          fs.appendFile("log.txt", "  \n\nTitle: "  + JSON.parse(body).Title + "  `\n\nPlot: " + JSON.parse(body).Plot + "  \n\nActors and actresses: " + JSON.parse(body).Actors + "\n\n\n", function(err) {
               // If the code experiences any errors it will log the error to the console.
               if (err) {
                    return console.log(err);
               }
               // Otherwise, it will print: "log.txt was updated!"
               console.log("log.txt was updated!");

          });
     });
};
// get command from external js file 
function extCmd() {
     var commands = ["spotify-this-song," + " " + "I Want it That Way", "movie-this," + " " + "requiem for a dream", "my-tweets"];
     var randomCommand = Math.floor(Math.random() * commands.length);
     command = commands[randomCommand];

     if (command) {

          fs.writeFile("random.txt", command, function(err) {

               // If the code experiences any errors it will log the error to the console.
               if (err) {
                    return console.log(err);
               } else {
                    // This block of code will read from the "random.txt" file.
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
                              // append data to log.txt
                              fs.appendFile("log.txt", song,function(err) {
                                   // If the code experiences any errors it will log the error to the console.
                                   if (err) {
                                        return console.log(err);
                                   }
                                   // Otherwise, it will print: "movies.txt was updated!"
                                   console.log("log.txt was updated!");

                              });
                         }
                         if (command === "movie-this") {
                              movie = dataAdj[1];
                              movieData(movie);
                              // append data to log.txt
                              fs.appendFile("log.txt", movie, function(err) {
                                   // If the code experiences any errors it will log the error to the console.
                                   if (err) {
                                        return console.log(err);
                                   }
                                   // Otherwise, it will print: "log.txt was updated!"
                                   console.log("log.txt was updated!");

                              });

                         }
                         if (command === "my-tweets") {
                              tweetTweet();

                         }
                    });
               };
          });
     };
};
