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

	create: function(x, y){
		var obj = Object.create(this);
		obj.init(x, y);
		return obj;
	},

	init: function(x, y){
		this.p_x = x;
		this.p_y = y;
	},

	update: function(key, mx, my){
		//add -y direction gravity
		this.addGravity();
		//add momentum from above
		this.p_mx += mx;
		this.p_my += my;
		//checkifkeyispressed
		//if yes create momentum on that angle
		if(this.hasChild()){
			this.constrainLength(this, this.p_child, this.p_length);
		}
		//update child
		if(this.hasChild()){
			var returnMo = this.p_child.update(key, 0, 0);
		}
		//calculate any other momentum
		//add momentum to x + y
		//friction
		this.p_mx *= 0.99;
		this.p_my *= 0.99;
		this.p_x += this.p_mx;
		this.p_y += this.p_my;
		//check if can move there
		var retMomX = 0;
		var retMomY = 0;
		return {"x":retMomX, "y":retMomY};
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

			ctx.rect(this.p_x - 10,this.p_y - 10,8,8);
			ctx.stroke();

			this.p_child.draw(canvas, ctx);
		}else{
			ctx.fillStyle = "blue";
			ctx.rect(this.p_x - 5,this.p_y - 5,10,10);
			ctx.fill();
		}
	},

	getX: function(){
		return this.p_x;
	},

	getY: function(){
		return this.p_y;
	},

	getEndX: function(pos, angle, length){
		return pos + (Math.cos(angle) * length);
	},

	getEndY: function(pos, angle, length){
		return pos + (Math.sin(angle) * length);
	},

	hasChild: function(){
		return (this.p_child != null);
	},

	addChild: function(angleMin, angleMax, length, moveKey){
		if(!this.hasChild()){
			var angleAvg = (angleMin + angleMax) / 2.0;
			var child = Hinge.create(this.getEndX(this.p_x, angleAvg, length), this.getEndY(this.p_y, angleAvg, length));
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

	addGravity: function(){
		this.p_my += 0.1;
		//this.p_my -= 0.1;
	},

	constrainLength: function(a, b, len){

		var calLength = Math.sqrt(Math.pow(a.getX() - b.getX(), 2) + Math.pow(a.getY() - b.getY(), 2));

		if(calLength == 0){calLength = 1;}

		var difference = len / calLength;

		var xLen = a.getX() - b.getX();
		var xNew = (xLen * difference) - xLen;

		var yLen = a.getY() - b.getY();
		var yNew = (yLen * difference) - yLen;

		this.p_child.p_mx -= xNew;
		this.p_child.p_my -= yNew;
	}
}
