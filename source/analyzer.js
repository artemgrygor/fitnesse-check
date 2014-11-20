'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');
var _ = require('underscore');
var recursive = require('recursive-readdir');

var config = require('./../config');
var testModel = require('./testModel');

function getFiles (callback){

	function getFileContent(filePath, next){
		fs.readFile(filePath, 'utf-8', next);
	}

	function aggregate(next) {
		if (!config) {
			throw new Error('config is missing');
		}

		if (!config.paths.at) {
			throw new Error('config.monitor section is missing');
		}

		recursive(config.paths.at, ['*.!(xml)'], next);
	}

	function filter(aggregated, next) {

		var filtered = aggregated.filter(function (item) {
			return path.basename(item) ==='properties.xml' &&
				item.indexOf('ErrorLogs') === -1;
		});

		async.mapLimit(filtered, 2000, getFileContent, function (er, data) {
			if(filtered.length !== data.length){
				console.log(er);
				var msg = 'Filtered: ' + filtered.length + ' but loaded: ' + data.length;
				console.log(msg);
				// throw new Error('some file content is missing');
				throw new Error(msg);
			}

			var tests = [];
			_.each(filtered, function(filePath, idx){
				tests.push(testModel.create(filePath, data[idx]));
			});

        	next(er, tests);
      	});

		// async.each(filtered, 
		// 	function(item, callback){
		// 		getFileContent(item, function(file){

		// 		});
		// 	},
		// 	function(err) {
		// 		callback(tests);
		// 	});


		// 	async.each(filtered, getFileContent, function (er, data) {
		// 		if(filtered.length !== data.length){

		// 			var msg = 'Filtered: ' + filtered.length + ' but loaded: ' + data.length;
		// 			console.log(msg);
		// 			// throw new Error('some file content is missing');
		// 			throw new Error(msg);
		// 		}

		// 		var tests = [];
		// 		_.each(filtered, function(filePath, idx){
		// 			tests.push(testModel.create(filePath, data[idx]));
		// 		});

	 //        	next(er, tests);
	 //      	});
	}

	function inspect(tests, next){

		var filtered = _.filter(tests, function(test){
			// if(_.contains(config.exclusions, test.name)){
			// 	return false;
			// }
			var exc = _.find(config.exclusions, function(name){
				return test.name.toLowerCase().indexOf(name) > -1;
			});
			if(!_.isUndefined(exc)){
				return false;
			}

			// all suites
			if(test.content.indexOf('<Suite/>') > -1){
				return false;
			}

			// turned on tests
			if(test.content.indexOf('<Test/>') > -1){
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