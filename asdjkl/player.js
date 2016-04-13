var Player = {

	p_legs: null,
	p_x: 0,
	p_y: 0,

	create: function(){
		var obj = Object.create(this);
		obj.init();
		return obj;
	},

	init: function(){
		this.p_legs = [
				[[10], [11], [12]],
				[[20], [21], [22]],
				[[30], [31], [32]]
			];

		for(var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++){
				var parent = null;
				if(j > 0){
					parent = this.p_legs[i][j - 1];
				}
				var length = 50;
				if(j == 2){length = 10};
				this.p_legs[i][j] = Leg.create(parent, j, 200, 200, length, Math.random());
			}
		}
	},

	update: function(){
		for(var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++){
				this.p_legs[i][j].update();
			}
		}
	},

	draw: function(canvas, ctx){
		for(var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++){
				this.p_legs[i][j].draw(canvas, ctx);
			}
		}
	}
};
