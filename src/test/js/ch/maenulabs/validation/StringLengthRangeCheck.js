describe('StringLengthRangeCheck', function () {
	
	var StringLengthRangeCheck = ch.maenulabs.validation.StringLengthRangeCheck;
	
	var property = null;
	var minimum = null;
	var maximum = null;
	var object = null;
	var check = null;

	beforeEach(function () {
		property = 'z';
		minimum = 3;
		maximum = 5;
		object = {
			z: 'text'
		};
		check = new StringLengthRangeCheck(property, minimum, maximum);
	});
	
	it('should not have and error', function () {
		expect(check.hasErrors(object)).toBeFalsy();
		expect(check.getErrors(object)).toEqual({
			z: {}
		});
	});

	describe('hasErrors', function () {
	
		it('should have errors when undefined', function () {
			expect(check.hasErrors(undefined)).toBeTruthy();
		});
	
		it('should have errors when too short', function () {
			object.z = '';
			expect(check.hasErrors(object)).toBeTruthy();
		});
	
		it('should have errors when too long', function () {
			object.z = 'text text';
			expect(check.hasErrors(object)).toBeTruthy();
		});
	
	});

	describe('getErrors', function () {
		
		var atLeastMessage = null;
		var atMostMessage = null;
		var atLeastMessager = null;
		var atMostMessager = null;
		
		beforeEach(function () {
			atLeastMessage = 'must be at least';
			atMostMessage = 'must be at most';
			atLeastMessager = jasmine.createSpy().andReturn(atLeastMessage);
			atMostMessager = jasmine.createSpy().andReturn(atMostMessage);
			i18n = {
				'ch/maenulabs/validation/StringLengthRangeCheck': {
					minimum: atLeastMessager,
					maximum: atMostMessager
				}
			};
		});
	
		it('should get errors when undefined', function () {
			expect(check.getErrors(undefined)).toEqual({
				z: {
					length: [atLeastMessage, atMostMessage]
				}
			});
			expect(atLeastMessager).toHaveBeenCalled();
			expect(atMostMessager).toHaveBeenCalled();
		});
	
		it('should get errors when too short', function () {
			object.z = '';
			expect(check.getErrors(object)).toEqual({
				z: {
					length: [atLeastMessage]
				}
			});
			expect(atLeastMessager).toHaveBeenCalled();
			expect(atMostMessager).not.toHaveBeenCalled();
		});
	
		it('should get errors when too long', function () {
			object.z = 'text text';
			expect(check.getErrors(object)).toEqual({
				z: {
					length: [atMostMessage]
				}
			});
			expect(atLeastMessager).not.toHaveBeenCalled();
			expect(atMostMessager).toHaveBeenCalled();
		});
	
	});
	
});