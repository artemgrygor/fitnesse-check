'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');
var _ = require('underscore');
var recursive = require('recursive-readdir');

function getFiles (dir, callback){

	function getFileContent(filePath, next){
		fs.readFile(filePath, 'utf-8', next);
	}

	function aggregate(next) {
		recursive(dir, ['*.!(xml)'], next);
	}

	function filter(aggregated, next) {

		var filtered = aggregated.filter(function (item) {
			return path.basename(item) ==='properties.xml';
		});

		async.map(filtered, getFileContent, function (er, data) {
			if(filtered.length !== data.length){
				throw new Error('some file content is missing');
			}

			var fileWithContent = [];
			_.each(filtered, function(filePath, idx){
				fileWithContent.push({
					path: filePath,
					content: data[idx]
				});
			});

        	next(er, fileWithContent);
      	});
	}

	function inspect(files, next){

		var filtered = _.filter(files, function(file){
			if(file.content.indexOf('<Test/>') > -1){
				return false;
			}
			return true;
		});
		next(null, filtered);
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