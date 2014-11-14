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

function buildRow(file){
	return '<tr>' +
				'<td>' + file.path + '</td>' +
				'<td><a href="' + 'http://localhost:8086/ConstructionMigration.CasContract.ChangeOrder' + '">asdf<a></td>' +
				'<td>' + file.title + '</td>' +
				'</tr>';
}

function buildHtml(files) {
  	var body = '<table class="table table-striped table-bordered table-hover table-condensed">' +
  				'<thead><tr>' +
  				'<th>Title</th>' +
  				'<th>Link to local</th>' +
  				'<th>Path file</th>' +
  				'</tr></thead>';
    
    body += '<tbody>';
    _.each(files, function(file){
    	body += buildRow(file);
    });

	body += '</tbody></table>';
  	return buildHead() + '<body>' + body + '</body></html>';
}

function generate(files){

	if(!fs.existsSync('./build')){
		fs.mkdirSync('./build');
	}

	var fileName = './build/index.html';
	var stream = fs.createWriteStream(fileName);

	stream.once('open', function() {
	  var html = buildHtml(files);

	  stream.end(html);
	});
}

module.exports = {
	generate: generate
};