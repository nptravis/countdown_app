var deadline = 'January 31 2018 18:50:00 UTC+0700';
$(document).ready(function(){
	
	if(top.location.pathname == '/index'){
			
			$.getJSON(Flask.url_for("showApps")).done(function(data){
				console.log(data.length)
				
				// initialize html for clock for every app
				for(var i = 0; i < data.length; i++){
					var htmlString = 
							'<div class="row well">'+
								'<div class="col-sm-2">'	+
									'<h3>Days<hr></h3>'+
									'<div id="day"></div>'+
								'</div>'+
								'<div class="col-sm-2">'+
									'<h3>Hours<hr></h3>'+
									'<div id="hour"></div>'+
								'</div>'+
								'<div class="col-sm-2">'+
									'<h3>Minutes<hr></h3>'+
									'<div id="min"></div>'+
								'</div>'+
								'<div class="col-sm-2">'+
									'<h3>Seconds<hr></h3>'+
									'<div id="sec"></div>'+
							'</div>';
						document.getElementById("appDiv").innerHTML = htmlString;
					
					// set time remaining inside the appDiv
					console.log(data[i][2])
					initializeClock(data[i][2]);
				}
				
			});
		
	}

	function getTimeRemaining(endtime){
	  var t = Date.parse(endtime) - Date.parse(new Date());
	  var seconds = Math.floor( (t/1000) % 60 );
	  var minutes = Math.floor( (t/1000/60) % 60 );
	  var hours = Math.floor( (t/(1000*60*60)) % 24 );
	  var days = Math.floor( t/(1000*60*60*24) );
	   return {
	    'total': t,
	    'days': days,
	    'hours': hours,
	    'minutes': minutes,
	    'seconds': seconds
  		}
	}

	function initializeClock(endtime){
	  var days = document.getElementById("day");
	  var hours = document.getElementById("hour");
	  var minutes = document.getElementById("min");
	  var seconds = document.getElementById("sec");

	  function updateClock(){
	  var t = getTimeRemaining(endtime);
	  days.innerHTML = "<h2>" + t.days + " :" + "</h2>";
	  hours.innerHTML = "<h2>" + t.hours + " :" + "</h2>";
	  minutes.innerHTML = "<h2>" + t.minutes + " :" + "</h2>";
	  seconds.innerHTML = "<h2>" + t.seconds + "</h2>";
  
  
  	if(t.total<=0){
    	clearInterval(timeinterval);
  	}
	}


		updateClock(); // run function once at first to avoid delay
		var timeinterval = setInterval(updateClock,1000);
	}
	 
});



// localStorage.setItem('text', fieldValue);
// localStorage.getItem('text');
// localStorage.removeItem('text');
