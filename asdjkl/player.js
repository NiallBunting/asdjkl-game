var Player = {

	p_hinge: null,
	p_x: 200,
	p_y: 200,

	create: function(){
		var obj = Object.create(this);
		obj.init();
		return obj;
	},

	init: function(){
		this.p_hinge = Hinge.create(200, 200);
		var ask = this.p_hinge.addChild(4, 5, 100);
		ask.addChild(2, 3, 50);
	},

	update: function(){
		this.p_hinge.update();
	},

	draw: function(canvas, ctx){
		this.p_hinge.draw(canvas, ctx);
	},

};
