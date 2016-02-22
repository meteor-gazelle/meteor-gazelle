import { UserClass } from '../userClass.js';
import { UserClassPermissions } from './UserClassPermissions.jsx';
import { Actions } from '../redux.js';

export const ManageUserClass = React.createClass({
  propTypes: {
    mode: React.PropTypes.oneOf(['create', 'edit']).isRequired,
    userClass: React.PropTypes.object,
  },

  getInitialState () {
    return this.props.userClass ? this.props.userClass : {
      title: '',
      shortTitle: '',
      description: '',
      permissions: [],
      isDefaultClass: false,
      level: 0,
      sort: 0
    };

    return state;
  },

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.mode === 'create') {
      Redux.store.dispatch(Actions.createClass(this.state));
      this.replaceState(this.getInitialState());
    } else if (this.props.mode === 'edit') {
      Redux.store.dispatch(Actions.updateClass(this.state));
    }
  },

  handleRemove(e) {
    Redux.store.dispatch(Actions.removeClass(this.props.userClass._id));
  },

  handleChange(e) {
    const nextState = {};
    if (e.target.type === 'checkbox') {
      nextState[e.target.name] = e.target.checked;
    } else {
      nextState[e.target.name] = e.target.value;
    }

    this.setState(nextState);
  },

  handlePermissionChange(e) {
    const target = e.target;
    if (target.checked) {
      const permissions = this.state.permissions;
      permissions.push(target.id);
      this.setState({permissions: permissions});
    } else {
      const index = this.state.permissions.indexOf(target.id);
      const permissions = this.state.permissions;
      permissions.splice(index, 1);
      this.setState({permissions: permissions});
    }
  },

  render() {
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange}/>
          <input type="text" name="shortTitle" placeholder="Short Title" value={this.state.shortTitle}
                 onChange={this.handleChange}/>
          <input type="text" name="description" placeholder="Description" value={this.state.description}
                 onChange={this.handleChange}/>
          Default class: <input type="checkbox" name="isDefaultClass" checked={this.state.isDefaultClass}
                                onChange={this.handleChange}/>
          Level: <input type="number" name="level" min="0" value={this.state.level}
                        onChange={this.handleChange}/>
          Sort: <input type="number" name="sort" min="0" value={this.state.sort}
                       onChange={this.handleChange}/>
          <input type="submit" value={ this.props.mode === 'create' ? 'Save class' : 'Update class' }/>
        </form>
        { this.props.mode === 'edit' ? <button onClick={this.handleRemove}>Remove class</button> : null }
        <UserClassPermissions handlePermissionChange={this.handlePermissionChange }
                              classPermissions={this.state.permissions}/>
      </div>
    );
  }
});
