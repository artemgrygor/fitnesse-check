'use strict';

var analyzer = require('./source/analyzer');
var svnAnalyzer = require('./source/svnAnalyzer');
var builder = require('./source/htmlBuilder');

function reviewer() {
	

	return {
		start: function () {
			console.log('Start');

			analyzer.getFiles(function(er, files){
				console.log('_________________________________________');
				// console.log('Files: \n');
				// console.log(files);
				console.log('\nTotal: ' + files.length);
				console.log('_________________________________________');
				svnAnalyzer.review();
				builder.generate(files);
			});
		}
	};
}

reviewer().start();