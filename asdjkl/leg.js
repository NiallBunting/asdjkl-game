var Leg = {

	p_parent: null,
	p_pos: 0,
	p_x: 0,
	p_y: 0,
	p_length: 100,
	p_angle: 0,

	create: function(parent, pos, x, y, length, angle){
		var obj = Object.create(this);
		obj.init(parent, pos, x, y, length, angle);
		return obj;
	},

	init: function(parent, pos, x, y, length, angle){
		this.p_parent = parent;
		this.p_pos = pos;
		this.p_x = x;
		this.p_y = y;
		this.p_length = length;
		this.p_angle = angle;
	},

	update: function(){
		if(this.p_pos < 1){
		this.p_angle = this.p_angle + ((Math.random() - 0.5) * 0.1);
		}
	},

	draw: function(canvas, ctx){
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(this.getX(), this.getY());
		ctx.lineTo(this.getEndX(), this.getEndY());
		ctx.strokeStyle = "red";
		ctx.stroke();
	},

	getX: function(){
		var parentLeg = this.p_parent;

		if(parentLeg != null){
			return this.p_parent.getEndX();
		}
		return this.p_x;

	},

	getY: function(){
		var parentLeg = this.p_parent;

		if(parentLeg != null){
			return this.p_parent.getEndY();
		}
		return this.p_y;
	},

	getEndX: function(){
		var parentLeg = this.p_parent;
		var angle = this.p_angle;
		while(parentLeg != null){
		      angle = angle + parentLeg.getAngle();
		      parentLeg = parentLeg.getParent();
		}

		return this.getX() + (Math.cos(angle) * this.p_length);
	},

	getEndY: function(){
		var parentLeg = this.p_parent;
		var angle = this.p_angle;
		while(parentLeg != null){
		      angle = angle + parentLeg.getAngle();
		      parentLeg = parentLeg.getParent();
		}

		return this.getY() + (Math.sin(angle) * this.p_length);
	},

	getAngle: function(){
		return this.p_angle;
	},

	getParent: function(){
		return this.p_parent;
	}
};
