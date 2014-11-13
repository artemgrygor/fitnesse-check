'use strict';

// var _ = require('underscore');
var analyzer = require('./analyzer');

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
			analyzer.getFiles(config.paths.at);
		}
	};
}

module.exports = reviewer;