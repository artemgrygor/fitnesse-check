'use strict';

var _ = require('underscore');
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
			if(paths.length !== data.length){
				throw new Error('some file content is missing');
			}

			var fileWithContent = [];
			_.each(paths, function(filePath, idx){
				fileWithContent.push({
					path: filePath,
					content: data[idx]
				});
			});

        	next(er, fileWithContent);
      	});
	}

	function inspect(paths, next){

		// var filtered = contents.filter(function (item) {
		// 	console.log(item);
		// 	return true;
		// });
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