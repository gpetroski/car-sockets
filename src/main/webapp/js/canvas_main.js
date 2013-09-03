$(function () {
    "use strict";
    
    var socket = $.atmosphere;

    var apiUrl = "/rest/carControl/1234";
	if(location.hostname == "localhost") {
		apiUrl = "/car-sockets" + apiUrl;   
	}
    
    // We are now ready to cut the request
    var request = { url: apiUrl,
        contentType : "application/json",
        transport : 'websocket'};

    request.onOpen = function(response) {
        console.log('Atmosphere connected using ' + response.transport);
    };

    request.onMessage = function (response) {
        var message = response.responseBody;
        try {
            var json = JSON.parse(message);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message);
            return;
        }
        
        //console.log(json);
        if(json.keyDown == "true") {
    		inputMgr.pressKey(json.keyCode, json.player);
        } else {
    		inputMgr.releaseKey(json.keyCode, json.player);
    	}
    };
    socket.subscribe(request);

    request.onClose = function(response) {
        logged = false;
    };

    request.onError = function(response) {
        content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
            + 'socket or the server is down' }));
    };

    Number.prototype.mod = function(n) {
		return ((this%n)+n)%n;
	};

	var body = document.getElementById("body");
	var milliseconds = 1000;
	var frameRate = 30;
	var tickRate = 20;
	var canvas = document.createElement("canvas");
	canvas.id = "gameCanvas";
	canvas.width = document.body.offsetWidth;
	canvas.height = document.body.offsetHeight;
	body.appendChild(canvas);

	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = 300;

	var ctx = canvas.getContext('2d');

	var carImg = new Image();
	carImg.src = "./images/red.png";
	carImg.width = 60;
	carImg.height = 45;
	var carImg2 = new Image();
	carImg2.src = "./images/blue.png";
	carImg2.width = 60;
	carImg2.height = 45;
	var pos = {
		x: centerX,
		y: centerY - 135
	};
	var pos2 = {
		x: centerX,
		y: centerY - 180
	};
	var size = {
		w: 75,
		h: 25
	};
	var velocity = {
		x: 0,
		y: 0
	};
	var velocity2 = {
			x: 0,
			y: 0
		};

	var vehicle = new Vehicle();
	vehicle.init(pos, size, velocity, carImg, -6, 15, Math.PI, 0.5, 1);
	var vehicle2 = new Vehicle();
	vehicle2.init(pos2, size, velocity2, carImg2, -6, 15, Math.PI, 0.5, 2);

	var inputMgr = InputManager;

	var gameEngine = GameEngine;
	gameEngine.init(inputMgr, vehicle);
	gameEngine.addEntity(vehicle2);

	var animate = function() {
		ctx.fillRect(0,0,canvas.width, canvas.height);
		ctx.fillStyle = 'green';
		ctx.stroke();

		ctx.save();
		ctx.translate(-canvas.width / 2, 100);
		ctx.scale(2,0.75);
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'grey';
		ctx.fill();
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#003300';
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius/2, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#003300';
		ctx.stroke();
		ctx.restore();
		vehicle.draw(ctx);
		vehicle2.draw(ctx);
	};

	var update = function() {
		gameEngine.update();
	};
	setInterval(animate, milliseconds / frameRate);
	setInterval(update, milliseconds/ tickRate);

	document.onkeydown = function(event) {
		inputMgr.pressKey(event.keyCode, 1);
	};
	
	document.onkeyup = function(event) {
		inputMgr.releaseKey(event.keyCode, 1);
	};
});
