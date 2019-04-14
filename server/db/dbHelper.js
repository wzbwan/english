models = require('./models');

module.exports = {
	getModel: function(type){
		// return db.model(type,models.type);
		return models[type];
	}
}

