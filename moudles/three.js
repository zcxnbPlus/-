define(function(require,exports,moudle){

	var Observer = require("moudles/tools");
	
	var words = document.getElementById("words");

	var btn = document.getElementById("btn");

	btn.onclick = function(){

		var val = words.value;

		if(val){

		Observer.trigger("add1",val)
		}
		
	}
	
})
