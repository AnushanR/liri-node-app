require("dotenv").config();


var keys = require("./keys");
var request = require("request");
var moment = require("moment");
var dotenv = require("dotenv");
var Spotify = require("node-spotify-api");
var fs = require("fs");
 


var command = process.argv[2];
var value = process.argv.slice(3).join(" ");
var sample = "Mr.Nobody";
var sampletwo = "The Sign Ace of Base"
var divider ="-----------------------------------"



if (command === "concert-this") {
    concert(value);
}

else if (command === "spotify-this-song" && value == false){
    spotify(sampletwo);
}

else if (command === "spotify-this-song"){
    spotify(value);
}



else if (command === "movie-this" && value == false){
    movie(sample);
}

else if (command === "movie-this") {
    movie(value);
}

else if (command === "do-what-it-says") { 
    doIt()
}

else {
    console.log("sorry, i dont understand that command")
}
// function to search for OMDB using user input
function movie (term) {

    var url = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

    request(url, function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  
  if (!error && response.statusCode === 200) {

    // Then we print out the desired info
    console.log(divider);
    console.log("Title of the movie: " + JSON.parse(body).Title);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("Year the movie came out: " + JSON.parse(body).Year);
    console.log("The country where the movie was produced: " + JSON.parse(body).Country);
    // unable to search using rottentomato api field.
    console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).tomatoRating);
    console.log("Language of the movie: " + JSON.parse(body).Language);
    console.log("Plot of the movie: " + JSON.parse(body).Plot);
    console.log("Actors in the movie: " + JSON.parse(body).Actors);
    console.log(divider);
   
  }
  


});

};



function spotify(song) {
        //key for authorization(located in keys.js & .env)
    var spotify = new Spotify(keys.spotify);
    
    
        //spotify call
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } 
        
        console.log(divider);
        console.log("The name of the artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("The songs name: " + data.tracks.items[0].name);
        console.log("Song's preview link: " + data.tracks.items[0].preview_url);
        console.log("The album the song is from: " + data.tracks.items[0].album.name);
        console.log(divider);
      
      });

};



function concert(artist){

    var url ="https://rest.bandsintown.com/artists/"+artist+"?app_id=codingbootcamp";

    request(url, function(error, response, data) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  
  if (!error && response.statusCode === 200) {

    // Then we print out the desired info (api call not working here) *The response I recieved back from the bandsintown API did not allow me to search for venue or artist, was only able to log the data as follows"
    console.log(divider);
    console.log("Info " + data);
    console.log(divider);
    
    
    
  
   
  }
  


});

};

function doIt(){
    
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
      
        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");
        // create two variables that hold the command and query
        var command = output[0];
        var term = output[1];
        
       

        if (command === "spotify-this-song") {
            
           spotify(term);
           
        }

        else if (command === "movie-this") {
            
            movie(term);

        }

        
        else if (command === "concert-this") {
            
            concert(term);

        }


      
      
      });
      

};

   
      
    





       
     



