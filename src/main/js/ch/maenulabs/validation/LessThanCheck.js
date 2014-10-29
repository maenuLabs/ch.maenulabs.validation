(function () {
	/* globals i18n, ch */
	/**
	 * Checks a comparable property to be less than a limit.
	 *
	 * @module ch.maenulabs.validation
	 * @class LessThanCheck
	 * @extends PropertiesCheck
	 */
	ch.maenulabs.validation.LessThanCheck =  new ch.maenulabs.type.Type(ch.maenulabs.validation.PropertiesCheck, {
		/**
		 * Creates an LessThanCheck.
		 *
		 * @constructor
		 *
		 * @param String property The property name
		 * @param Number limit The value must be at least this limit
		 * @param Function [messager] The messager
		 */
		initialize: function (property, limit, messager) {
			this.base('initialize')([property], function (value) {
				return value < limit;
			}, messager || function () {
				return i18n['ch/maenulabs/validation/LessThanCheck'].message({
					amount: limit
				});
			});
		}
	});
})();