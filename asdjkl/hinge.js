var Hinge = {
	p_x: 0,
	p_y: 0,
	p_child: null,
	p_angleMin: 0,
	p_angleMax: 0,
	p_length: 0,
	p_key: null,
	p_mx: 0,
	p_my: 0,
	p_movedir: 1,

	create: function(x, y){
		var obj = Object.create(this);
		obj.init(x, y);
		return obj;
	},

	init: function(x, y){
		this.p_x = x;
		this.p_y = y;
	},

	update: function(key){
		this.checkFloorCollision();
		this.applyMomentum();
		if(this.p_child != null){
			//Calculate the angle of the child
			var relativeX = this.p_child.getX() - this.p_x;
			var relativeY = this.p_child.getY() - this.p_y;
			var childAngle = Math.round(Math.atan2(relativeY, relativeX) * 100)/100;
			childAngle = this.moveChild(key, childAngle);
			//Normalise
			if (childAngle < 0){ childAngle += 2 * Math.PI; }
			//Check if in the bounds
			if(childAngle < this.p_angleMin){
				childAngle = this.p_angleMin;
			}

			if(childAngle > this.p_angleMax){
				childAngle = this.p_angleMax;
			}

			// Calculate the position of the child
			var childX = this.getEndX(childAngle, this.p_length);
			var childY = this.getEndY(childAngle, this.p_length);

			this.p_child.p_x = childX;
			this.p_child.p_y = childY;

			// Update child
			this.p_child.update(key);

			// Get child distance	
			var dist = Math.sqrt(Math.pow((this.p_x - this.p_child.p_x), 2) + Math.pow((this.p_y - this.p_child.p_y), 2));

			if(this.p_length - 1 > dist || this.p_length + 1 < dist){

				// Get childs angle from parent
				var relativeX =  this.p_x - this.p_child.getX();
				var relativeY =  this.p_y - this.p_child.getY();
				var Angle = Math.round(Math.atan2(relativeY, relativeX) * 100)/100;
				if (Angle < 0){ Angle += 2 * Math.PI; }

				// If more than 1 off set parents position again
				this.p_x = this.p_child.getX() + (Math.cos(Angle) * this.p_length);
				this.p_y = this.p_child.getY() + (Math.sin(Angle) * this.p_length);
			}

			this.checkFloorCollision();

		}
		else{
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

	addChild: function(angleMin, angleMax, length, moveKey){
		if(this.p_child == null){
			var angleAvg = (angleMin + angleMax) / 2.0;
			var child = Hinge.create(this.getEndX(angleAvg, length), this.getEndY(angleAvg, length));
			child.setKey(moveKey);
			this.p_child = child;
			this.p_angleMin = angleMin;
			this.p_angleMax = angleMax;
			this.p_length = length;
			return child;
		}
		return null;
	},

	setKey: function(key){
		if(key != null){this.p_key = key;}
	},

	moveChild: function(key, angle){
		if(key != null && key[this.p_key]){
			angle += 0.1 * this.p_movedir;
		}else{
			angle -= 0.01 * this.p_movedir;
		}
		return angle;
	},

	applyMomentum: function(){
		// add gravity
		this.p_my += 0.01;

		//y
		var grav = Math.pow(this.p_my, 2) / 10;
		grav = grav > 1 ? 1 : grav;

		//x

		//add
		this.p_y += grav;
		//this.p_x += grav;
	}
}
