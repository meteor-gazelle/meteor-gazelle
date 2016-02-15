# meteor-gazelle:accounts

This package provides base accounts functionality, such as registering a user, logging in as a user, etc.

### Modules

#### Client
* Actions
  * `Actions.loginUser(username, password)` - Log a user in
  * `Actions.registerUser(email, username, password)` - Register a user
  * `Actions.logoutUser()` - Logout the currently logged in user
* Components
  * Login - Render the login page

### Routes
* `/login` - The login page
* `/register` - The registration page
