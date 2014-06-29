(function () {
	/* globals i18n, ch */
	/**
	 * Checks a comparable property to be at least a limit.
	 *
	 * @module validation
	 * @class AtLeastCheck
	 * @extends PropertiesCheck
	 */
	ch.maenulabs.validation.AtLeastCheck =  new ch.maenulabs.type.Type(ch.maenulabs.validation.PropertiesCheck, {
		/**
		 * Creates an AtLeastCheck.
		 *
		 * @constructor
		 *
		 * @param String property The property name
		 * @param Number limit The value must be at least this limit
		 * @param Function [messager] The messager
		 */
		initialize: function (property, limit, messager) {
			this.base('initialize')([property], function (value) {
				return value >= limit;
			}, messager || function () {
				return i18n['ch/maenulabs/validation/AtLeastCheck'].message({
					amount: limit
				});
			});
		}
	});
})();