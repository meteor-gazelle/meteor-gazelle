Gazelle.siteName = Meteor.settings.public.site.name;

if (Meteor.isClient) {
  Template.registerHelper('siteName', function () {
    return Gazelle.siteName;
  });
}
