import { Actions } from '../redux.js';

export const Register = React.createClass({
  handleSubmit (e) {
    e.preventDefault();

    //TODO(ajax) Validation

    var email = this.refs.email.value.trim();
    var username = this.refs.username.value.trim();
    var password = this.refs.password.value.trim();

    Redux.store.dispatch(Actions.registerUser(email, username, password));

  },
  render () {
    return (
      <form className="registerForm" onSubmit={ this.handleSubmit }>
        <input type="text" placeholder="Email" ref="email" />
        <input type="text" placeholder="Username" ref="username" />
        <input type="text" placeholder="Password" ref="password" />
        <input type="submit" value="Register" />
      </form>
      );
  }
});
