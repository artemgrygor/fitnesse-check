'use strict';

var fs = require('fs');
var _ = require('underscore');

function buildHead(){
	return '<!DOCTYPE html>' +
    	'<html>' +
    	'<head>' +
    	'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">' +
    	'<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">' +
    	'<title>AT review</title>' +
    	'</head>';
}

function buildRow(test){
	var changedBy = !_.isNull(test.changedBy)? test.changedBy : '';
	var revision = !_.isNull(test.revision)? test.revision : '';
	return '<tr>' +
				'<td>' + test.name + '</td>' +
				'<td><a target="_blank" href="' + test.localFitness + '">' + '<i class="fa fa-external-link"></i>' + '<a></td>' +
				'<td>' + changedBy + '</td>' +
				'<td>' + revision + '</td>' +
				'<td>' + test.path + '</td>' +
				'</tr>';
}

function buildHtml(tests) {
  	var body = '<table class="table table-striped table-bordered table-hover table-condensed">' +
  				'<thead><tr>' +
  				'<th>Name</th>' +
  				'<th>Link to local</th>' +
  				'<th>Last change by</th>' +
  				'<th>Revision</th>' +
  				'<th>Path file</th>' +
  				'</tr></thead>';
    
    body += '<tbody>';

    tests = _.sortBy(tests, function(item) { return item.name; });
    _.each(tests, function(test){
    	body += buildRow(test);
    });

	body += '</tbody></table>';
  	return buildHead() + '<body>' + body + '</body></html>';
}

function generate(tests, callback){

	if(!fs.existsSync('./build')){
		fs.mkdirSync('./build');
	}

	var fileName = './build/index.html';
	var stream = fs.createWriteStream(fileName);

	stream.once('open', function() {
		stream.end(buildHtml(tests));
		callback();
	});
}

module.exports = {
	generate: generate
};