var siteName = Meteor.settings.public.site.name;

Meteor.startup(function () {
  document.title = siteName;
});

Template.registerHelper('siteName', function () {
  return siteName;
});
