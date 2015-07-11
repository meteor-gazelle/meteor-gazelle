AutoForm.hooks({
  userEditForm: {
    formToDoc: function (doc) {
      doc.userId = Router.current().params.id;
      return doc;
    }
  }
});
