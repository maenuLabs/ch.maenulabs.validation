describe('ObjectCheck', function () {
	
	var ObjectCheck = ch.maenulabs.validation.ObjectCheck;
	var Validation = ch.maenulabs.validation.Validation;
	var ExistenceCheck = ch.maenulabs.validation.ExistenceCheck;
	var GreaterThanCheck = ch.maenulabs.validation.GreaterThanCheck;
	
	var property = null;
	var validation = null;
	var object = null;

	beforeEach(function () {
		property = 'z';
		validation = new Validation();
		object = {
			z: {
				a: 1,
				b: 2
			}
		};
	});
	
	it('should default to be required', function () {
		var check = new ObjectCheck(property, validation);
		expect(check.required).toBeTruthy();
	});
	
	describe('required', function () {
	
		var required = null;
		var check = null;

		beforeEach(function () {
			required = true;
			check = new ObjectCheck(property, validation, required);
		});
	
		it('should not have an error', function () {
			expect(check.hasErrors(object)).toBeFalsy();
			expect(check.getErrors(object)).toEqual({
				z: {}
			});
		});
	
		describe('hasErrors', function () {
		
			it('should have errors when undefined', function () {
				validation.add(new ExistenceCheck('a'));
				validation.add(new ExistenceCheck('c'));
				expect(check.hasErrors(undefined)).toBeTruthy();
			});
		
			it('should not have errors when all checks pass', function () {
				validation.add(new ExistenceCheck('a'));
				validation.add(new ExistenceCheck('b'));
				expect(check.hasErrors(object)).toBeFalsy();
			});
		
			it('should have errors when one check fails', function () {
				validation.add(new ExistenceCheck('a'));
				validation.add(new ExistenceCheck('c'));
				expect(check.hasErrors(object)).toBeTruthy();
			});
		
			it('should have errors when more than one check fails', function () {
				validation.add(new ExistenceCheck('a'));
				validation.add(new ExistenceCheck('c'));
				validation.add(new GreaterThanCheck('c', 1));
				expect(check.hasErrors(object)).toBeTruthy();
			});
		
		});
	
		describe('getErrors', function () {
			
			var existenceMessage = null;
			var greaterThanMessage = null;
			var existenceMessager = null;
			var greaterThanMessager = null;
			
			beforeEach(function () {
				existenceMessage = 'must exist';
				greaterThanMessage = 'must be greater';
				existenceMessager = jasmine.createSpy().andReturn(existenceMessage);
				greaterThanMessager = jasmine.createSpy().andReturn(greaterThanMessage);
				i18n = {
					'ch/maenulabs/validation/ExistenceCheck': {
						message: existenceMessager
					},
					'ch/maenulabs/validation/GreaterThanCheck': {
						message: greaterThanMessager
					}
				};
			});
		
			it('should get errors when undefined', function () {
				validation.add(new ExistenceCheck('c'));
				expect(check.getErrors(undefined)).toEqual({
					z: {
						c: [existenceMessage]
					}
				});
				expect(existenceMessager).toHaveBeenCalled();
				expect(greaterThanMessager).not.toHaveBeenCalled();
			});
		
			it('should only get errors that failed the check', function () {
				validation.add(new ExistenceCheck('a'));
				validation.add(new ExistenceCheck('c'));
				expect(check.getErrors(object)).toEqual({
					z: {
						c: [existenceMessage]
					}
				});
				expect(existenceMessager).toHaveBeenCalled();
				expect(greaterThanMessager).not.toHaveBeenCalled();
			});
		
			it('should merge errors of the same property', function () {
				var limit = 1;
				validation.add(new ExistenceCheck('c'));
				validation.add(new GreaterThanCheck('c', limit));
				expect(check.getErrors(object)).toEqual({
					z: {
						c: [existenceMessage, greaterThanMessage]
					}
				});
				expect(existenceMessager).toHaveBeenCalled();
				expect(greaterThanMessager).toHaveBeenCalledWith({
					amount: limit
				});
			});
		
		});
	
	});
	
	describe('not required', function () {
	
		var required;
		var check;

		beforeEach(function () {
			required = false;
			check = new ObjectCheck(property, validation, required);
			object[property] = undefined;
		});
	
		it('should not have an error', function () {
			expect(check.hasErrors(object)).toBeFalsy();
			expect(check.getErrors(object)).toEqual({
				z: {}
			});
		});
	
		describe('hasErrors', function () {
		
			it('should not have errors when undefined', function () {
				validation.add(new ExistenceCheck('a'));
				validation.add(new ExistenceCheck('c'));
				expect(check.hasErrors(undefined)).toBeFalsy();
			});
		
			it('should not have errors when property is undefined', function () {
				validation.add(new ExistenceCheck('a'));
				validation.add(new ExistenceCheck('c'));
				expect(check.hasErrors(object)).toBeFalsy();
			});
		
		});
	
		describe('getErrors', function () {
			
			it('should not get errors when undefined', function () {
				validation.add(new ExistenceCheck('c'));
				expect(check.getErrors(undefined)).toEqual({
					z: {}
				});
			});
		
			it('should not get errors when property is undefined', function () {
				validation.add(new ExistenceCheck('c'));
				expect(check.getErrors(object)).toEqual({
					z: {}
				});
			});
		
		});
	
	});
	
});