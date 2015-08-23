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

Package.on_use(function (api) {
  api.export('Ip');
  api.add_files('lib/ip.js', 'server');
});
