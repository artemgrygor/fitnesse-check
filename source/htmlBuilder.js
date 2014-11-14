'use strict';

var fs = require('fs');
var _ = require('underscore');

function buildHead(){
	return '<!DOCTYPE html>' +
    	'<html>' +
    	'<head>' +
    	'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">' +
    	'</head>';
}

function buildRow(test){
	return '<tr>' +
				'<td>' + test.name + '</td>' +
				'<td><a href="' + test.localFitness + '">asdf<a></td>' +
				'<td><a href="file:///' + test.path + '">' + test.path + '</a></td>' +
				'</tr>';
}

function buildHtml(tests) {
  	var body = '<table class="table table-striped table-bordered table-hover table-condensed">' +
  				'<thead><tr>' +
  				'<th>Name</th>' +
  				'<th>Link to local</th>' +
  				'<th>Path file</th>' +
  				'</tr></thead>';
    
    body += '<tbody>';
    _.each(tests, function(test){
    	body += buildRow(test);
    });

	body += '</tbody></table>';
  	return buildHead() + '<body>' + body + '</body></html>';
}

function generate(tests){

	if(!fs.existsSync('./build')){
		fs.mkdirSync('./build');
	}

	var fileName = './build/index.html';
	var stream = fs.createWriteStream(fileName);

	stream.once('open', function() {
	  var html = buildHtml(tests);

	  stream.end(html);
	});
}

module.exports = {
	generate: generate
};