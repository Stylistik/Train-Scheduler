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

// db.ref().on("child_added", getDbData);

$("submit-btn").on("click", addTrip);

//=====================================

function addTrip() {

  var newTrip = {
    name: $("name-input").val().trim(),
    destination: $("dest-input").val().trim,
    time: $("time-input").val().trim,
    frequency: $("rate-input").val().trim
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

    $("name-imput").val("");
    $("destination-imput").val("");
    $("time-imput").val("");
    $("frequency-imput").val("");

    alert("Trip successfully added.");
  };
};