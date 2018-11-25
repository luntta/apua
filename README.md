# Apua
Useful helper functions to make developing web apps a bit easier. Includes logging tools (with log levels, so don't worry about them showing in prod environment) and much more!

## Usage
Place the `apua.js` in your document's `<head>` tag or just before the ending `</body>` tag before any other script files, that use *apuaJS*.
```HTML
<script type="text/javascript" src="/path/to/apua.js"></script>
```
### Log
`apua.log()` shows up as a regular log/debug line in browser console. Logs require `logLevel: 1` for them to show up.
```JavaScript
apua.log("I show up in browser console as a regular log!");
```
### Todo
`apua.todo()` is a basic log/debug line in browser console with a little *TODO* string before the given message. Todos require `logLevel: 2` or lower for them to show up.
```JavaScript
apua.todo("I show up in browser console as a regular log with TODO text in front of me!");
```
### Security
`apua.security()` messages show as a warning in browser console with *SECURITY* text before them. Security messages require `logLevel: 3` or lower to show up.
```JavaScript
apua.security("I show up in browser console as a warning with SECURITY text in front of me!");
```
### Warn
`apua.warn()` messages show as a warning in browser console with *WARNING* text before them. Warnings require `logLevel: 4` or lower to show up.
```JavaScript
apua.warn("I show up in browser console as a warning with WARNING text in front of me!");
```
### Error
`apua.error()` messages show as an error in browser console with *ERROR* text before them. Errors require `logLevel: 5` or lower to show up.
```JavaScript
apua.error("I show up in browser console as an error with ERROR text in front of me!");
```
### Bug
`apua.bug()` messages show as an error in browser console with *BUG* text before them. Bugs require `logLevel: 6` or lower to show up.
```JavaScript
apua.bug("I show up in browser console as an error with BUG text in front of me!");
```
### Fatal
`apua.fatal()` messages show as an error in browser console with *FATAL* text before them. Fatal errors require `logLevel: 7` or lower to show up.
```JavaScript
apua.fatal("I show up in browser console as an error with ERROR text in front of me!");
```
### Assert
`apua.assert(condition, message, openDebugger)` are used to make sure a condition given to them returns true. You can specify a condition, an error message and whether or not you want it to open the browser debugger before continuing executing the code block or just straight up terminating processing the code. `apua.assert` needs `devMode: true` to execute.
#### Example of using `apua.assert` to open the browser debugger
```JavaScript
apua.assert(foo == bar, "Foo does not equal bar", true);
```
#### Example of not using the debugger
```JavaScript
apua.assert(1 == 2, "1 does not equal 2!");
```

## Custom init
You can make a custom init of *Apua* by introducing a new variable that uses it or by overriding the default `apua` variable.
### Example of a custom init
```JavaScript
var apua = new apua({
    devMode: false,
    logLevel: 4
});
```
