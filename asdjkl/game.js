var asdjkl = {
	p_canvas: 0,
	p_ctx: 0,
	p_player: null,
	p_key: [],

	init: function(){

		//Initialise canvas
		this.p_canvas = document.getElementById("asdjkl-canvas");
		this.p_ctx = this.p_canvas.getContext("2d");

		this.p_key = [];
		//Initalise player
		this.p_player = Player.create();
		requestAnimationFrame(asdjkl.loop);
	},

	loop: function(){
		asdjkl.update();
		asdjkl.draw();
		requestAnimationFrame(asdjkl.loop);
	},

	update: function(){
		//Do the calculations
		this.p_player.update(this.p_key);
	},

	draw: function(){
		//Draw
		this.p_ctx.clearRect(0, 0, this.p_canvas.width, this.p_canvas.height);

		this.p_player.draw(this.p_canvas, this.p_ctx);

	},

	setKey: function(key, bool){
		this.p_key[key] = bool;
	}
};


document.onkeydown = document.onkeyup = function(e){
	var e = e || event;
	//key[e.keyCode] = e.type == 'keydown';

	asdjkl.setKey(e.keyCode, e.type == 'keydown');
}; 
