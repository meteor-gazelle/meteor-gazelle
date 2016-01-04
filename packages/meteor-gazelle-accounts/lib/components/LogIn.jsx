Components.Login = React.createClass({
  handleSubmit(e) {
    e.preventDefault();

    //TODO(ajax) Validation

    var username = this.refs.username.value.trim();
    var password = this.refs.password.value.trim();

    //TODO(ajax) Meteor lets users login with username or email. Gazelle only allows username. Need to prevent email login.
    Meteor.loginWithPassword(username, password, function (error) {
      if (error === undefined) {
        FlowRouter.go('/home');
      }
    })
  },
  render() {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Username" ref="username"/>
        <input type="text" placeholder="Password" ref="password"/>
        <input type="submit" value="Login"/>
      </form>
    );
  }
});
