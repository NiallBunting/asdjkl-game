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
		this.checkFloorCollision();
		if(this.p_child != null){
			var relativeX = this.p_child.getX() - this.p_x;
			var relativeY = this.p_child.getY() - this.p_y;
			var childAngle = Math.round(Math.atan2(relativeY, relativeX) * 100)/100;
			if (childAngle < 0){ childAngle += 2 * Math.PI; }

			if(childAngle < this.p_angleMin){
				childAngle = this.p_angleMin;
			}

			if(childAngle > this.p_angleMax){
				childAngle = this.p_angleMax;
			}

			var childX = this.getEndX(childAngle, this.p_length);
			var childY = this.getEndY(childAngle, this.p_length);
			this.p_child.p_x = childX;
			this.p_child.p_y = childY;

			this.p_child.update();

			var relativeX =  this.p_x - this.p_child.getX();
			var relativeY =  this.p_y - this.p_child.getY();
			var Angle = Math.round(Math.atan2(relativeY, relativeX) * 100)/100;
			if (Angle < 0){ Angle += 2 * Math.PI; }
			
			var dist = Math.sqrt(Math.pow((this.p_x - this.p_child.p_x), 2) + Math.pow((this.p_y - this.p_child.p_y), 2));

			if(this.p_length - 1 > dist || this.p_length + 1 < dist){
				this.p_x = this.p_child.getX() + (Math.cos(Angle) * this.p_length);
				this.p_y = this.p_child.getY() + (Math.sin(Angle) * this.p_length);
			}

			this.checkFloorCollision();

		}
		else{
			this.p_y += 1.5;
			if(this.p_y < 0 || this.p_y > 400){this.p_y = Math.random() * 400};
			if(this.p_x < 0 || this.p_x > 400){this.p_x = Math.random() * 400};
		}
	},

	checkFloorCollision: function(){
		if(this.p_y > 395){
			this.p_y = 395;
			return true;
		}
		return false;
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

		//	ctx.rect(this.p_x - 10,this.p_y - 10,20,20);
		//	ctx.stroke();

			this.p_child.draw(canvas, ctx);
		}else{
		//	ctx.fillStyle = "blue";
		//	ctx.rect(this.p_x - 5,this.p_y - 5,10,10);
		//	ctx.fill();
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
