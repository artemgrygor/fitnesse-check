var svn = require('./svn.conf.js').svn;

module.exports = {
	paths: {
		js: ['./app.js', './source/*.js', './source/**/*.js'],
		at: 'C:\\wtDev\\Requirements\\AcceptanceTests\\FitNesseRoot\\ConstructionMigration'
	},
	exclusions: ['SetUp', 'UiTest'],
	fitNesseRoot: 'http://localhost:8086/',
	svn:{
		cwd: svn.cwd,
		username: svn.username, // optional if authentication not required or is already saved
		password: svn.password, // optional if authentication not required or is already saved
	}
};