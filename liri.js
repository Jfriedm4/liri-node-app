import { log } from "util";

var userCommand = process.argv;

// Stuff being required
require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require("./keys.js");
var functions = require("./functions.js");

// store the api keys in variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// store functions in variables
// var getTweets = functions.getTweets();

// on load user instructions
console.log(`
------------------------------------------------------------------
                /$$       /$$$$$$ /$$$$$$$  /$$$$$$
               | $$      |_  $$_/| $$__  $$|_  $$_/
               | $$        | $$  | $$  \ $$  | $$  
               | $$        | $$  | $$$$$$$/  | $$  
               | $$        | $$  | $$__  $$  | $$  
               | $$        | $$  | $$  \ $$  | $$  
               | $$$$$$$$ /$$$$$$| $$  | $$ /$$$$$$
               |________/|______/|__/  |__/|______/
-----------------------------------------------------------------

-----------------------------------------------------------------
PLEASE ENTER A COMMAND IN THE FORMAT NODE LIRI 'COMMAND-NAME'
-----------------------------------------------------------------

VALID COMMANDS:
* MY-TWEETS
* SPOTIFY-THIS-SONG
* MOVIE-THIS
* DO-WHAT-IT-SAYS
`);

var params = {screen_name: 'JeremyGWCoding'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
         for (i = 0; i <4; i++) {
             console.log("TWEET: " + tweets[i].text);
             console.log("CREATED AT: " + tweets[i].created_at);
         }
     }
 })

// user commands

// if (userCommand[2] === "MY-TWEETS") {
// }
// } else if (userCommand[2] === "spotify-this-song") {

// } else if (userCommand[2] === "movie-this") {

// } else if (userCommand[2] === "do-what-it-says") {

// } else {
//     console.log("I'm sorry. This is not a valid command.")
// }