/*CollectionBehaviours.defineBehaviour('createdBy', function () {
  var self = this;
  self.before.insert(function (userId, doc) {
    doc.createdBy = userId;
  });
  self.before.update(function (userId, doc, fieldNames, modifier) {
    if (!modifier.$set) {
      modifier.$set = {};
    }
    modifier.$set.lastUpdatedBy = userId;
  });
});
*/
