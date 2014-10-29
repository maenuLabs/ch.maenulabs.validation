/* global ch, i18n:true, describe, it, beforeEach, expect, jasmine */
describe('AtLeastCheck', function () {

	var AtLeastCheck = ch.maenulabs.validation.AtLeastCheck;

	var property = null;
	var limit = null;
	var check = null;
	var object = null;

	beforeEach(function () {
		property = 'a';
		limit = 100;
		check = new AtLeastCheck(property, limit);
		object = {};
	});

	it('should have customizable messager', function () {
		var message = 'message';
		check = new AtLeastCheck(property, limit, function () {
			return message;
		});
		expect(check.getErrors(object)).toEqual({
			a: message
		});
	});

	it('should not have an error when the property is at least the limit', function () {
		object[property] = limit - 1;
		expect(check.hasErrors(object)).toBeTruthy();
		object[property] = limit;
		expect(check.hasErrors(object)).toBeFalsy();
		object[property] = limit + 1;
		expect(check.hasErrors(object)).toBeFalsy();
	});

	it('should build the appropriate error', function () {
		var message = 'message';
		var messager = jasmine.createSpy().andReturn(message);
		i18n = {
			'ch/maenulabs/validation/AtLeastCheck': {
				message: messager
			}
		};
		expect(check.getErrors(object)).toEqual({
			a: message
		});
		expect(messager).toHaveBeenCalledWith({
			amount: limit
		});
	});

});