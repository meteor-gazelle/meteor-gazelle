Tinytest.add('Announcement/create', function (test) {
  var announcement = new Announcement();
  announcement.save();
  // test default values
  test.equal(announcement.get('title'), 'New announcement title');
  test.equal(announcement.get('body'), 'New announcement body');
  // make sure this has an ID and timestamps
  test.isTrue(announcement.get('_id'));
  test.isTrue(announcement.get('createdAt') instanceof Date);
  // updated_at isn't set on instance creation
  // TODO fix this https://github.com/jagi/meteor-astronomy-timestamp-behavior/issues/1
  // test.isTrue(announcement.updatedAt);
});

Tinytest.add('Announcement/create with values', function (test) {
  var title = 'meteor-gazelle is live!';
  var body = 'freeleech for everyone!';
  var announcement = new Announcement({
    title: title,
    body: body
  });
  announcement.save();
  // test default values
  test.equal(announcement.get('title'), title);
  test.equal(announcement.get('body'), body);
});
