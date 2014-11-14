'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');

function getFiles (dir, callback){

	function getFileContent(filePath, next){
		fs.readFile(filePath, 'utf-8', next);
	}

	function aggregate(next) {
		fs.readdir(dir, next);
	}

	function filter(aggregated, next) {

		var filtered = aggregated.filter(function (item) {
			return item ==='properties.xml';
		});
		var paths = filtered.map(function (file) { return path.join(dir, file); });

		async.map(paths, getFileContent, function (er, data) {
			console.log(data);
			//var fileWithContent = filtered.map(function (file) { return path.join(dir, file); });

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