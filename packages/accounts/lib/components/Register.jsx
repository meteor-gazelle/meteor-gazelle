import { Methods } from '../methods.js';

export const Register = React.createClass({
  handleSubmit (e) {
    e.preventDefault();

    //TODO(ajax) Validation

    var email = this.refs.email.value.trim();
    var username = this.refs.username.value.trim();
    var password = this.refs.password.value.trim();

    // Register the user
    Methods.registerUser.call({
      email: email,
      username: username,
      password: password
    }, (err) => {
      if (!err) {
        FlowRouter.go('/home');
      }
    });

  },
  render () {
    // Render registration form
    return (
      <form className="registerForm" onSubmit={ this.handleSubmit }>
        <input type="text" placeholder="Email" ref="email"/>
        <input type="text" placeholder="Username" ref="username"/>
        <input type="text" placeholder="Password" ref="password"/>
        <input type="submit" value="Register"/>
      </form>
    );
  }
});
