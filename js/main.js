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

var workingDays = {
	march: [20, 21, 22, 23, 24, 27, 28, 29, 30, 31],
	april: [3,4,5,6,7,19,20,21,24,25,26,27,28],
	may: [1,2,3,4,5,8,9,10,11,12,15,16,17,18,19,22,23,24,25,26,30,31],
	june: [1,2,5,6,7,8,9,16,19,20,21,22,23,27,28]
};


var dat = document.getElementById("dat");
var after = document.getElementById("after");
var btn = document.getElementById("btn");
var left = document.getElementById("left");
var days = workingDays.march.length + workingDays.april.length + workingDays.may.length + workingDays.june.length

var todayDate = mm + '/' + dd + '/' + yyyy;

dat.innerHTML = "<h4>" + todayDate + "</h4>"

btn.addEventListener("click", function(){
	
  // var diffDays = Math.round(Math.abs(  (today.getTime() - lastDay.getTime())/(oneDay) ));
  function isBigEnough(value){
  	return value > today.getDate();
  }

  if (today.getMonth() <= 2 ) {

  	var num = workingDays.march.filter(isBigEnough);
  	left.innerHTML = "<h4>" + (num.length + workingDays.april.length + workingDays.may.length + workingDays.june.length) + "</h4>";
  	after.innerHTML = "<h4>" + ((num.length + workingDays.april.length + workingDays.may.length + workingDays.june.length) - 15) + "</h4>";

   } else if (today.getMonth() <= 3) {
     var num1 = workingDays.april.filter(isBigEnough);
  	left.innerHTML = "<h4>" + (num1.length + workingDays.may.length + workingDays.june.length) + "</h4>";
  	after.innerHTML = "<h4>" + ((num1.length + workingDays.may.length + workingDays.june.length) - 15) + "</h4>";
  } else if (today.getMonth() <= 4) {
     var num2 = workingDays.may.filter(isBigEnough);
  	left.innerHTML = "<h4>" + (num2.length + workingDays.june.length) + "</h4>";
  	after.innerHTML = "<h4>" + ((num2.length + workingDays.june.length) - 15) + "</h4>";
  } else {
     var num3 = workingDays.june.filter(isBigEnough);
  	left.innerHTML = "<h4>" + (num3.length) + "</h4>";
  	after.innerHTML = "<h4>" + (num3.length - 15) + "</h4>";

};

 // left.innerHTML = "<h4>" +diffDays+ "</h4>";
});



