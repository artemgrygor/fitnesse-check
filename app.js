'use strict';

var config = require('./config');
var reviewer = require('./source/reviewer');

reviewer(config).start();