Template.registerHelper('siteName', function () {
  return Meteor.settings.public.site.name;
});
