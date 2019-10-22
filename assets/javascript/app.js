console.log("The version 1 js file for Trains is connected.")

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBwJRB7pJuOXn_nKFIqAWc2booJvht97sE",
    authDomain: "bootcampitesm.firebaseapp.com",
    databaseURL: "https://bootcampitesm.firebaseio.com",
    projectId: "bootcampitesm",
    storageBucket: "bootcampitesm.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

//Button add trains
$( "#target" ).submit(function( event ) {

  	// Grabs user input
  	var trainName = $("#train-input").val().trim();
  	var destinationName = $("#destination-input").val().trim();
  	var trainStart = $("#1st-train").val().trim();
	var freqRate = $("#frequency-input").val().trim();

  	// Creates local "temporary" object for holding train data
  	var newTrain = {
    	name: trainName,
    	destination: destinationName,
    	start: trainStart,
		frequency: freqRate,
		dateCreated: firebase.database.ServerValue.TIMESTAMP
  	};

	// Uploads train data to the database
	database.ref("/trainProject").push(newTrain);

	// Logs train data to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.start);
	console.log(newTrain.frequency);
	console.log("fecha creacion " + dateCreated.toDate);

	// Alert
	alert("New train record added");

	// Reset the input fields
	$("#train-input").val("");
	$("#destination-input").val("");
	$("#1st-train").val("");
	$("#frequency-input").val("");

	// Calculates next train arrival
  	return false;
});

//Firebase event for adding train to the database and a row in the html
	database.ref("/trainProject").on("child_added", function(childSnapshot) {

	console.log(childSnapshot.val());

	// Store train info
	var trainName = childSnapshot.val().name;
	var destinationName = childSnapshot.val().destination;
	var trainStart = childSnapshot.val().start;
	var freqRate = childSnapshot.val().frequency;
	var dateCreated = childSnapshot.val().dateCreated;

	// Train Info
	// console.log(trainName);
	// console.log(destinationName);
	// console.log("1st train: " + trainStart);
	// console.log(freqRate);
	// console.log("d add: " + moment(dateCreated).format("YYYYMMDD"));

	// Get first train departure
	var firstTrain = moment(trainStart, "HH:mm");

    // Current Time
    var currentTime = moment();

    // Difference between schedules
    var diffSched = moment().diff(moment(firstTrain), "minutes");

    // Time apart (remainder)
    var timeRemain = diffSched % freqRate;

     // Minutes until next train
    var tMinsTrain = freqRate - timeRemain;

    // Next Train
    var nextTrain = moment().add(tMinsTrain, "minutes");
	var formattedTime = moment(nextTrain).format("HH:mm");

	// Add each train's data into the table
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" + trainStart + "</td><td>"  + freqRate + "</td><td>" + formattedTime + "</td><td>" + tMinsTrain + "</td>");
});
