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
Copyright (c) 2014,

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.