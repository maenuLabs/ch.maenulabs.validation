/**
 * Validation.
 *
 * @module ch.maenulabs.validation
 */
(function () {
	/* global window */
	if (!window.ch) {
		window.ch = {};
	}
	if (!window.ch.maenulabs) {
		window.ch.maenulabs = {};
	}
	if (!window.ch.maenulabs.validation) {
		window.ch.maenulabs.validation = {};
	}
})();

(function () {
	/* globals ch */
	/**
	 * Validates objects.
	 *
	 * @module ch.maenulabs.validation
	 * @class Validation
	 * @implements ICheck
	 */
	ch.maenulabs.validation.Validation = new ch.maenulabs.type.Type(Object, {
		/**
		 * The checks to perform.
		 *
		 * @protected
		 * @property checks
		 * @type Array
		 */
		/**
		 * Creates a Validation.
		 *
		 * @constructor
		 *
		 * @param Array [checks=[]] The Checks to add
		 */
		initialize: function (checks) {
			checks = checks || [];
			this.checks = [];
			for (var i = 0; i < checks.length; i = i + 1) {
				this.add(checks[i]);
			}
		},
		/**
		 * Adds a check.
		 *
		 * @public
		 * @method add
		 *
		 * @param ICheck check The check to add
		 *
		 * @throws Error If the specified check is already included
		 */
		add: function (check) {
			if (this.includes(check)) {
				throw new Error('already included');
			}
			this.checks.push(check);
		},
		/**
		 * Removes a check.
		 *
		 * @public
		 * @method remove
		 *
		 * @param ICheck check The check to remove
		 *
		 * @throws Error If the specified check is not included
		 */
		remove: function (check) {
			if (!this.includes(check)) {
				throw new Error('not included');
			}
			this.checks.splice(this.checks.indexOf(check), 1);
		},
		/**
		 * Checks if the specified check is included.
		 *
		 * @public
		 * @method includes
		 *
		 * @param ICheck check The check to check for inclusion
		 *
		 * @return Boolean true if it is, false otherwise
		 */
		includes: function (check) {
			return this.checks.indexOf(check) > -1;
		},
		hasErrors: function (object) {
			for (var i = 0; i < this.checks.length; i = i + 1) {
				var check = this.checks[i];
				if (check.hasErrors(object)) {
					return true;
				}
			}
			return false;
		},
		getErrors: function (object) {
			var errors = {};
			for (var i = 0; i < this.checks.length; i = i + 1) {
				var check = this.checks[i];
				if (check.hasErrors(object)) {
					var error = check.getErrors(object);
					for (var property in error) {
						if (error.hasOwnProperty(property)) {
							errors[property] = errors[property] || [];
							errors[property].push(error[property]);
						}
					}
				}
			}
			return errors;
		}
	});
})();
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
(function () {
	/* globals i18n, ch */
	/**
	 * Checks a comparable property to be at least a limit.
	 *
	 * @module ch.maenulabs.validation
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
(function () {
	/* globals i18n, ch */
	/**
	 * Checks a comparable property to be at most a limit.
	 *
	 * @module ch.maenulabs.validation
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
(function () {
	/* globals i18n, ch */
	/**
	 * Checks a comparable property to be greater than a limit.
	 *
	 * @module ch.maenulabs.validation
	 * @class GreaterThanCheck
	 * @extends PropertiesCheck
	 */
	ch.maenulabs.validation.GreaterThanCheck =  new ch.maenulabs.type.Type(ch.maenulabs.validation.PropertiesCheck, {
		/**
		 * Creates an GreaterThanCheck.
		 *
		 * @constructor
		 *
		 * @param String property The property name
		 * @param Number limit The value must be at least this limit
		 * @param Function [messager] The messager
		 */
		initialize: function (property, limit, messager) {
			this.base('initialize')([property], function (value) {
				return value > limit;
			}, messager || function () {
				return i18n['ch/maenulabs/validation/GreaterThanCheck'].message({
					amount: limit
				});
			});
		}
	});
})();
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