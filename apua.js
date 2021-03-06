/*!
 * --------------------------------------------------------------------------
 * Name: Apua (v1.0)
 * Authors: Raine Luntta (https://github.com/luntta)
 * URL: https://github.com/luntta/apua
 * License: MIT (https://github.com/luntta/apua/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

function Apua(options) {
	this.extend = function apuaExtend(params) {
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
		logLevels: {
			fatal: 7,
			bug: 6,
			error: 5,
			warn: 4,
			security: 3,
			todo: 2,
			log: 1
		}
	}

	this.options = options;

	this.settings = this.extend({}, this.defaults, this.options);

	this.devMode = function devMode(flag) {
		if (flag == undefined) {
			return this.settings.devMode;
		} else if (typeof flag === 'boolean') {
			this.settings.devMode = Boolean(flag);
		} else {
			this.error("devMode value needs to be a boolean. You tried: " + this.settings.devMode);
			this.settings.devMode = this.defaults.devMode;
		}
	}

	this.logLevel = function logLevel(level) {
		if (level == undefined) {
			return this.settings.logLevel;
		} else if (typeof level === 'number') {
			this.settings.logLevel = Number(level);
		} else {
			this.error("logLevel values need to be numbers. You tried: " + this.settings.logLevel);
			this.settings.logLevel = this.defaults.logLevel;
		}
	}

	this.log = function apuaLog() {
		if (this.logLevel() <= this.settings.logLevels.log) {
			Array.prototype.unshift.call(arguments, "LOG");
			console.log.apply(console, arguments);
		}
	}

	this.todo = function apuaTodo() {
		if (this.logLevel() <= this.settings.logLevels.todo) {
			Array.prototype.unshift.call(arguments, "TODO");
			console.log.apply(console, arguments);
		}
	}

	this.security = function apuaSecurity() {
		if (this.logLevel() <= this.settings.logLevels.security) {
			Array.prototype.unshift.call(arguments, "SECURITY");
			console.warn.apply(console, arguments);
		}
	}

	this.warn = function apuaWarn() {
		if (this.logLevel() <= this.settings.logLevels.warn) {
			Array.prototype.unshift.call(arguments, "WARNING");
			console.warn.apply(console, arguments);
		}
	}

	this.error = function apuaError() {
		if (this.logLevel() <= this.settings.logLevels.error) {
			Array.prototype.unshift.call(arguments, "ERROR");
			console.error.apply(console, arguments);
		}
	}

	this.bug = function apuaBug() {
		if (this.logLevel() <= this.settings.logLevels.bug) {
			Array.prototype.unshift.call(arguments, "BUG");
			console.error.apply(console, arguments);
		}
	}

	this.fatal = function apuaFatal() {
		if (this.logLevel() <= this.settings.logLevels.fatal) {
			Array.prototype.unshift.call(arguments, "FATAL");
			console.error.apply(console, arguments);
		}
	}

	this.assert = function apuaAssert(condition, message, openDebugger) {
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
	try {
		this.devMode(this.settings.devMode);
		this.logLevel(this.settings.logLevel);

		var logLevels = this.settings.logLevels;

		for (var key in logLevels) {
			if (typeof logLevels[key] === 'number') {
				continue;
			} else {
				this.error("logLevels needs to be numbers. You tried: " + key + ": " + logLevels[key]);
				logLevels[key] = this.defaults.logLevels[key];
			}
		}
	} catch (e) {
		console.error("apuaJS ERROR:", e, this.options);
	}
}

var apua = new Apua();
