(function () {
	/* globals ch */
	/**
	 * Checks a property's properties.
	 *
	 * @module ch.maenulabs.validation
	 * @class ObjectCheck
	 * @implements ICheck
	 */
	ch.maenulabs.validation.ObjectCheck =  new ch.maenulabs.type.Type(Object, {
		/**
		 * The property name.
		 *
		 * @private
		 * @property property
		 * @type String
		 */
		/**
		 * The validation to perform on property.
		 *
		 * @private
		 * @property validation
		 * @type Validation
		 */
		/**
		 * Creates an ObjectCheck.
		 *
		 * @constructor
		 *
		 * @param String property The property name
		 * @param Validation validation The validation to perform on property
		 * @param Boolean [required=true] Whether or not the validation is
		 *     performed if the property is undefined
		 */
		initialize: function (property, validation, required) {
			if (required == null) {
				required = true;
			}
			this.property = property;
			this.validation = validation;
			this.required = required;
		},
		hasErrors: function (object) {
			if (!this.required && (object == null
					|| object[this.property] == null)) {
				return false;
			}
			if (object == null) {
				return this.validation.hasErrors(undefined);
			}
			return this.validation.hasErrors(object[this.property]);
		},
		getErrors: function (object) {
			var error = {};
			if (!this.required && (object == null
					|| object[this.property] == null)) {
				error[this.property] = {};
				return error;
			}
			if (object == null) {
				error[this.property] = this.validation.getErrors(undefined);
			} else {
				error[this.property] = this.validation.getErrors(object[
						this.property]);
			}
			return error;
		}
	});
})();