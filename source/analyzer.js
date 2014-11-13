'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');

function getFiles (dir, callback){

	function aggregate(next) {
		fs.readdir(dir, next);
	}

	function filter(aggregated, next) {

		var filtered = aggregated.filter(function (item) {
			return item ==='properties.xml';
		});
		var paths = filtered.map(function (file) { return path.join(dir, file); });

		async.map(paths, fs.readFile, function (er, data) {
        	next(er, paths, data);
      	});
	}

	function inspect(paths, contents, next){

		var filtered = contents.filter(function (item) {
			console.log(item);
			return true;
		});
		next(null, paths);
	}

	async.waterfall([
		aggregate,
		filter,
		inspect
	], callback);
}

module.exports = {
	getFiles: getFiles
};