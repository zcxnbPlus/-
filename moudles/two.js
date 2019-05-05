define(function(require,exports,moudle){

	var Observer = require("moudles/tools");

	var ul = document.getElementById("list");

	// var lis = document.getElementsByTagName("li");

	// var spans = document.getElementsByTagName("span");


	Observer.on("add1",function(val){
		
		var li = document.createElement("li");

		var textNode = document.createTextNode(val);

		var span = document.createElement("span");

		span.innerHTML = "&times;";

		li.appendChild(span);

		li.appendChild(textNode);

		ul.appendChild(li);

		span.onclick = function(){

			ul.removeChild(this.parentNode);
		}


		


	})
	
})