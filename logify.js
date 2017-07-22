/*!
 * --------------------------------------------------------------------------
 * Name: LogifyJS (v1.0)
 * Authors: Raine Luntta (https://github.com/raineluntta)
 * URL: https://github.com/raineluntta/LogifyJS
 * License: MIT (https://github.com/raineluntta/LogifyJS/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

function Logify(options) {
	try {
		this.extend = function logifyExtend(params) {
			params = params || {};
			for (var i = 1; i < arguments.length; i++) {
				var object = arguments[i];
				if (!object) {
					continue;
				}
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						if (typeof object[key] === 'object') {
							params[key] = this.extend(params[key], object[key]);
						} else {
							params[key] = object[key];
						}
					}
				}
			}
			return params;
		};

		this.defaults = {
			devMode: true,
			logLevel: 1,
			fatal: 7,
			bug: 6,
			error: 5,
			warn: 4,
			security: 3,
			todo: 2,
			log: 1
		}

		this.options = options;

		this.settings = this.extend({}, this.defaults, options);

		this.devMode = function (flag) {
			if (flag == null) {
				return this.settings.devMode;
			} else if (typeof flag === 'boolean') {
				this.settings.devMode = Boolean(flag);
			} else {
				throw "LogifyJS: devMode accepts boolean values only. You tried: " + this.settings.devMode;
			}
		}
		this.devMode(this.settings.devMode);

		this.logLevel = function (level) {
			if (level == null) {
				return this.settings.logLevel;
			} else if (typeof level === 'number') {
				this.settings.logLevel = Number(level);
			} else {
				throw "LogifyJS: logLevel accepts only number values. You tried: " + this.settings.logLevel;
			}
		}
		this.logLevel(this.settings.logLevel);

		this.log = function logifyLog() {
			if (this.logLevel() <= this.settings.log) {
				Array.prototype.unshift.call(arguments, "LOG");
				console.log.apply(console, arguments);
			}
		}

		this.todo = function logifyTodo() {
			if (this.logLevel() <= this.settings.todo) {
				Array.prototype.unshift.call(arguments, "TODO");
				console.log.apply(console, arguments);
			}
		}

		this.security = function logifySecurity() {
			if (this.logLevel() <= this.settings.security) {
				Array.prototype.unshift.call(arguments, "SECURITY");
				console.warn.apply(console, arguments);
			}
		}

		this.warn = function logifyWarn() {
			if (this.logLevel() <= this.settings.warn) {
				Array.prototype.unshift.call(arguments, "WARNING");
				console.warn.apply(console, arguments);
			}
		}

		this.error = function logifyError() {
			if (this.logLevel() <= this.settings.error) {
				Array.prototype.unshift.call(arguments, "ERROR");
				console.error.apply(console, arguments);
			}
		}

		this.bug = function logifyBug() {
			if (this.logLevel() <= this.settings.bug) {
				Array.prototype.unshift.call(arguments, "BUG");
				console.error.apply(console, arguments);
			}
		}

		this.fatal = function logifyFatal() {
			if (this.logLevel() <= this.settings.fatal) {
				Array.prototype.unshift.call(arguments, "FATAL");
				console.error.apply(console, arguments);
			}
		}

		this.assert = function logifyAssert(condition, message, openDebugger) {
			if (this.devMode() == true) {
				if (condition) {
					return;
				}
				if (openDebugger) {
					debugger;
				} else {
					throw new Error("ASSERTION FAILED: " + message);
				}
			}
		}
	} catch (e) {
		console.error(e,this.options);
	}
}

var logify = new Logify();