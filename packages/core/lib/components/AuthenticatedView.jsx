import { Header } from 'meteor/meteor-gazelle:header';
import { Footer } from 'meteor/meteor-gazelle:footer';

export const AuthenticatedView = React.createClass({
  render () {
    // What the user sees when logged in
    return (
      <div className='main-container'>
        <Header />
        <div className='main-content'>
          { this.props.yield }
        </div>
        <Footer />
      </div>
      );
  }
});
