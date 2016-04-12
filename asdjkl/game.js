var asdjkl = {
	p_canvas: 0,
	p_ctx: 0,
	p_player: null,

	init: function(){

		//Initialise canvas
		this.p_canvas = document.getElementById("asdjkl-canvas");
		this.p_ctx = this.p_canvas.getContext("2d");

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
		this.p_player.update();
	},

	draw: function(){
		//Draw
		this.p_ctx.clearRect(0, 0, this.p_canvas.width, this.p_canvas.height);

		this.p_player.draw();

		//this.p_ctx.fillStyle = '#900';
		//this.p_ctx.beginPath();
		//this.p_ctx.moveTo(0, 100);
		//this.p_ctx.lineTo(50, this.p_test);
		//this.p_ctx.lineTo(100, 50);
		//this.p_ctx.closePath();
		//this.p_ctx.fill();
	}
};
