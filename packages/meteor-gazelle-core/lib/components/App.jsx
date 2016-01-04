//TODO(ajax) Should this be in the core package or be moved to the lib package?
const publicRoutes = ['login', 'register', 'welcome'];

Components.App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      loggingIn: Meteor.loggingIn(),
      hasUser: !!Meteor.user(),
      isPublic(route) {
        return publicRoutes.indexOf(route) > -1;
      },
      canView() {
        return this.isPublic(FlowRouter.current().route.name) || !!Meteor.user();
      }
    };
  },
  loading() {
    return <div className="loading"></div>;
  },
  getView() {
    return this.data.canView() ? <AuthenticatedView yield={this.props.yield}/> : <Components.Login />;
  },
  render() {
    return <div className="app-root">
      <div className="container">
        {this.data.loggingIn ? this.loading() : this.getView()}
      </div>
    </div>;
  }
});
