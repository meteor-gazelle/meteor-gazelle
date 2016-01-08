Register = React.createClass({
  handleSubmit (e) {
    e.preventDefault();

    //TODO(ajax) Validation

    var email = this.refs.email.value.trim();
    var username = this.refs.username.value.trim();
    var password = this.refs.password.value.trim();

    //TODO(ajax) Gazelle's user creation process is more complicated than this it will need its own dedicated method.
    //TODO(ajax) Open ended question - Do we want to configure where the user is taken on registration and/or login?
    Accounts.createUser({
      email: email,
      username: username,
      password: password
    }, function (error) {
      if (error === undefined) {
        FlowRouter.go('/home');
      }
    });

  },
  render () {
    return (
      <form className="registerForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Email" ref="email"/>
        <input type="text" placeholder="Username" ref="username"/>
        <input type="text" placeholder="Password" ref="password"/>
        <input type="submit" value="Register"/>
      </form>
    );
  }
});
