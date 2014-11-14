'use strict';

var fs = require('fs');

function buildHtml() {
  var header = '';
  var body = '';

  return '<!DOCTYPE html>' +
    	'<html><header>' + header + '</header><body>' + body + '</body></html>';
}

function generate(){

	if(!fs.existsSync('./build')){
		fs.mkdirSync('./build');
	}

	var fileName = './build/index.html';
	var stream = fs.createWriteStream(fileName);

	stream.once('open', function() {
	  var html = buildHtml();

	  stream.end(html);
	});
}

module.exports = {
	generate: generate
};