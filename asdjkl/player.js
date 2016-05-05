var Player = {

	p_hinge: [],
	p_x: 200,
	p_y: 200,

	create: function(){
		var obj = Object.create(this);
		obj.init();
		return obj;
	},

	init: function(){
		this.p_hinge = [];


		for(var i = 0; i < 3; i++){
			this.p_hinge[i] = Hinge.create(200, 200);
			//last number is key
			var hinge2_1 = this.p_hinge[i].addChild(-7 + (3*i), 7 + (3 * i), 50, 75+i);
			var hinge2_2 = hinge2_1.addChild(-7, 7, 50, null);
			hinge2_2.addChild(4.5, 6, 15, null);
		}
		this.p_hinge[0].setKey(65);
		this.p_hinge[1].setKey(83);
		this.p_hinge[2].setKey(68);
	},

	update: function(key){
		var avgY = (this.p_hinge[0].p_y + this.p_hinge[1].p_y +this.p_hinge[2].p_y) / 3.0;
		var avgX = (this.p_hinge[0].p_x + this.p_hinge[1].p_x +this.p_hinge[2].p_x) / 3.0;
		for(var i = 0; i < 3; i++){
//			this.p_hinge[i].p_x = avgX;
//			this.p_hinge[i].p_y = avgY;
			this.p_hinge[i].p_my -= 0.1;
		}
		for(var i = 0; i < 3; i++){
			this.p_hinge[i].update(key, 0, 0);
		}
	},

	draw: function(canvas, ctx){
		for(var i = 0; i < 3; i++){
			this.p_hinge[i].draw(canvas, ctx);
		}
	},

};
