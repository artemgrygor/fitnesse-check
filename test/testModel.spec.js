var expect = require('chai').expect;
var testModel = require('../source/testModel');

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
					expect(result).to.have.property('name');
					expect(result.name).to.equal('.');
				})

				it('should return last part of path', function(){
					var filePath = 'C:\\wtDev\\Requirements\\AcceptanceTests\\FitNesseRoot\\DataMigrationUtility\\AcceptanceTests\\properties.xml';

					var result = testModel.create(filePath);
					expect(result).to.have.property('name');
					expect(result.name).to.equal('AcceptanceTests');
				})
			})

			xit('should return object with properties', function(){
				var result = testModel.create();
				console.log(result);
				// expect(result).to.have.property('name');
				expect(result).to.have.property('path');
				// expect(result).to.have.property('content');
				// expect(result).to.have.property('localFitness');
				// expect(result).to.have.property('changedBy')
				// 	.and.equal(null);
				// expect(result).to.have.property('revision');
			})
		})
	})
})