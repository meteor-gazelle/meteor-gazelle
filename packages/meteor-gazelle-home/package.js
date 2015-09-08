Package.describe({
  name: 'meteor-gazelle:home',
  version: '0.0.1',
  summary: 'The home page of meteor-gazelle.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'meteor-gazelle:core@0.0.1'
  ];

  api.use(packages);

  api.imply(packages);

});

Package.onTest(function (api) {
});
