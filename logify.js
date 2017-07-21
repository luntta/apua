/*!
 * --------------------------------------------------------------------------
 * Name: Logify (v1.0)
 * Authors: Raine Luntta (http://isopaha.fi)
 * URL: https://github.com/raineluntta/LogifyJS
 * License: MIT (https://github.com/raineluntta/LogifyJS/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

function Logify() {
	this.setDevMode = function(boolean) {
		localStorage.setItem("DevMode", boolean);
	}

	this.getDevMode = function() {
		return JSON.parse(localStorage.getItem("DevMode")) || false;
	}

	this.setLogLevel = function(level) {
		localStorage.setItem("LogLevel", Number(level));
	}

	this.getLogLevel = function() {
		return localStorage.getItem("LogLevel") || 3;
	}

	const loglevels = {
		fatal: 7,
		bug: 6,
		error: 5,
		warn: 4,
		security: 3,
		todo: 2,
		log: 1
	};
	const loglevel = this.getLogLevel();

	this.log = function() {
		if (this.getDevMode() && loglevel <= loglevels.log) {
			Array.prototype.unshift.call(arguments, "LOG");
			console.log.apply(console, arguments);
		}
	}

	this.todo = function() {
		if (this.getDevMode() && loglevel <= loglevels.todo) {
			Array.prototype.unshift.call(arguments, "TODO");
			console.log.apply(console, arguments);
		}
	}

	this.security = function() {
		if (this.getDevMode() && loglevel <= loglevels.security) {
			Array.prototype.unshift.call(arguments, "SECURITY");
			console.warn.apply(console, arguments);
		}
	}

	this.warn = function() {
		if (this.getDevMode() && loglevel <= loglevels.warn) {
			Array.prototype.unshift.call(arguments, "WARNING");
			console.warn.apply(console, arguments);
		}
	}

	this.error = function() {
		if (this.getDevMode() && loglevel <= loglevels.error) {
			Array.prototype.unshift.call(arguments, "ERROR");
			console.error.apply(console, arguments);
		}
	}

	this.bug = function() {
		if (this.getDevMode() && loglevel <= loglevels.bug) {
			Array.prototype.unshift.call(arguments, "BUG");
			console.error.apply(console, arguments);
		}
	}

	this.fatal = function() {
		if (this.getDevMode() && loglevel <= loglevels.fatal) {
			Array.prototype.unshift.call(arguments, "FATAL");
			console.error.apply(console, arguments);
		}
	}
	this.assert = function() {
		if (this.getDevMode() && loglevel <= loglevels.assert) {
			console.assert.apply(console, arguments);
		}
	}

}

const logify = new Logify();