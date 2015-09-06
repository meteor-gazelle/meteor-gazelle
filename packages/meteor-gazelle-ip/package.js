Package.describe({
  name: 'meteor-gazelle:ip',
  version: '0.3.3',
  summary: 'Provides IP utilities.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Npm.depends({
  ip: '0.3.3'
});

Package.onUse(function (api) {
  api.export('Ip');
  api.addFiles('lib/ip.js', 'server');
});
