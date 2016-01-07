//TODO(ajax) Should this be in the core package or be moved to the lib package?
//TODO(ajax) Get route titles from flowrouter rather than hardcoding here
const publicRoutes = ['login', 'register', 'welcome'];

Components.App = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
      var that = this;
      if (Meteor.userId()) {
        console.log("changed");
      }
      return {
        loggingIn: Meteor.loggingIn(),
        hasUser: !!Meteor.user(),
        isPublic(route) {
          return publicRoutes.indexOf(route) > -1;
        },
        getView() {
          let route = FlowRouter.current().route.name;
          let isLoggedIn = !!Meteor.user();
          let isPublicRoute = this.isPublic(route);
          let view = null;
          if (!isPublicRoute && isLoggedIn) {
            view = <AuthenticatedView yield={that.props.yield }/>;
          } else if (isPublicRoute && isLoggedIn) {
            // Redirect them home
            FlowRouter.go('/home');
            //view = <AuthenticatedView yield={<Components.Home />}/>;
          } else if (isPublicRoute && !isLoggedIn) {
            view = <PublicView yield={that.props.yield }/>;
          } else if (!isPublicRoute && !isLoggedIn) {
            view = <PublicView yield={<Components.Login />}/>;
          }
          return view;
        }
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
          {this.data.loggingIn ? this.loading() : this.data.getView()}
        </div>
      </div>;
    }
  }
);
