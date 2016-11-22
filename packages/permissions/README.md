# meteor-gazelle:permissions

This package provides a permissions system.

### Modules

### Server
* PermissionGroup
* Permissions
  * `register(permissionGroup)` - Registers a permission group
### Common
* Permissions - A collection of registered permissions
  * `hasEnabledPermission(userId, group, permission)` - Check if a user has a permission enabled
  * `hasDisabledPermission(userId, group, permission)` - Check if a user has a permission disabled
  * `exists(permission)` - Check if a permission exists. Argument follows this format `'group:permission'`.
  
* Methods
  * `addEnabledPermission(userId, group, permission)` - Add a permission to a user
  * `removeEnabledPermission(userId, group, permission)` - Remove a permission from a user
  * `addDisabledPermission(userId, group, permission)` - Disable a user's permission
  * `removeDisabledPermission(userId, group, permission)` - Remove a disabled permission from a user
