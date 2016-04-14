var Player = {

	p_legs: null,
	p_x: 200,
	p_y: 200,

	create: function(){
		var obj = Object.create(this);
		obj.init();
		return obj;
	},

	init: function(){
		this.p_legs = [[0], [1], [2]];

		for(var i = 0; i < 3; i++){
			this.p_legs[i] = Leg.create(this, 50, i * 2);
			var thigh = this.p_legs[i].addChild(50, 0.4);
			var foot = thigh.addChild(10, 0.5);
		}
	},

	update: function(){
		this.p_y = this.p_y - 0.5;
		for(var i = 0; i < 3; i++){
			this.p_legs[i].update();
		}
	},

	draw: function(canvas, ctx){
		for(var i = 0; i < 3; i++){
			this.p_legs[i].draw(canvas, ctx);
		}
	},

	getEndX: function(){
		return this.p_x;
	},

	getEndY: function(){
		return this.p_y;
	},

	getAngle: function(){
		return 0;
	},

	getParent: function(){
		return null;
	},

	moveToContact: function(){
		return null;
	}
};
