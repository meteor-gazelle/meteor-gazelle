Javascript Coding Standards
===========================

Code should adhere to the [Official Meteor Style Guide](https://github.com/meteor/meteor/wiki/Meteor-Style-Guide). Please familiarize yourself with these standards.

Code should be written in ECMAScript 5. Please do not use harmony features.


Linting
-------

Use [ESLint](http://eslint.org/). We are using the rules from the [Meteor code with Style](https://github.com/yauh/meteor-with-style) package to enforce the code styles.

To install ESLint, simply run `npm install eslint -g`.

To run ESLint on the project, run `eslint .`. All code style issues will be displayed.


### WebStorm ###

ESLint plays with [WebStorm](https://www.jetbrains.com/webstorm/) quite nicely. To configure WebStorm to use ESLint, complete the following steps:

1. Open your Gazelle project
2. Goto "File" > "Settings".
3. Navigate to "Languages & Frameworks" > "JavaScript" > "Code Quality Tools"
4. Navigate to JSLint, JSHint, ClosureLinter, & JSCS. Ensure that the "Enable" checkbox is *unchecked*.
5. Navigate to ESLint. Check the "Enable" checkbox.
    * Set the "Node Interpreter" to your node executable. (i.e. `/usr/bin/node`)
    * Set the "ESLint Package" to the location of the global ESLint package (i.e. `/usr/lib/node_modules/eslint`)
    * Set the "Configuration file" to "Search for .eslintrc".


### Sublime Text Editor ###

If you prefer to use [Sublime Text Editor](http://www.sublimetext.com/3) instead, you can configure it to use ESLint as well.

1. If you haven't done so already, install [Package Control](https://packagecontrol.io/installation). Follow the instructions for your version of Sublime.
2. Install [Sublime Linter](http://sublimelinter.readthedocs.org/en/latest/installation.html).
3. Install [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint).

Auto-formatting
---------------

A certain amount of code-style errors can be auto-resolved using [esformatter](https://github.com/millermedeiros/esformatter).

To install esformatter, run `npm install esformatter -g`.

To auto-format a single file, run `esformatter -i myfile.js`.

Globbing is supported (i.e. `esformatter -i '*.js'`), but be careful that you don't auto-format the `.meteor` or other third-party libraries.
