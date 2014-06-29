(function () {
	/* globals i18n, ch */
	/**
	 * Checks a comparable property to be at most a limit.
	 *
	 * @module validation
	 * @class AtMostCheck
	 * @extends PropertiesCheck
	 */
	ch.maenulabs.validation.AtMostCheck =  new ch.maenulabs.type.Type(ch.maenulabs.validation.PropertiesCheck, {
		/**
		 * Creates an AtMostCheck.
		 *
		 * @constructor
		 *
		 * @param String property The property name
		 * @param Number limit The value must be at least this limit
		 * @param Function [messager] The messager
		 */
		initialize: function (property, limit, messager) {
			this.base('initialize')([property], function (value) {
				return value <= limit;
			}, messager || function () {
				return i18n['ch/maenulabs/validation/AtMostCheck'].message({
					amount: limit
				});
			});
		}
	});
})();