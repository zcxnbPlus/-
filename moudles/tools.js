define(function(requrie,exports,module){

	var Observer = (function(){

		var ob = {

		}

		return {

			on:function(type,fn){
				ob[type] = fn;

			},

			trigger:function(type,val){

				ob[type](val);
			}
		}
	})()

	module.exports = Observer;
})