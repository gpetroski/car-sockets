GameEngine = {
	_entities: [],
	_inputMgr: null,

	init: function(inputMgr, entity) {
		this._inputMgr = inputMgr;
		this._entities = [entity];
	},

	update: function() {
		for (var i = this._entities.length - 1; i >= 0; i--) {
			this._entities[i].update(this._inputMgr);
		}
	},

	addEntity: function(entity) {
		this._entities.push(entity);
	}
};