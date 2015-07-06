/*
Schemas.torrent = new SimpleSchema({
  groupId: SchemaAutoFields.id('group'),
  createdAt: SchemaAutoFields.createdAt(),
  createdBy: SchemaAutoFields.createdBy(),
  leechType: SchemaAutoFields.leechType('torrent')
});

Schemas.torrentGroup = new SimpleSchema({
  type: {
    type: String,
    label: 'The group\'s type',
    allowedValues: function () {
      return [ 'Music', 'E-Book', 'Comic' ];
    },
    index: true
  },
  createdAt: SchemaAutoFields.createdAt(),
  createdBy: SchemaAutoFields.createdBy(),
  title: SchemaAutoFields.name('group', false),
  images: SchemaAutoFields.images('group'),
  description: SchemaAutoFields.description('group', true),
  tags: SchemaAutoFields.tags('group'),
  leechType: SchemaAutoFields.leechType('group'),
  collages: {
    type: [new SimpleSchema({
      id: SchemaAutoFields.id('collage'),
      name: SchemaAutoFields.name('collage', false)
    })],
    label: 'The collages that this group belongs to',
    optional: true
  },
  requests: {
    type: [new SimpleSchema({
      requests: SchemaAutoFields.id('request'),
      name: SchemaAutoFields.name('request', false)
    })],
    label: 'The requests that this group belongs to',
    optional: true
  },
  torrents: {
    type: [String],
    label: 'The ids of torrents in this group',
    optional: true
  },
  contents: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

Schemas.musicTorrent = new SimpleSchema({
  id: SchemaAutoFields.id('torrent'),
  format: {
    type: String,
    label: 'The torrent\'s format',
    allowedValues: function () {
      return [ 'MP3', 'FLAC' ];
    }
  },
  bitrate: {
    type: String,
    label: 'The torrent\'s bitrate',
    allowedValues: function () {
      return [ '320', 'V0' ];
    }
  }

});

Schemas.musicRelease = new SimpleSchema({
  id: SchemaAutoFields.id('release'),
  releaseTitle: SchemaAutoFields.name('release', true),
  releaseYear: SchemaAutoFields.year('release'),
  label: {
    type: new SimpleSchema({
      id: SchemaAutoFields.id('label'),
      name: SchemaAutoFields.name('label')
    }),
    label: 'The labels this group belongs to',
    index: true
  },
  torrents: {
    type: [Schemas.musicTorrent],
    label: 'The torrents under this release',
    index: true
  }
});

Schemas.musicEdition = new SimpleSchema({
  id: SchemaAutoFields.id('edition'),
  editionYear: SchemaAutoFields.year('edition'),
  editionName: SchemaAutoFields.name('edition', true),
  editionMedium: {
    type: String,
    label: 'The edition\'s medium',
    allowedValues: function () {
      return [ 'CD', 'Vinyl', 'WEB' ];
    }
  },
  releases: {
    type: [Schemas.musicRelease],
    label: 'The releases under this group'
  }
});

Schemas.music = new SimpleSchema({
  artists: {
    type: [new SimpleSchema({
      artistType: {
        type: String,
        label: 'The artist\'s type',
        allowedValues: function () {
          return [ 'Musician', 'Band', 'Composer' ];
        }
      },
      id: SchemaAutoFields.id('artist', false),
      name: SchemaAutoFields.name('artist'),
      createdAt: SchemaAutoFields.createdAt(),
      createdBy: SchemaAutoFields.createdBy()
    })],
    label: 'The artists that contributed to this music',
    index: true
  },
  releaseType: {
    type: String,
    label: 'The music\'s release type',
    allowedValues: function () {
      return [ 'Album', 'EP', 'Soundtrack' ];
    }
  },
  editions: {
    type: [Schemas.musicEdition],
    label: 'The editions in this group'
  }
});

Schemas.artist = new SimpleSchema({
  name: SchemaAutoFields.name('artist'),
  description: SchemaAutoFields.description('artist', true),
  images: SchemaAutoFields.images('artist'),
  createdAt: SchemaAutoFields.createdAt(),
  createdBy: SchemaAutoFields.createdBy(),
  groups: {
    type: [String],
    label: 'The groups this artist belongs to',
    optional: true,
    index: true
  }
});
*/
