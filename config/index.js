module.exports = {
	paths: {
		js: ['./app.js', './source/*.js', './source/**/*.js'],
		at: 'C:\\wtDev\\Requirements\\AcceptanceTests\\FitNesseRoot\\ConstructionMigration\\FieldManagerContract'
		// at: 'C:\\wtDev\\Requirements\\AcceptanceTests\\FitNesseRoot\\ConstructionMigration'
	},
	exclusions: ['SetUp', 'UiTest'],
	fitNesseRoot: 'http://localhost:8086/',
	svn:{
		cwd: '/path to your svn working directory',
		username: 'username', // optional if authentication not required or is already saved
		password: 'password', // optional if authentication not required or is already saved
	}
};