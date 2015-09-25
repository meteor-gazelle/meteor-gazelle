Behaviors = {};

Behaviors.createdAt = function (collection, fieldname) {
  collection.before.insert(function (userId, doc) {
    doc[fieldname] = new Date();
  });
};

Behaviors.updatedAt = function (collection, fieldname) {
  collection.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set[fieldname] = new Date();
  });
};

Behaviors.updateAtHistory = function (collection, fieldname) {
  collection.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};

    if (doc[fieldname] === undefined || doc[fieldname] == null) {
      modifier.$set[fieldname] = [new Date()];
    } else {
      doc[fieldname].push(new Date());
      modifier.$set[fieldname] = doc[fieldname];
    }
  });
};

Behaviors.createdBy = function (collection, fieldname) {
  collection.before.insert(function (userId, doc) {
    doc[fieldname] = userId;
  });
};

Behaviors.updatedBy = function (collection, fieldname) {
  collection.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set[fieldname] = userId;
  });
};

Behaviors.updateByHistory = function (collection, fieldname) {
  collection.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};

    if (doc[fieldname] === undefined || doc[fieldname] == null) {
      modifier.$set[fieldname] = [userId];
    } else {
      doc[fieldname].push(userId);
      modifier.$set[fieldname] = doc[fieldname];
    }
  });
};
