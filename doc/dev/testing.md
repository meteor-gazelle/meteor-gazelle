Testing
-------

Meteor-gazelle utilizes the [Mocha](http://mochajs.org/) framwork for unit tests. The tests must be under the tests/ subdirectory of the package. Be sure to update the package's package.js file to include `Package.onTest()`.

To run the tests, either do `./run_tests -t` or, if you prefer manual, `spacejam  --settings settings.json test-packages --driver-package practicalmeteor:mocha-console-reporter`.
