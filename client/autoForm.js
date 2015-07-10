AutoForm.hooks({
  userEditForm: {
    docToForm: function (doc) {
      doc.userId = doc._id;
      return doc;
    },
    formToDoc: function (doc) {
      doc.classId = doc._id;
      return doc;
    }
  }
});
