var Player = {

	p_hinge1: null,
	p_hinge3: null,
	p_hinge3: null,
	p_x: 200,
	p_y: 200,

	create: function(){
		var obj = Object.create(this);
		obj.init();
		return obj;
	},

	init: function(){
		this.p_hinge1 = Hinge.create(200, 200);
		var hinge1_1 = this.p_hinge1.addChild(0.1, 1.9, 50);
		var hinge1_2 = hinge1_1.addChild(-7, 7, 50);
		hinge1_2.addChild(-7, 7, 15);

		this.p_hinge2 = Hinge.create(200, 200);
		var hinge2_1 = this.p_hinge2.addChild(2.1, 3.9, 50);
		var hinge2_2 = hinge2_1.addChild(-7, 7, 50);
		hinge2_2.addChild(-7, 7, 15);

		this.p_hinge3 = Hinge.create(200, 200);
		var hinge3_1 = this.p_hinge3.addChild(4.1, 5.9, 50);
		var hinge3_2 = hinge3_1.addChild(-7, 7, 50);
		hinge3_2.addChild(-7, 7, 15);
	},

	update: function(){
		var avgY = (this.p_hinge1.p_y + this.p_hinge2.p_y +this.p_hinge3.p_y) / 3.0;
		var avgX = (this.p_hinge1.p_x + this.p_hinge2.p_x +this.p_hinge3.p_x) / 3.0;
		this.p_hinge1.p_x = avgX;
		this.p_hinge2.p_x = avgX;
		this.p_hinge3.p_x = avgX;
		this.p_hinge1.p_y = avgY;
		this.p_hinge2.p_y = avgY;
		this.p_hinge3.p_y = avgY;
		this.p_hinge1.update();
		this.p_hinge2.update();
		this.p_hinge3.update();
	},

	draw: function(canvas, ctx){
		this.p_hinge1.draw(canvas, ctx);
		this.p_hinge2.draw(canvas, ctx);
		this.p_hinge3.draw(canvas, ctx);
	},

};
