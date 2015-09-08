Package.describe({
  name: 'meteor-gazelle:footer',
  version: '0.0.1',
  summary: 'The site footer.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'meteor-gazelle:lib@0.0.1',
    'momentjs:moment@2.10.6'
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/client/footer/footer.html',
    'lib/client/footer/footer.js'
  ], ['client']);

});

Package.onTest(function (api) {
});
