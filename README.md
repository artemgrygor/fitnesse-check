# FitNesse-check

review all acceptance tests in the specific folders by property.xml and finds all turned off.
Also it has SVN checker which summarize all turned off AT and collect svn-commit, account user.

# How to use?

Clone repo,
$ git clone git@github.com:artemgrygor/testreviewer.git

Create svn.conf.js file,

module.exports = {
	svn: {
		cwd: '<PATH_TO_SVN_FOLDER>',
		username: '<ACCOUNT_LOGIN>',
		password: '<ACCOUNT_PASSWORD>'
	}
};

install dependenices
npm install

Gulp tasks:
default task execute reviewer and creates .build/index.html with all turned off AT
gulp 

unit - runs all unit-test
lint - checks JsHint

License (MIT)