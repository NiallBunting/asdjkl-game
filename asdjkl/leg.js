var Leg = {

	p_parent: null,
	p_x: 0,
	p_y: 0,
	p_length: 100,
	p_angle: 0,

	create: function(parent, x, y, length, angle){
		var obj = Object.create(this);
		obj.init(parent);
		return obj;
	},

	init: function(parent, x, y, length, angle){
		this.p_parent = parent;
		this.p_x = x;
		this.p_y = y;
		this.p_length = length;
		this.p_angle = angle;
	},

	update: function(){

	},

	draw: function(){

	}
};
