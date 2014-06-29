describe('Validation', function () {
	
	var Validation = ch.maenulabs.validation.Validation;
	var ExistenceCheck = ch.maenulabs.validation.ExistenceCheck;
	var GreaterThanCheck = ch.maenulabs.validation.GreaterThanCheck;
	
	var validation = null;
	var object = null;

	beforeEach(function () {
		validation = new Validation();
		object = {
			a: 1,
			b: 2
		};
	});
	
	it('should neither have errors nor checks', function () {
		expect(validation.checks).toEqual([]);
		expect(validation.hasErrors(object)).toBeFalsy();
		expect(validation.getErrors(object)).toEqual({});
	});
	
	it('should initialize with checks', function () {
		var check = 1;
		validation = new Validation([check]);
		expect(validation.includes(check)).toBeTruthy();
		expect(validation.checks).toEqual([check]);
	});
	
	describe('add, remove, includes', function () {
		
		var check = null;
		
		beforeEach(function () {
			check = new ExistenceCheck('a');
		});
	
		it('should add a check', function () {
			validation.add(check);
			expect(validation.checks).toEqual([check]);
		});
		
		it('should not add an included check', function () {
			validation.add(check);
			expect(function () {
				validation.add(check);
			}).toThrow();
			expect(validation.checks).toEqual([check]);
		});
	
		it('should remove a check', function () {
			validation.add(check);
			validation.remove(check);
			expect(validation.checks).toEqual([]);
		});
		
		it('should not remove a not included check', function () {
			validation.add(check);
			validation.remove(check);
			expect(function () {
				validation.remove(check);
			}).toThrow();
			expect(validation.checks).toEqual([]);
		});
	
		it('should include a check', function () {
			expect(validation.includes(check)).toBeFalsy();
			validation.add(check);
			expect(validation.includes(check)).toBeTruthy();
			validation.remove(check);
			expect(validation.includes(check)).toBeFalsy();
		});
		
	});
	
	describe('hasErrors', function () {
		
		it('should not have errors when all checks pass', function () {
			validation.add(new ExistenceCheck('a'));
			validation.add(new ExistenceCheck('b'));
			expect(validation.hasErrors(object)).toBeFalsy();
		});
		
		it('should have errors when one check fails', function () {
			validation.add(new ExistenceCheck('a'));
			validation.add(new ExistenceCheck('c'));
			expect(validation.hasErrors(object)).toBeTruthy();
		});
		
		it('should have errors when more than one check fails', function () {
			validation.add(new ExistenceCheck('a'));
			validation.add(new ExistenceCheck('c'));
			validation.add(new GreaterThanCheck('c', 1));
			expect(validation.hasErrors(object)).toBeTruthy();
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
		
		it('should only get errors that failed the check', function () {
			validation.add(new ExistenceCheck('a'));
			validation.add(new ExistenceCheck('c'));
			expect(validation.getErrors(object)).toEqual({
				c: [existenceMessage]
			});
			expect(existenceMessager).toHaveBeenCalled();
			expect(greaterThanMessager).not.toHaveBeenCalled();
		});
		
		it('should merge errors of the same property', function () {
			var limit = 1;
			validation.add(new ExistenceCheck('c'));
			validation.add(new GreaterThanCheck('c', limit));
			expect(validation.getErrors(object)).toEqual({
				c: [existenceMessage, greaterThanMessage]
			});
			expect(existenceMessager).toHaveBeenCalled();
			expect(greaterThanMessager).toHaveBeenCalledWith({
				amount: limit
			});
		});
		
	});
	
});