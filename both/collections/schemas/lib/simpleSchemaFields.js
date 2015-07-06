/* global SimpleSchemaFields:true */

// objA is merged into objB, replacing duplicate keys.
function merge (obj2, obj1) {
  for (var k in obj2) {
    try {
      if (obj2[k].constructor === Object) {
        obj1[k] = merge(obj1[k], obj2[k]);
      } else {
        obj1[k] = obj2[k];
      }
    } catch (e) {
      obj1[k] = obj2[k];
    }
  }

  return obj1;
}

var formatLabel = function (identifier, label) {
  return 'The ' + (identifier ? identifier + '\'s ' : ' ') + label;
};

SimpleSchemaFields = function (identifier) {
  this.identifier = identifier;
};

SimpleSchemaFields.prototype.formatLabel = function (label) {
  return formatLabel(this.identifier, label);
};


SimpleSchemaFields.prototype.id = function (extra) {
  return merge(extra, {
    type: String,
    label: this.formatLabel('id'),
    index: true,
    unique: true,
    autoValue: function () {
      if (this.isInsert) {
        return Random.id();
      } else {
        this.unset();
      }
    }
  });
};

SimpleSchemaFields.prototype.foreignId = function (identifier, extra) {
  return merge(extra, {
    type: String,
    label: formatLabel(identifier, 'id'),
    index: true,
    unique: false,
    optional: false
  });
};

SimpleSchemaFields.prototype.title = function (extra) {
  return merge(extra, {
    type: String,
    label: this.formatLabel('title'),
    index: true
  });
};

SimpleSchemaFields.prototype.name = function (extra) {
  return merge(extra, this.title({
    label: this.formatLabel('name')
  }));

};

SimpleSchemaFields.prototype.createdAt = function (extra) {
  return merge(extra, {
    type: Date,
    label: this.formatLabel('created at timestamp'),
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      } else {
        this.unset();
      }
    }
  });
};

SimpleSchemaFields.prototype.updatedAt = function (extra) {
  return merge(extra, {
    type: Date,
    label: this.formatLabel('updated at timestamp'),
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  });
};

SimpleSchemaFields.prototype.createdBy = function (extra) {
  return merge(extra, {
    type: String,
    label: this.formatLabel('created by user id'),
    autoValue: function () {
      if (this.isInsert) {
        return this.userId;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: this.userId
        };
      } else {
        this.unset();
      }
    }
  });
};

SimpleSchemaFields.prototype.images = function (extra) {
  return merge(extra, {
    type: [new SimpleSchema({
      title: this.images({
        index: false
      }),
      url: {
        type: String,
        label: 'The url of the image'
      },
      createdAt: this.createdAt('image'),
      createdBy: this.createdBy('image')
    })],
    label: 'The images',
    optional: true
  });
};

SimpleSchemaFields.prototype.description = function (extra) {
  return merge(extra, {
    type: String,
    label: this.formatLabel('description'),
    optional: true
  });
};

SimpleSchemaFields.prototype.body = function (extra) {
  return merge(extra, this.description({
    label: this.formatLabel('body')
  }));
};

SimpleSchemaFields.prototype.tags = function (extra) {
  return merge(extra, {
    type: [new SimpleSchema({
      id: this.id('tag'),
      createdAt: this.createdAt('tag'),
      createdBy: this.createdBy('tag')
    })],
    label: this.formatLabel('tag'),
    optional: true
  });
};

SimpleSchemaFields.prototype.leechType = function (extra) {
  return merge(extra, {
    type: String,
    label: this.formatLabel('leech type'),
    defaultValue: function () {
      return 'Regular';
    },
    allowedValues: [ 'Regular', 'Free Leech', 'Neutral Leech' ]
  });
};

SimpleSchemaFields.year = function (extra) {
  return {
    type: Number,
    label: 'The ' + (entity ? entity + '\s ' : ' ') + 'year',
    optional: false
  };
};

