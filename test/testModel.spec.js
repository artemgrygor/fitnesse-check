var path = require('path');
var expect = require('chai').expect;

var testModel = require('../source/testModel');
var config = require('../config');

describe('Module: testModel', function(){

	it('should exist', function() {
        expect(testModel).to.not.be.undefined;
	});

	describe('exports', function(){

		describe('create method', function(){
			it('create function which should exist', function() {
		        expect(testModel.create).to.exist();
		        expect(testModel.create).to.be.a('function');
			});

			describe('returns object with name property', function(){
				it('should be same for empty', function(){
					var filePath = '';

					var result = testModel.create(filePath);
					expect(result).to.have.property('name')
						.and.equal('.');
				})

				it('should return last part of path', function(){
					var filePath = '//AcceptanceTests//FitNesseRoot//DataMigrationUtility//AcceptanceTests//properties.xml';
					
					var result = testModel.create(filePath);
					expect(result).to.have.property('name')
						.and.equal('AcceptanceTests');
				})
			})

			describe('returns object with path property', function(){
				it('should be same for empty', function(){
					var filePath = 'asdf';

					var result = testModel.create(filePath);
					expect(result).to.have.property('path')
						.and.equal(filePath);
				})
			})

			describe('returns object with content property', function(){
				it('should be same for empty', function(){
					var filePath = 'asdf';
					var content = 'content';

					var result = testModel.create(filePath, content);
					expect(result).to.have.property('content')
						.and.equal(content);
				})
			})

			describe('returns object with localFitness property', function(){
				it('should be same for empty', function(){
					var filePath = '//AcceptanceTests//FitNesseRoot//DataMigrationUtility//AcceptanceTests//properties.xml';
					var content = 'content';

					var result = testModel.create(filePath, content);
					expect(result).to.have.property('localFitness')
						.and.equal(path.join(config.fitNesseRoot + '..DataMigrationUtility..AcceptanceTests.'));
				})
			})

			describe('returns object with changedBy property', function(){
				it('should be same for empty', function(){
					var filePath = '';
					var content = 'content';

					var result = testModel.create(filePath, content);
					expect(result).to.have.property('changedBy')
						.and.equal(null);
				})
			})

			describe('returns object with changedBy property', function(){
				it('should be same for empty', function(){
					var filePath = '';
					var content = 'content';

					var result = testModel.create(filePath, content);
					expect(result).to.have.property('revision')
						.and.equal(null);
				})
			})
		})
	})
})