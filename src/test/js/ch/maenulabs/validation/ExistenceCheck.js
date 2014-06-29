describe('ExistenceCheck', function () {
	
	var ExistenceCheck = ch.maenulabs.validation.ExistenceCheck;

	var property = null;
	var check = null;
	var object = null;

	beforeEach(function () {
		property = 'a';
		check = new ExistenceCheck(property);
		object = {};
	});
	
	it('should have customizable messager', function () {
		var message = 'message';
		check = new ExistenceCheck(property, function () {
			return message;
		});
		expect(check.getErrors(object)).toEqual({
			a: message
		});
	});
	
	it('should not have an error when the property defined', function () {
		object[property] = null;
		expect(check.hasErrors(object)).toBeTruthy();
		object[property] = undefined;
		expect(check.hasErrors(object)).toBeTruthy();
		object[property] = 0;
		expect(check.hasErrors(object)).toBeFalsy();
		object[property] = 1;
		expect(check.hasErrors(object)).toBeFalsy();
		object[property] = '';
		expect(check.hasErrors(object)).toBeFalsy();
		object[property] = 'a';
		expect(check.hasErrors(object)).toBeFalsy();
		object[property] = [];
		expect(check.hasErrors(object)).toBeFalsy();
		object[property] = [1];
		expect(check.hasErrors(object)).toBeFalsy();
		object[property] = {};
		expect(check.hasErrors(object)).toBeFalsy();
		object[property] = {
			a: 1
		};
		expect(check.hasErrors(object)).toBeFalsy();
	});
	
	it('should build the appropriate error', function () {
		var message = 'message';
		var messager = jasmine.createSpy().andReturn(message);
		i18n = {
			'ch/maenulabs/validation/ExistenceCheck': {
				message: messager
			}
		};
		expect(check.getErrors(object)).toEqual({
			a: message
		});
		expect(messager).toHaveBeenCalled();
	});
	
});