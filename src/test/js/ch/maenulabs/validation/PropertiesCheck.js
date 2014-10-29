/* global ch, describe, it, beforeEach, expect, jasmine */
describe('PropertiesCheck', function () {

	var PropertiesCheck = ch.maenulabs.validation.PropertiesCheck;

	var properties = null;
	var checker = null;
	var messager = null;
	var check = null;
	var object = null;

	beforeEach(function () {
		properties = ['a', 'b'];
		checker = jasmine.createSpy();
		messager = jasmine.createSpy();
		check = new PropertiesCheck(properties, checker, messager);
		object = {
			a: 1,
			b: 2
		};
	});

	describe('getValues', function () {

		it('should get the values of the properties', function () {
			expect(check.getValues(object)).toEqual([1, 2]);
		});

		it('should get the undefined values if the object is undefined', function () {
			expect(check.getValues(undefined)).toEqual([undefined, undefined]);
		});

	});

	describe('hasErrors', function () {

		it('should have errors when undefined', function () {
			checker.andReturn(false);
			expect(check.hasErrors(undefined)).toBeTruthy();
		});

		it('should call the checker with the values', function () {
			check.hasErrors(object);
			expect(checker).toHaveBeenCalledWith(1, 2);
		});

		it('should return the negated checker result', function () {
			checker.andReturn(true);
			expect(check.hasErrors(object)).toBeFalsy();
			checker.andReturn(false);
			expect(check.hasErrors(object)).toBeTruthy();
		});

	});

	describe('getErrors', function () {

		it('should get errors when undefined', function () {
			messager.andReturn('message');
			expect(check.getErrors(undefined)).toEqual({
				a: 'message',
				b: 'message'
			});
		});

		it('should call the messager with the values', function () {
			check.getErrors(object);
			expect(messager).toHaveBeenCalledWith(1, 2);
		});

		it('should build the error object with all properties and the same message', function () {
			messager.andReturn('message');
			expect(check.getErrors(object)).toEqual({
				a: 'message',
				b: 'message'
			});
		});

	});

});