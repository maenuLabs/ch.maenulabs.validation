(function () {
	/* globals ch */
	/**
	 * Validates objects.
	 *
	 * @module validation
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