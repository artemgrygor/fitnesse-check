'use strict';

var config = require('./../config');

var _ = require('underscore');
var async = require('async');
var Client = require('svn-spawn');

function convertToSvnPath(path){
	return path.substring(config.svn.cwd.length + 1, path.length).split('\\').join('//');
}

function getSvnRow(content, key){
	return _.find(content.split('\n'), function(row) { 
		return row.indexOf(key) > 0; 
	});
}

function getPreviousRevision(revisionStr){
	var revision = parseInt(revisionStr);
	if(_.isNaN(revision)){
		return null;
	}
	return revision - 1;
}

function callSvnNormal(client, test, callback){

	var path = convertToSvnPath(test.path);
	client.cmd(['blame', path], function(err, data) {
		if(!_.isNull(err)){
			return callback();
		}
		if(_.isUndefined(data)){
			return callback();
		}
		var row = getSvnRow(data, '<Normal/>');
		if(!_.isUndefined(row)){
			var columns = _.filter(row.trim().split(' '), function(item) { 
				return item !== '' && !_.isNull(item); 
			});
			if(columns.length > 1){
				test.revision = columns[0];
				test.changedBy = columns[1];
			}
		}

		callback();
	});
}

function callSvnTest(client, test, callback){
	if(_.isNull(test.revision)){
		return callback();
	}

	var previousRevision = getPreviousRevision(test.revision);
	if(_.isNull(previousRevision)){
		return callback();
	}

	var path = convertToSvnPath(test.path);
	client.cmd(['blame', '-r', '1:' + previousRevision.toString(), path], function(err, data) {
		if(!_.isNull(err)){

			if(err.toString().indexOf('E195012') > -1){
				// was NOT turned on!
				test.revision = null;
				test.changedBy = null;
			}

			return callback();
		}
		if(_.isUndefined(data)){
			return callback();
		}

		var row = getSvnRow(data, '<Test/>');
		if(_.isUndefined(row)){
			// was NOT turned on!
			test.revision = null;
			test.changedBy = null;
		}

		callback();
	});
}

function review(tests, callback){
	var client = new Client({
	    cwd: config.svn.cwd,
	    username: config.svn.username,
	    password: config.svn.password
	});

	async.eachLimit(tests, 100, 
		function(item, callback){
			
			callSvnNormal(client, item, callback);
		},
		function() {

			async.eachLimit(tests, 100, 
				function(item, callback){
					callSvnTest(client, item, callback);
				}, function(err){
					callback(tests, err);
				});
		});
}

module.exports = {
	review: review,
	callSvnTest: callSvnTest
};