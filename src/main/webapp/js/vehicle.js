var Vehicle = function() {
	this.pos = {
		x: 0,
		y: 0
	};
	this.size = {
		w: 75,
		h: 25
	};
	this.velocity = {
		x: 0,
		y: 0
	};
	this.maxSpeed = 15;
	this.minSpeed = -6;
	this.heading = Math.PI;
	this.image = null;
	this.direction = 0;
	this.turn = 0;
	this.acceleration = 0.5;
	this.speed = 0;
	this.gas = false;
	this.reverse = false;
	this.player = 1;
	this.moving = false;

	this.init = function(pos, size, velocity, image, minSpeed, maxSpeed, heading, acceleration, player) {
		this.pos = pos;
		this.size = size;
		this.velocity = velocity;
		this.image = image;
		this.minSpeed = minSpeed;
		this.maxSpeed = maxSpeed;
		this.heading = heading;
		this.acceleration = acceleration;
		this.player = player;
	};

	this.updateState = function(inputMgr) {
		if(inputMgr.getKeyState(InputManager.UP_W, this.player) == InputManager.PRESSED ||
			inputMgr.getKeyState(InputManager.DOWN_S, this.player) == InputManager.PRESSED) {
			this.moving = true;
			this.direction = (inputMgr.getKeyState(InputManager.UP_W, this.player) == InputManager.PRESSED) ? 1 : -1;
		} else {
			this.moving = false;
		}

		if(inputMgr.getKeyState(InputManager.LEFT_A, this.player) == InputManager.PRESSED ||
			inputMgr.getKeyState(InputManager.RIGHT_D, this.player) == InputManager.PRESSED) {
			this.turn = (inputMgr.getKeyState(InputManager.RIGHT_D, this.player) == InputManager.PRESSED) ? 1 : -1;
		} else {
			this.turn = 0;
		}

		var turnAmount = Math.PI/34 * this.turn;
		this.heading = (this.heading + turnAmount).mod(2 * Math.PI);

		this.velocity.x = Math.cos(this.heading);
		this.velocity.y = Math.sin(this.heading);
	};

	this.move = function() {
		var targetSpeed = 0;
		var factor = 1;
		if(this.moving && this.direction == -1) {
			targetSpeed = this.minSpeed;
		} else if(this.moving && this.direction == 1) {
			targetSpeed = this.maxSpeed;
		}

		if(this.speed == targetSpeed) {
			return;
		}

		if((this.speed > 0 && targetSpeed < 0) ||
			(this.speed < 0 && targetSpeed > 0)) {
			factor = 2.5;
		}

		if(this.speed > targetSpeed) {
			this.speed -= this.acceleration * factor;
		} else if(this.speed < targetSpeed) {
			this.speed += this.acceleration * factor;
		}
	}; 

	this.draw = function(ctx) {
		var movement = (20 * this.speed) / 30;
		this.pos.x += this.velocity.x * movement;
		this.pos.y += this.velocity.y * movement;
	 
		// save the current co-ordinate system 
		// before we screw with it
		ctx.save(); 
	 
		// move to the middle of where we want to draw our image
		ctx.translate(this.pos.x, this.pos.y);
	 
		// rotate around that point, converting our 
		// angle from degrees to radians 
		ctx.rotate(this.heading);
	 
		// draw it up and to the left by half the width
		// and height of the image 
		ctx.drawImage(this.image, -(this.image.width/2), -(this.image.height/2), this.image.width, this.image.height);
	 
		// and restore the co-ords to how they were when we began
		ctx.restore(); 
	};

	this.update = function(inputMgr) {
		this.updateState(inputMgr);
		this.move();
	};
};