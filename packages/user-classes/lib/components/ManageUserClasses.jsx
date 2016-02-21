import { UserClass } from '../userClass.js';
import { UserClassList } from './UserClassList.jsx';
import { ManageUserClass } from './ManageUserClass.jsx';

//TODO(ajax) Add permission check
export const ManageUserClasses = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData () {
    const handle = Meteor.subscribe('manage-user-classes');
    return {
      isReady: handle.ready(),
      userClasses: UserClass.find().fetch()
    };
  },

  //TODO(ajax) Think about how to handle loading and errors throughout app.
  loading () {
    return 'Loading...';
  },

  content () {
    return this.data.userClasses ? <UserClassList userClasses = { this.data.userClasses } /> : 'No user classes have been created.';
  },

  //TODO(ajax) Consider creating a React 'Link' component which receives a flow router path
  render () {
    return (
      <div>
        { this.data.isReady ? this.content() : this.loading() }
        <ManageUserClass mode="create" />
      </div>
    );
  }

});
