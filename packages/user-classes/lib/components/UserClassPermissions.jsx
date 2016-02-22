import { Permissions } from 'meteor/meteor-gazelle:permissions';

export const UserClassPermissions = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    classPermissions: React.PropTypes.arrayOf(React.PropTypes.string),
    handlePermissionChange: React.PropTypes.func.isRequired,
  },

  getMeteorData () {
    const handle = Meteor.subscribe('permissions');

    return {
      isReady: handle.ready(),
      permissions: Permissions.find().fetch()
    };
  },

  classPermissionsForm () {
    return (
      <div>
        { this.data.permissions.map(value => {
          return this.permissionGroup(value);
          })}
      </div>
    );
  },

  permissionGroup (group) {
    return (
      <div key = { group._id }>
        Group title: { group.title }
        <br />
        Group description: { group.description }
        { this.permissions(group.title, group.permissions) }
      </div>
    );
  },

  permissions (groupTitle, permissions) {
    return permissions.map(permission => {
      //TODO(ajax) Use function to denormalize group and permission titles
      const id = groupTitle + ':' + permission.title;
      const isChecked = this.props.classPermissions.includes(id);

      return (
        <div key={ permission.title }>
          Permission title: { permission.title }
          <br />
          Permission description: { permission.title }
          <br />
          Enabled: <input id = { id } type="checkbox" checked = { isChecked } onChange = { this.props.handlePermissionChange }/>
        </div>
      );
    });
  },

  render () {
    return (
      <div>
        {this.data.isReady ? this.classPermissionsForm() : null }
      </div>
    );
  }
});
