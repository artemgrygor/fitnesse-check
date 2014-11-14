'use strict';

var config = require('./config');
var analyzer = require('./source/analyzer');

function reviewer(config) {
	if (!config) {
		throw new Error('config is missing');
	}

	if (!config.paths.at) {
		throw new Error('config.monitor section is missing');
	}

	return {
		start: function () {
			console.log('Start');

			analyzer.getFiles(config.paths.at, function(er, files){
				console.log('_________________________________________');
				console.log('Files: \n');
				console.log(files);
				console.log('\nTotal: ' + files.length);
				console.log('_________________________________________');
			});
		}
	};
}

reviewer(config).start();