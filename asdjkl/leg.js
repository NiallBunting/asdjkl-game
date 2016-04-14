var Leg = {

	p_parent: null,
	p_child: null,
	p_pos: 0,
	p_x: 0,
	p_y: 0,
	p_length: 100,
	p_angle: 0,

	create: function(parent, length, angle){
		var obj = Object.create(this);
		obj.init(parent, length, angle);
		return obj;
	},

	init: function(parent, length, angle){
		this.p_parent = parent;
		this.p_x = parent.getEndX();
		this.p_y = parent.getEndY();
		this.p_length = length;
		this.p_angle = angle;
		this.p_pos = 0;
	},

	addChild: function(length, angle){
		var parent = this;
		var pos = this.p_pos + 1;
		this.p_child = Leg.create(parent, length, angle);
		this.p_child.setPos();
		return this.p_child;
	},

	update: function(){
		if(!this.checkContact()){
			this.updateX();
			this.updateY();
		}
		if(this.p_child != null){
			this.p_child.update();
		}
	},

	checkContact: function(){
		if(this.p_y < 5 || this.getEndY() < 5){
			//NEED TO DO SOMETHING HERE THAT
			//CAUSES THE REST OF THE LEG TO PHYSIC
			if(this.p_child != null){this.p_child.moveToContact(false);}
			if(this.p_parent != null){this.p_parent.moveToContact(true);}
			return true;
		}
		else {return false;}
	},

	moveToContact: function(parentBool){
		if(parentBool){
			//parent of thing
			this.p_angle = Math.atan2(this.p_child.p_x, this.p_child.p_y);
			if(this.p_parent != null){this.p_parent.moveToContact(true);}
		}else{
			//child of thing
			
		}
	},

	draw: function(canvas, ctx){
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(this.p_x, this.p_y);
		ctx.lineTo(this.getEndX(), this.getEndY());
		ctx.strokeStyle = "red";
		ctx.stroke();
		if(this.p_child != null){
			this.p_child.draw(canvas, ctx);
		}
	},

	updateX: function(){
		return this.p_x = this.p_parent.getEndX();

	},

	updateY: function(){
		return this.p_y = this.p_parent.getEndY();
	},

	parentAngle: function(){
		var parentLeg = this.p_parent;
		var angle = 0.0;
		while(parentLeg != null){
		      angle = angle + parentLeg.getAngle();
		      parentLeg = parentLeg.getParent();
		}
		return angle;
	},

	getEndX: function(){
		return this.p_x + (Math.cos(this.parentAngle() + this.p_angle) * this.p_length);
	},

	getEndY: function(){
		return this.p_y + (Math.sin(this.parentAngle() + this.p_angle) * this.p_length);
	},

	getAngle: function(){
		return this.p_angle;
	},

	getParent: function(){
		return this.p_parent;
	},

	getPos: function(){
		return this.p_pos;
	},

	setPos: function(){
		this.p_pos = this.p_parent.getPos() + 1;
	}
};
