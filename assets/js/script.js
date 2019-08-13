// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCdMvx-v5pzD_0V9iyl9G14DdXQcPbNsEU",
  authDomain: "trainscheduler-c5168.firebaseapp.com",
  databaseURL: "https://trainscheduler-c5168.firebaseio.com",
  projectId: "trainscheduler-c5168",
  storageBucket: "",
  messagingSenderId: "768778725533",
  appId: "1:768778725533:web:bf354baa0ab1785b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

//=====================================

db.ref().on("child_added", getDbData);

$("#submit-btn").on("click", addTrip);

//=====================================

function addTrip() {

  var newTrip = {
    name: $("#name-input").val().trim(),
    destination: $("#dest-input").val().trim(),
    time: $("#time-input").val().trim(),
    frequency: $("#rate-input").val().trim()
  };

  if (
    newTrip.name === "",
    newTrip.destination === "",
    newTrip.time === "",
    newTrip.frequency === ""
    ) {
    alert("please complete all input fields");
  } else{
    db.ref().push(newTrip);

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    alert("Trip successfully added.");
  };
};

function getDbData(childSnapshot) {
  
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var time = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;

  var diffTime = moment().diff(moment(time, "hh:mm"));
  var timeRemainder = diffTime % frequency;
  var minutesAway = frequency - timeRemainder;
  // var minutesAway = moment(frequency - timeRemainder, "minutes").format("minutes");
  console.log("frequency: ", frequency)
  console.log("timeRemainder: ", timeRemainder)
  var arrivalTime = moment().add(minutesAway, "minutes").format("hh:mm");

  var tableRow = $("<tr>");
  tableRow.append(`<td>${name}</td>`);
  tableRow.append(`<td>${destination}</td>`);
  tableRow.append(`<td>${frequency}</td>`);
  tableRow.append(`<td>${arrivalTime}</td>`);
  tableRow.append(`<td>${minutesAway}</td>`);

  $("#trainInfo").append(tableRow);
}