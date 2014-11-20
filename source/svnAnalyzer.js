'use strict';

var config = require('./../config');

var _ = require('underscore');
var async = require('async');
var Client = require('svn-spawn');

function convertToSvnPath(path){
	return path.substring(config.svn.cwd.length + 1, path.length).split('\\').join('//');
}

function callSvn(client, test, callback){

	var path = convertToSvnPath(test.path);
	client.cmd(['blame', path], function(err, data) {
		if(!_.isNull(err)){
			callback();
		}
		if(_.isUndefined(data)){
			callback();
		}

		var row = _.find(data.split('\n'), function(row) { 
			return row.indexOf('<Normal/>') > 0; 
		});
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

function review(tests, callback){
	var client = new Client({
	    cwd: config.svn.cwd,
	    username: config.svn.username,
	    password: config.svn.password
	});

	async.eachLimit(tests, 100, 
		function(item, callback){
			callSvn(client, item, callback);
		}, 
		function(err) {
			callback(tests, err);
		});
}

module.exports = {
	review: review
};