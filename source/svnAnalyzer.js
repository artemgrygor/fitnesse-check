'use strict';

var config = require('./../config');

var _ = require('underscore');
var Client = require('svn-spawn');

function review(){
	var client = new Client({
	    cwd: config.svn.cwd,
	    username: config.svn.username,
	    password: config.svn.password
	});

	client.cmd(['blame', 'Requirements//AcceptanceTests//FitNesseRoot//ConstructionMigration//FieldManagerContract//ContractTime//properties.xml'], function(err, data) {
		var row = _.find(data.split('\n'), function(row) { return row.indexOf('<Normal/>') > 0; });
		console.log('---');
		var columns = _.filter(row.trim().split(' '), function(item) { 
			return item !== '' && !_.isNull(item); 
		});
		console.log(columns.length);
	});
}

module.exports = {
	review: review
};