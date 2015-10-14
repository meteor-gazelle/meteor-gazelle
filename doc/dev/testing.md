Testing
-------

Meteor-gazelle utilizes the [Velocity](https://velocity.readme.io/docs/getting-started) testing framework with [Jasmine](http://jasmine.github.io/) for both its client and server tests. These tests are realtime "reactive" tests, which means tests are supposed to rerun whenever you save a change. Annoyingly, this is broken for server integration tests.

To run all package tests using the native Meteor test runner, `VELOCITY_TEST_PACKAGES=1 meteor test-packages --driver-package velocity:html-reporter ./packages/*` is a currently functional, though annoyingly slow, way to run all tests.
Alternatively, if you have the [Velocity CLI tool](https://www.npmjs.com/package/velocity-cli) installed `velocity test-package ./packages/* --settings settings.json`, will also run all tests.

Also double-check your [testing nomenclature](http://www.meteortesting.com/chapter/velocity) when writing tests, because meteor's test infrastructure is fairly granular.

You may also come across a necessity to debug your tests, in such cases [node-inspector](https://www.npmjs.com/package/node-inspector) is needed. Simply place a `debugger;` statement on the line of test code you wish to suspend execution for and run the following command if you have the Velocity CLI tool `velocity test-package [package-to-test] --settings settings.json --debug-port 5858` or `VELOCITY_TEST_PACKAGES=1 meteor test-packages --driver-package velocity:html-reporter ./packages/* --debug-port 5858` to use the Meteor CLI tool.
