import { UserClass } from '../userClass.js';
import { UserClassList } from './UserClassList.jsx';

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

  render () {
    return (
      <div>
        { this.data.isReady ? this.content() : this.loading() }
      </div>
    );
  }

});
