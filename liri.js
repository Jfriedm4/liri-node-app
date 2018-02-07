// user input variables
var userCommand = process.argv;
var songName = userCommand[3];
var movieName = userCommand[3];
var OMDBqueryURL = "";


// Stuff being required
require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require("./keys.js");

// store the api keys in variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// command functions
function getTweets() {

    var params = {screen_name: 'JeremyGWCoding'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("---------------------------TWEETS---------------------------------");
             for (i = 0; i <4; i++) {
                 console.log(
`
TWEET:
${tweets[i].text}
CREATED AT:
${tweets[i].created_at}
`);
             }
         }
     })
}


function getSong() {
    if (songName) {
        spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
        console.log("-------------------------SPOTIFY SEARCH---------------------------");
        console.log("SONG TITLE: " + data.tracks.items[0].name);
        console.log("ARTIST: " + data.tracks.items[0].album.artists[0].name); 
        console.log("ALBUM TITLE: " + data.tracks.items[0].album.name);
        console.log("PREVIEW LINK: " + data.tracks.items[0].album.external_urls.spotify);
        });
    } else {
        console.log("I'M SORRY. PLEASE ENTER A SONG TITLE AFTER THE COMMAND 'spotify-this'.")
    }
}


function getMovie() {
    if (movieName) {
        OMDBqueryURL = "https://www.omdbapi.com/?apikey=9f68b70&s&y=&plot=short&t=" + movieName;
        request(OMDBqueryURL, function (error, response, body) {
            //console.log('error:', error); // Print the error if one occurred
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            var response = JSON.parse(body);
            //console.log(response); // Print the HTML for the Google homepage.

            console.log("-----------------------------OMDB SEARCH---------------------------");
            console.log("TITLE: " + response.Title);
            console.log("YEAR: " + response.Year);
            console.log("IMDB RATING: " + response.Ratings[0].Value);
            console.log("ROTTEN TOMATOES RATING: " + response.Ratings[1].Value);
            console.log("COUNTRY: " + response.Country);
            console.log("LANGUAGE: " + response.Language);
            console.log("PLOT: " + response.Plot);
            console.log("ACTORS: " + response.Actors);
        });
    } else {
        OMDBqueryURL = "https://www.omdbapi.com/?apikey=9f68b70&s&y=&plot=short&t=rogue+one";
        request(OMDBqueryURL, function (error, response, body) {
            //console.log('error:', error); // Print the error if one occurred
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            var response = JSON.parse(body);
            //console.log(response); // Print the HTML for the Google homepage.

            console.log("PLEASE ENTER A MOVIE TITLE. HERE'S AN EXAMPLE.")
            console.log("-----------------------------OMDB SEARCH---------------------------");
            console.log("TITLE: " + response.Title);
            console.log("YEAR: " + response.Year);
            console.log("IMDB RATING: " + response.Ratings[0].Value);
            console.log("ROTTEN TOMATOES RATING: " + response.Ratings[1].Value);
            console.log("COUNTRY: " + response.Country);
            console.log("LANGUAGE: " + response.Language);
            console.log("PLOT: " + response.Plot);
            console.log("ACTORS: " + response.Actors);
        });

    }

}


function doThings() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        userCommand[2] = dataArr[0];
        songName = dataArr[1];
        commands();
    })

}


function commands() {
    if (userCommand[2] === "twitters") {
        getTweets();
    
    } else if (userCommand[2] === "spotify-this") {
        getSong();
    
    } else if (userCommand[2] === "movie-this") {
        getMovie();
    
    } else if (userCommand[2] === "do-things") {
        doThings();
    
    } else if (userCommand[2]) {
        console.log("I'M SORRY. THAT COMMAND IS NOT VALID.");
    
    } else {
         console.log("PLEASE ENTER A COMMAND.");
    }
    }

// on load user instructions
console.log(`
------------------------------------------------------------------
                /$$       /$$$$$$ /$$$$$$$  /$$$$$$
               | $$      |_  $$_/| $$__ $$ |_  $$_/
               | $$        | $$  | $$  \ $$   | $$  
               | $$        | $$  | $$$$$$$/  | $$  
               | $$        | $$  | $$__ $$   | $$  
               | $$        | $$  | $$  \ $$   | $$  
               | $$$$$$$$ /$$$$$$| $$  |$$  /$$$$$$
               |________/|______/|__/  |__/|______/
-----------------------------------------------------------------

-----------------------------------------------------------------
PLEASE ENTER A COMMAND IN THE FORMAT: node liri 'COMMAND-NAME'
-----------------------------------------------------------------

VALID COMMANDS:
* twitters
* spotify-this '<SONG NAME HERE>' or '<SONG NAME HERE & ARTIST NAME HERE>'
* movie-this
* do-things
`);

commands();