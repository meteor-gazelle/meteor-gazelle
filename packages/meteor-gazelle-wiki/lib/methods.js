Wiki = {};

Meteor.methods({
  'wiki/createArticle': function (doc) {
    var article = new Article();
    article.set('title', doc.title);
    article.set('body', doc.content);
    article.set('createdBy', this.userId);
    article.set('locked', false);
    article.save();
  },
  'wiki/lockArticle': function (article) {

  },
  'wiki/unlockArticle': function (article) {

  }
});