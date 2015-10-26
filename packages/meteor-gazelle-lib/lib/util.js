Util = {
  getId: function (doc) {
    var id = undefined;
    if ('object' === typeof doc) {
      id = doc._id;
    } else if ('string' === typeof doc) {
      id = doc;
    }
    return id;
  }
};
