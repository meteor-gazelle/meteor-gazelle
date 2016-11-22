import { AuthenticatedView } from './AuthenticatedView.jsx';
import { PublicView } from './PublicView.jsx';
import { Components as AccountsComponents }
  from 'meteor/meteor-gazelle:accounts';
import { Components as HomeComponents } from 'meteor/meteor-gazelle:home';
import { FlowRouter } from 'meteor/meteor-gazelle:router';

export const App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData () {
    return {
      // Determines which view to render based on route and logged in user.
      // Reruns whenever user signs in or not.
      view: (() => {
        const isLoggedIn = !!Meteor.userId();
        // A route is public if it is part of the Router.public group.
        const isPublic = FlowRouter.current().route.group === Router.public;
        let view = null;
        // Not logged in, public route - Render requested view.
        if (!isLoggedIn && isPublic) {
          view = <PublicView yield={ this.props.yield }/>;
        }
        // Not logged in, not public route - Render the login form.
        else if (!isLoggedIn && !isPublic) {
          view = <PublicView yield={ <AccountsComponents.Login /> }/>;
        }
        // Logged in, public route - Adjust url and render the home page.
        else if (isLoggedIn && isPublic) {
          FlowRouter.go('/');
          view = <AuthenticatedView yield={ <HomeComponents.Home /> }/>;
        }
        // Logged in, not public route - Render requested view.
        else if (isLoggedIn && !isPublic) {
          view = <AuthenticatedView yield={ this.props.yield }/>;
        }
        return view;
      })(),
      isLoggingIn: Meteor.loggingIn()
    };
  },
  //TODO(ajax) Create Loading component
  loading () {
    return <div className="loading"></div>;
  },
  render () {
    // Render the data
    return <div className="app-root">
      <div className="container">
        { this.data.isLoggingIn ? this.loading() : this.data.view }
      </div>
    </div>;
  }
});
