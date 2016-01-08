Package.describe({
  name: 'meteor-gazelle:footer',
  version: '0.0.1',
  summary: 'This package loads the footer',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'momentjs:moment@2.10.6',
    'meteor-gazelle:lib@0.0.1',
    'meteor-gazelle:header@0.0.1'
  ];

  api.use(packages);
  api.addFiles([
    'lib/components/Footer.jsx'
  ]);

  api.export('Footer');

});
