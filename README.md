# LogifyJS
Make client side debugging a bit easier and don't worry about showing debugs in production.

## Usage
Place the `logify.js` in your document's `<head>` tag before any other script files, that use *LogifyJS*.
```HTML
<script type="text/javascript" src="/path/to/logify.js"></script>
```
### Log
`logify.log()` shows up as a regular log/debug line in browser console. Logs require `logLevel: 1` for them to show up.
#### Example
```JS
logify.log("I show up in browser console as a regular log!");
```
### Todo
`logify.todo()` is a basic log/debug line in browser console with a little *TODO* string before the given message. Todos require `logLevel: 2` or lower for them to show up.
#### Example
```JS
logify.todo("I show up in browser console as a regular log with TODO text in front of me!");
```
### Security
`logify.security()` messages show as a warning in browser console with *SECURITY* text before them. Security messages require `logLevel: 3` or lower to show up.
#### Example
```JS
logify.security("I show up in browser console as a warning with SECURITY text in front of me!");
```
### Warn
`logify.warn()` messages show as a warning in browser console with *WARNING* text before them. Warnings require `logLevel: 4` or lower to show up.
#### Example
```JS
logify.warn("I show up in browser console as a warning with WARNING text in front of me!");
```
### Error
`logify.error()` messages show as an error in browser console with *ERROR* text before them. Errors require `logLevel: 5` or lower to show up.
#### Example
```JS
logify.error("I show up in browser console as an error with ERROR text in front of me!");
```
### Bug
`logify.bug()` messages show as an error in browser console with *BUG* text before them. Bugs require `logLevel: 6` or lower to show up.
#### Example
```JS
logify.bug("I show up in browser console as an error with BUG text in front of me!");
```
### Fatal
`logify.fatal()` messages show as an error in browser console with *FATAL* text before them. Fatal errors require `logLevel: 7` or lower to show up.
#### Example
```JS
logify.fatal("I show up in browser console as an error with ERROR text in front of me!");
```
### Assert
`logify.assert(condition, message, openDebugger)` are used to make sure a condition given to them returns true. You can specify a condition, an error message and whether or not you want it to open the browser debugger before continuing executing the code block or just straight up terminating processing the code. `logify.assert` needs `devMode: true` to execute.
#### Example of using `logify.assert` to open the browser debugger
```JS
logify.assert(foo == bar, "Foo does not equal bar", true);
```
#### Example of not using the debugger
```JS
logify.assert(1 == 2, "1 does not equal 2!");
```

## Custom init
You can make a custom init of *LogifyJS* by introducing a new variable that uses it or by overriding the default `logify` variable.
### Example of a custom init
```JS
var logify = new Logify({
    devMode: false,
    logLevel: 4
});
```
