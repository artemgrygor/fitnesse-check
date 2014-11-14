'use strict';

var config = require('./../config');
var Client = require('svn-spawn');

function review(){
	var client = new Client({
	    cwd: config.svn.cwd,
	    username: config.svn.username,
	    password: config.svn.password
	});

	client.getInfo(function(err, data) {
		// console.log(err);
	    console.log('Repository url is %s', data.url);
	});
}

module.exports = {
	review: review
};