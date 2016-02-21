import { UserClass } from '../userClass.js';
import { Actions } from '../redux.js';

export const ManageUserClass = React.createClass({
  propTypes: {
    mode: React.PropTypes.oneOf(['create', 'edit']).isRequired,
    userClass: React.PropTypes.object,
  },

  getInitialState () {
    const state = {
      title: '',
      shortTitle: '',
      description: ''
    };

    if (this.props.userClass) {
      state.title = this.props.userClass.title;
      state.shortTitle = this.props.userClass.shortTitle;
      state.description = this.props.userClass.description;
    }

    return state;
  },

  handleSubmit (e) {
    e.preventDefault();

    const title = this.state.title;
    const shortTitle = this.state.shortTitle;
    const description = this.state.description;

    if (this.props.mode === 'create') {
      Redux.store.dispatch(Actions.createClass({title, shortTitle, description}));
    } else if (this.props.mode === 'edit') {
      const _id = this.props.userClass._id;
      Redux.store.dispatch(Actions.updateClass({_id, title, shortTitle, description}));
    }
  },

  handleChange (e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  },

  form () {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange}/>
        <input type="text" name="shortTitle" placeholder="Short Title" value={this.state.shortTitle} onChange={this.handleChange}/>
        <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange}/>
        <input type="submit" value={ this.props.mode === 'create' ? 'Save class' : 'Update class' }/>
      </form>
    );
  },

  render () {
    return (
      <div>
        { this.props.mode === 'edit' ? this.form() : this.form() }
      </div>
    );
  }
});
