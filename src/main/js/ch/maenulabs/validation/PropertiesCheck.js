(function () {
	/* globals ch */
	/**
	 * Checks some properties.
	 *
	 * @module ch.maenulabs.validation
	 * @class PropertiesCheck
	 * @implements ICheck
	 */
	ch.maenulabs.validation.PropertiesCheck =  new ch.maenulabs.type.Type(Object, {
		/**
		 * The names of the properties to check.
		 *
		 * @private
		 * @property properties
		 * @type Array
		 */
		/**
		 * Should expect the checked values and return a Boolean.
		 *
		 * @private
		 * @property checker
		 * @type Function
		 */
		/**
		 * Should expect the checked values and return a error message String.
		 *
		 * @private
		 * @property messager
		 * @type Function
		 */
		/**
		 * Creates a PropertiesCheck.
		 *
		 * @constructor
		 *
		 * @param Array properties The names of the properties to check
		 * @param Function checker Should expect the checked values and return
		 *     a Boolean
		 * @param Function messager Should expect the checked values and
		 *     return a error message String
		 */
		initialize: function (properties, checker, messager) {
			this.properties = properties;
			this.checker = checker;
			this.messager = messager;
		},
		hasErrors: function (object) {
			return !this.checker.apply(this, this.getValues(object));
		},
		getErrors: function (object) {
			var message = this.messager.apply(this, this.getValues(object));
			var error = {};
			for (var i = 0; i < this.properties.length; i = i + 1) {
				error[this.properties[i]] = message;
			}
			return error;
		},
		/**
		 * Gets the values of the properties to check.
		 *
		 * @protected
		 * @method getValues
		 *
		 * @param * object The object to inspect
		 *
		 * @return Array The values of the properties in the same order
		 */
		getValues: function (object) {
			var values = [];
			for (var i = 0; i < this.properties.length; i = i + 1) {
				if (object == null) {
					values.push(undefined);
				} else {
					values.push(object[this.properties[i]]);
				}
			}
			return values;
		}
	});
})();