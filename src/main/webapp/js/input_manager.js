InputManager = {
	UP_W: 87,
	DOWN_S: 83,
	LEFT_A: 65,
	RIGHT_D: 68, 

	PRESSED: 1,
	RELEASED: 0,
	
	_players: {
		1: {
			keys: {}
		},
		2: {
			keys: {}
		}
	},

	init: function() {

	},

	pressKey: function(key, player) {
		this._players[player].keys[key] = this.PRESSED;
	},

	releaseKey: function(key, player) {
		this._players[player].keys[key] = this.RELEASED;
	},

	getKeyState: function(key, player) {
		if(key in this._players[player].keys) {
			return this._players[player].keys[key];
		} else {
			return this.RELEASED;
		}
	}
};