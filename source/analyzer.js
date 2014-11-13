'use strict';

var dir = require('node-dir');

// function filterFiles (){

// }

function getFiles (path){
	dir.files(path, function(err, files) {
	    if (err) {throw err;}
	    console.log(files);
	});
}

module.exports = {
	getFiles: getFiles
};