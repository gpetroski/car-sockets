$(function () {
    "use strict";
    
    var content = $('#content');
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
    	
    };

    request.onMessage = function (response) {

    };

    request.onClose = function(response) {
        logged = false;
    };

    request.onError = function(response) {
        content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
            + 'socket or the server is down' }));
    };

    var subSocket = socket.subscribe(request);
	var keyDownEl = document.getElementById("keycode");
	var downEl = document.getElementById("down");
	var accelY = document.getElementById("accelerationY");
	var accelZ = document.getElementById("accelerationZ");
	var accelX = document.getElementById("accelerationX");
	var baseXEl = document.getElementById("basex");
	var baseX = null;
	var sendMessage = false;
    
	setTimeout(function() { sendMessage = true; }, 2000);
	
    var keyAction = function(key, down) {
    	if(sendMessage) {
	    	keyDownEl.innerHTML = key;
	    	downEl.innerHTML = down;
	 	    subSocket.push(jQuery.stringifyJSON({ keyCode: key, keyDown: down, player: 2 }));
    	}
    };

    var left = document.getElementById('left');
    left.addEventListener('touchstart', function(event) {
    	keyAction(65, true);
    }, false);
    left.addEventListener('touchend', function(event) {
    	keyAction(65, false);
    }, false);
    left.addEventListener('mousedown', function(event) {
    	keyAction(65, true);
    }, false);
    left.addEventListener('mouseup', function(event) {
    	keyAction(65, false);
    }, false);    

    var right = document.getElementById('right');
    right.addEventListener('touchstart', function(event) {
    	keyAction(68, true);
    }, false);
    right.addEventListener('touchend', function(event) {
    	keyAction(68, false);
    }, false);
    right.addEventListener('mousedown', function(event) {
    	keyAction(68, true);
    }, false);
    right.addEventListener('mouseup', function(event) {
    	keyAction(68, false);
    }, false);
    
    var forward = document.getElementById('forward');
    forward.addEventListener('touchstart', function(event) {
    	keyAction(87, true);
    }, false);
    forward.addEventListener('touchend', function(event) {
    	keyAction(87, false);
    }, false);
    forward.addEventListener('mousedown', function(event) {
    	keyAction(87, true);
    }, false);
    forward.addEventListener('mouseup', function(event) {
    	keyAction(87, false);
    }, false);
    
    var reverse = document.getElementById('reverse');
    reverse.addEventListener('touchstart', function(event) {
    	keyAction(83, true);
    }, false);
    reverse.addEventListener('touchend', function(event) {
    	keyAction(83, false);
    }, false);
    reverse.addEventListener('mousedown', function(event) {
    	keyAction(83, true);
    }, false);
    reverse.addEventListener('mouseup', function(event) {
    	keyAction(83, false);
    }, false);
    
    
    document.onkeydown = function(e) {
    	keyAction(e.keyCode, true);
    };
    
    document.onkeyup = function(e) {
    	keyAction(e.keyCode, false);
    };

    if (window.DeviceOrientationEvent != undefined) {
    	window.ondeviceorientation = function(e) {
    		accelY.innerHTML = e.gamma;
    		accelZ.innerHTML = e.alpha;
    		accelX.innerHTML = e.beta;
    		if(baseX != null) {
	    		if(baseX - e.beta < -20) {
	    	    	keyAction(68, true);
	    		} else {
	    	    	keyAction(68, false);
	    		}
	    		if(baseX - e.beta > 20) {
	    	    	keyAction(65, true);
	    		} else {
	    	    	keyAction(65, false);
	    		}	    			
    		} else {
    			baseXEl.innerHTML = e.beta;
    			baseX = e.beta;
    		}
    	};
    };
    
});

