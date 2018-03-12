// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAyiKmcpFIh_7KYFHbryPGuvoujvlqJdVw",
    authDomain: "starfish-garden.firebaseapp.com",
    databaseURL: "https://starfish-garden.firebaseio.com",
    projectId: "starfish-garden",
    storageBucket: "starfish-garden.appspot.com",
    messagingSenderId: "342621025301"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var dest = "";
  var time = "";
  var freq = 0;
  var next = "";
  var away = "";
  var remainder = "";
  var difference = "";

  $("#addtrain").on("click", function(event) {
    event.preventDefault();
  
    name = $("#name-input").val().trim();
    dest = $("#dest-input").val().trim();
    time = moment($("#time-input").val(), 'HH:mm').format('X'); 
    freq = $("#freq-input").val().trim();                       
              console.log("name:", name);
              console.log("destination:", dest);
              console.log("unix time of first train:", time);
              console.log("regular time:", $("#time-input").val())
              console.log("how frequently it leaves:", freq);                        
    difference = moment().diff(moment.unix(time), "mins");        //so this is showing up as a UNIX value rather than mins...
              console.log("difference in unix (not minutes):", difference);
    remainder = difference % freq;
              console.log("remainder of difference and frequency:", remainder);
    away = moment(freq - remainder, "mm").format("mm");
              console.log("how many minutes away:", away);
    next = moment().add(away, "m").format("hh:mm A");
              console.log("next train arrives at:", next);

    database.ref("trains/").push({
        name: name,
        dest: dest,
        time: time,
        freq: freq, 
        next: next, //needs to be in UNIX
        away: away //needs to be in UNIX
    });

  });

database.ref("trains/").on("child_added", function(snapshot) {

    var sv = snapshot.val();
    $("#myform").trigger("reset");

    $(".newtrains").append("<tr class='newtrainrow'><td class='name'>" + sv.name
     + "</td><td class='dest'>" + sv.dest
      + "</td><td class='freq'>Every " + sv.freq
       + " min</td><td class='next'>" + sv.next 
        + "</td><td class='away'>" + sv.away 
         + "</td></tr>");

  }, function(errorObject) {console.log("Errors handled: " + errorObject.code);

    
});


