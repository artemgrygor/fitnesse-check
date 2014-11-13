'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');

function getFiles (dir, callback){

	function aggregate(next) {
		fs.readdir(dir, next);
	}

	function filter(aggregated, callback) {

		var filtered = aggregated.filter(function (item) {
			return item ==='properties.xml';
		});
		var paths = filtered.map(function (file) { return path.join(dir, file); });

		callback(paths);
	}

	async.waterfall([
		aggregate,
		filter
	], callback);
}

module.exports = {
	getFiles: getFiles
};