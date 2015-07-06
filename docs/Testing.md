Testing
-------

Meteor has realtime "reactive" tests. This means things tests are supposed to rerun whenever you save a change. Annoyingly, this is broken for server integration tests. Working on it, but basically `meteor --test` is a currently functional, though annoyingly slow, way to run all tests.

Also double-check your [testing nomenclature](http://www.meteortesting.com/chapter/velocity) when writing tests, because meteor's test infrastructure is fairly granular.