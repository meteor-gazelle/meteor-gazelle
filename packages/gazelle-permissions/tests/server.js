SitePermissions.register({'forums': ['create', 'delete'], 'requests': ['create']});

Tinytest.add('SitePermissions - register', function (test) {
  SitePermissions.register({'requests': ['delete']});

  test.equal({
    'forums': ['create', 'delete'],
    'requests': ['create', 'delete']
  }, SitePermissions.registeredPermissions);
});


Tinytest.add('SitePermissions - permissionExists', function (test) {
  test.isTrue(SitePermissions.permissionExists('forums', 'create'));
  test.isFalse(SitePermissions.permissionExists('forums', 'edit'));
});
