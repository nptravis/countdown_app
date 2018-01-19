var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
var lastDay = new Date(2017, 06, 28);
var oneDay = 24*60*60*1000; // hours, minutes, seconds, milliseconds

if(dd<10) {
dd='0'+dd
}
if(mm<10) {
mm='0'+mm
}



var dat = document.getElementById("dat");
var after = document.getElementById("after");
var body = document.getElementById("body");
var btn = document.getElementById("btn");
var left = document.getElementById("left");
var dailyMessage = document.getElementById("daily-message");
var days = workingDays.march.length + workingDays.april.length + workingDays.may.length + workingDays.june.length

var todayDate = mm + '/' + dd + '/' + yyyy;

dat.innerHTML = "<h4>" + todayDate + "</h4>"

btn.addEventListener("click", function(){
	
  // var diffDays = Math.round(Math.abs(  (today.getTime() - lastDay.getTime())/(oneDay) ));
  function isBigEnough(value){
  	return value > today.getDate();
  }

 left.innerHTML = "<h4>" + 
  
};

 if (today.getDate() == 28) {
  body.style.backgroundImage = "url('https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5230017886001_5219431537001-vs.jpg?pubId=5104226627001&videoId=5219431537001')";
  dailyMessage.innerHTML = "<h2>You are a golden god!! Welcome to the other side, woohooo!!!!</h2><img src='https://media.giphy.com/media/2YjYpOl1eBy6I/giphy.gif'><br><img src='https://media.giphy.com/media/mn1cym1jiJOUg/giphy.gif'><br><img src='https://media.giphy.com/media/dMdhIhcjZGHfi/giphy.gif'><audio controls src='audio/alive.mp3' autoplay loop></audio>";

 }


});


