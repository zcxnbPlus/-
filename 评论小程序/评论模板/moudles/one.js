define(function(require,exports,moudle){

	var Observer = require("moudles/tools");
	var num = document.getElementById("num");

	Observer.on("add",function(){

		// console.log(111)
		num.innerHTML++;
	})

})