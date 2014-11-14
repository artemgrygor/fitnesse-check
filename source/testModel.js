'use strict';

var path = require('path');
var config = require('./../config');

function getTestName(filePath){
	return path.dirname(filePath).split(path.sep).pop();
}

function getLocalFitness(filePath){
	var testDir = path.dirname(filePath);
	var subUrl = testDir.substring(testDir.indexOf('FitNesseRoot') + 12, testDir.length);
	
	var fitNesse = path.join(config.fitNesseRoot, subUrl.replace(path.sep, '.'));
	return fitNesse;
}

function create(filePath, content){
	return {
		name: getTestName(filePath),
		path: filePath,
		content: content,
		localFitness: getLocalFitness(filePath)
	};
}

module.exports = {
	create: create
};