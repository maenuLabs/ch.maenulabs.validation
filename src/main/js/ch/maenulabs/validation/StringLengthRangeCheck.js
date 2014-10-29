(function () {
	/* globals i18n, ch */
	var Validation = ch.maenulabs.validation.Validation;
	var AtLeastCheck = ch.maenulabs.validation.AtLeastCheck;
	var AtMostCheck = ch.maenulabs.validation.AtMostCheck;
	/**
	 * Checks whether the string length lies in the specified range.
	 *
	 * @module ch.maenulabs.validation
	 * @class StringLengthRangeCheck
	 * @extends ObjectCheck
	 */
	ch.maenulabs.validation.StringLengthRangeCheck =  new ch.maenulabs.type.Type(ch.maenulabs.validation.ObjectCheck, {
		/**
		 * Creates an StringLengthRangeCheck.
		 *
		 * @constructor
		 *
		 * @param String property The property name
		 * @param Number minimum The minimum length
		 * @param Number maximum The maximum length
		 * @param Boolean [required=true] Whether or not the validation is
		 *     performed if the property is undefined
		 */
		initialize: function (property, minimum, maximum, required) {
			this.base('initialize')(property, new Validation([
				new AtLeastCheck('length', minimum, function () {
					return i18n['ch/maenulabs/validation/StringLengthRangeCheck'].minimum({
						amount: minimum
					});
				}),
				new AtMostCheck('length', maximum, function () {
					return i18n['ch/maenulabs/validation/StringLengthRangeCheck'].maximum({
						amount: maximum
					});
				})
			]), required);
		}
	});
})();