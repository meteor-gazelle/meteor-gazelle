App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const isLoggedIn = !!Meteor.userId();
    const isPublic = FlowRouter.current().route.group === Router.public;
    let view = null;
    if (!isLoggedIn && isPublic) {
      view = <PublicView yield={this.props.yield}/>;
    } else if (!isLoggedIn && !isPublic) {
      view = <PublicView yield={<Login />}/>;
    } else if (isLoggedIn && isPublic) {
      FlowRouter.go('/');
      view = <AuthenticatedView yield={<Home />}/>;
    } else if (isLoggedIn && !isPublic) {
      view = <AuthenticatedView yield={this.props.yield}/>;
    }
    return {
      view: view,
      isLoggingIn: Meteor.loggingIn()
    };
  },
  loading()
  {
    return <div className="loading"></div>;
  },
  render()
  {
    return <div className="app-root">
      <div className="container">
        {this.data.isLoggingIn ? this.loading() : this.data.view}
      </div>
    </div>;
  }
});
