'use strict';

var analyzer = require('./source/analyzer');
var svnAnalyzer = require('./source/svnAnalyzer');
var builder = require('./source/htmlBuilder');

var async = require('async');

function reviewer() {

	return {
		start: function () {

			console.log('_________________________________________');
			console.log('Start');
			
			function aggregate(next) {
				analyzer.getFiles(next);
			}

			function inspect(tests, next) {
				svnAnalyzer.review(tests, function(tests){
					next(null, tests);
				});
			}

			function buildReport(tests, next) {
				builder.generate(tests, function(){
					next(null, null);
				});
			}

			async.waterfall([
				aggregate,
				inspect,
				buildReport
			], function(){
				console.log('End');
				console.log('_________________________________________');
			});
		}
	};
}

reviewer().start();