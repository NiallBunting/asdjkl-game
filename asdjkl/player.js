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
		this.p_hinge[0] = Hinge.create(200, 200);
		this.p_hinge[0].setKey(65);
		this.p_hinge[0].p_movedir = -1;
		var hinge1_1 = this.p_hinge[0].addChild(-7, 7, 50, 74);
		//var hinge1_1 = this.p_hinge[0].addChild(0.1, 1.9, 50, 74);
		var hinge1_2 = hinge1_1.addChild(-7, 7, 50, null);
		hinge1_2.addChild(4.5, 6, 15, null);

		this.p_hinge[1] = Hinge.create(200, 200);
		this.p_hinge[1].setKey(83);
		this.p_hinge[1].p_movedir = -1;
		var hinge2_1 = this.p_hinge[1].addChild(-7, 7, 50, 75);
		//var hinge2_1 = this.p_hinge[1].addChild(2.1, 3.9, 50, 75);
		var hinge2_2 = hinge2_1.addChild(-7, 7, 50, null);
		hinge2_2.addChild(4.5, 6, 15, null);

		this.p_hinge[2] = Hinge.create(200, 200);
		this.p_hinge[2].setKey(68);
		this.p_hinge[2].p_movedir = -1;
		var hinge3_1 = this.p_hinge[2].addChild(-7, 7, 50, 76);
		//var hinge3_1 = this.p_hinge[2].addChild(4.1, 5.9, 50, 76);
		var hinge3_2 = hinge3_1.addChild(-7, 7, 50, null);
		hinge3_2.addChild(4.5, 6, 15, null);
	},

	update: function(key){
		var avgY = (this.p_hinge[0].p_y + this.p_hinge[1].p_y +this.p_hinge[2].p_y) / 3.0;
		var avgX = (this.p_hinge[0].p_x + this.p_hinge[1].p_x +this.p_hinge[2].p_x) / 3.0;
		for(var i = 0; i < 3; i++){
//			this.p_hinge[i].p_x = avgX;
//			this.p_hinge[i].p_y = avgY;
		}
		for(var i = 0; i < 3; i++){
			this.p_hinge[i].update(key);
		}
	},

	draw: function(canvas, ctx){
		for(var i = 0; i < 3; i++){
			this.p_hinge[i].draw(canvas, ctx);
		}
	},

};
