export const Util = {
  getId (doc) {
    var id = undefined;
    if ('object' === typeof doc) {
      id = doc._id;
    } else if ('string' === typeof doc) {
      id = doc;
    }
    return id;
  },
  getSiteName () {
    return Meteor.settings.public.site.name;
  },
  idValidator (id) {
    return () => check(id, String);
  },
  updateValidator (schema) {
    return new SimpleSchema([new SimpleSchema({
      '_id': {
        type: String
      }
    }), schema]).validator();
  }
};

