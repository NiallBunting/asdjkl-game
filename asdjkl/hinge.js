var Hinge = {
	p_x: 0,
	p_y: 0,
	p_child: null,
	p_angleMin: 0,
	p_angleMax: 0,
	p_length: 0,

	create: function(x, y){
		var obj = Object.create(this);
		obj.init(x, y);
		return obj;
	},

	init: function(x, y){
		this.p_x = x;
		this.p_y = y;
	},

	update: function(){
		var childAngle = Math.atan2(this.p_child.getX(), this.p_child.getY());
		if(childAngle < this.p_angleMin){
			childAngle = this.p_angleMin;
		}

		if(childAngle > this.p_angleMax){
			childAngle = this.p_angleMax;
		}

		this.p_child.p_x = this.getEndX(childAngle, this.p_length);
		this.p_child.p_y = this.getEndY(childAngle, this.p_length);
	},

	draw: function(canvas, ctx){
		// The line gets drawn from one to two
		if(this.p_child != null){
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(this.p_x, this.p_y);
			ctx.lineTo(this.p_child.getX(), this.p_child.getY());
			ctx.strokeStyle = "red";
			ctx.stroke();

			this.p_child.draw(canvas, ctx);
		}
	},

	getX: function(){
		return this.p_x;
	},

	getY: function(){
		return this.p_y;
	},

	getEndX: function(angle, length){
			return this.p_x + (Math.cos(angle) * length);
	},

	getEndY: function(angle, length){
			return this.p_y + (Math.sin(angle) * length);
	},

	addChild: function(angleMin, angleMax, length){
		if(this.p_child == null){
			var angleAvg = (angleMin + angleMax) / 2.0;
			var child = Hinge.create(this.getEndX(angleAvg, length), this.getEndY(angleAvg, length));
			this.p_child = child;
			this.p_angleMin = angleMin;
			this.p_angleMax = angleMax;
			this.p_length = length;
			return child;
		}
		return null;
	}
}
