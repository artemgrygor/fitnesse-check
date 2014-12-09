'use strict';

var _ = require('underscore');
var path = require('path');
var config = require('./../config');

function getTestName(filePath){
	return _.find(path.dirname(filePath).split(path.sep).reverse(), function(item){
		return !_.isEmpty(item);
	});
}

function getLocalFitness(filePath){
	var testDir = path.dirname(filePath);
	var subUrl = testDir.substring(testDir.indexOf('FitNesseRoot') + 12, testDir.length);
	
	return path.join(config.fitNesseRoot, subUrl.split(path.sep).join('.'));
}

function create(filePath, content){
	return {
		name: getTestName(filePath),
		path: filePath,
		content: content,
		localFitness: getLocalFitness(filePath),
		changedBy: null,
		revision: null
	};
}

module.exports = {
	create: create
};