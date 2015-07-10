Schemas.userWarnings = new SimpleSchema({
  warnedBy: {
    type: Number,
    label: 'The user id which issued this warning',
    optional: true
  },
  warning: {
    type: String,
    label: 'The reason for the warning'
  },
  expireOn: {
    type: Date,
    label: 'The date when this warning should expire'
  },
  createdAt: {
    type: Date,
    label: 'When the warning was created',
    defaultValue: function () {
      return new Date(Math.abs(this.expireOn - new Date()));
    }
  }
});

Schemas.userClass = new SimpleSchema({
  title: (new SimpleSchemaFields('user class')).title(),
  shortTitle: (new SimpleSchemaFields('user class short title')).title(),
  secondary: {
    type: Boolean,
    label: 'Secondary user class',
    optional: true,
    defaultValue: false
  },
  roles: {
    type: [String],
    label: 'The roles this class carries'
  }
});

Schemas.userClassLite = new SimpleSchema([
  Schemas.userClass.pick([ 'title', 'shortTitle', 'secondary' ]), {
    classId: {
      type: String,
      label: 'The ID of the class'
    }
  }]);

Schemas.userStats = new SimpleSchema({
  uploaded: {
    type: Number,
    label: 'The number of bytes uploaded',
    defaultValue: 5000000
  },
  downloaded: {
    type: Number,
    label: 'The number of bytes downloaded',
    defaultValue: 0
  }
});

Schemas.userProfile = new SimpleSchema({
  title: {
    type: String,
    label: 'The profile title',
    optional: true
  },
  body: {
    type: String,
    label: 'The profile body',
    optional: true
  }
});

Schemas.user = new SimpleSchema({
  username: {
    type: String,
    label: 'The user\'s name',
    unique: true,
    index: true
  },
  enabled: {
    type: Boolean,
    label: 'The user\'s account status'
  },
  warned: {
    type: Boolean,
    label: 'Is the user warned',
    defaultValue: false
  },
  warnings: {
    type: [Schemas.userWarnings],
    label: 'The user\'s warnings',
    optional: true
  },
  stats: {
    type: Schemas.userStats,
    label: 'The user\'s stats'
  },
  customTitle: {
    type: String,
    label: 'The user\'s custom title',
    optional: true
  },
  profile: {
    type: Schemas.profile,
    label: 'The user\'s profile',
    optional: true
  },
  classes: {
    type: [Schemas.userClassLite],
    label: 'The user\'s classes',
    optional: true
  }
});

Schemas.newUser = new SimpleSchema({
  username: {
    type: String,
    label: 'The user\'s name'
  },
  password: {
    type: String,
    label: 'The user\'s password',
    min: 8
  },
  email: {
    type: String,
    label: 'The user\'s email'
  }
});
