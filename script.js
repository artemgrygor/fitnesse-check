'use strict';

var analyzer = require('./source/analyzer');
var svnAnalyzer = require('./source/svnAnalyzer');
var builder = require('./source/htmlBuilder');

function reviewer() {
	

	return {
		start: function () {
			console.log('Start');

			analyzer.getFiles(function(er, tests){
				console.log('_________________________________________');
				console.log('\nTotal: ' + tests.length);
				console.log('_________________________________________');
				svnAnalyzer.review(tests);
				builder.generate(tests);
			});
		}
	};
}

reviewer().start();