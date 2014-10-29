(function () {
	/* globals i18n, ch */
	/**
	 * Checks a property to be defined.
	 *
	 * @module ch.maenulabs.validation
	 * @class ExistenceCheck
	 * @extends PropertiesCheck
	 */
	ch.maenulabs.validation.ExistenceCheck =  new ch.maenulabs.type.Type(ch.maenulabs.validation.PropertiesCheck, {
		/**
		 * Creates an ExistenceCheck.
		 *
		 * @constructor
		 *
		 * @param String property The property name
		 * @param Function [messager] The messager
		 */
		initialize: function (property, messager) {
			this.base('initialize')([property], function (value) {
				return value != null;
			}, messager || function () {
				return i18n['ch/maenulabs/validation/ExistenceCheck'].message();
			});
		}
	});
})();