/* global ch, i18n:true, describe, it, beforeEach, expect, jasmine */
describe('AtMostCheck', function () {

	var AtMostCheck = ch.maenulabs.validation.AtMostCheck;

	var property = null;
	var limit = null;
	var check = null;
	var object = null;

	beforeEach(function () {
		property = 'a';
		limit = 100;
		check = new AtMostCheck(property, limit);
		object = {};
	});

	it('should have customizable messager', function () {
		var message = 'message';
		check = new AtMostCheck(property, limit, function () {
			return message;
		});
		expect(check.getErrors(object)).toEqual({
			a: message
		});
	});

	it('should not have an error when the property is at most the limit', function () {
		object[property] = limit - 1;
		expect(check.hasErrors(object)).toBeFalsy();
		object[property] = limit;
		expect(check.hasErrors(object)).toBeFalsy();
		object[property] = limit + 1;
		expect(check.hasErrors(object)).toBeTruthy();
	});

	it('should build the appropriate error', function () {
		var message = 'message';
		var messager = jasmine.createSpy().andReturn(message);
		i18n = {
			'ch/maenulabs/validation/AtMostCheck': {
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