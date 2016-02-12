import { Header } from 'meteor/meteor-gazelle:header';
import { Footer } from 'meteor/meteor-gazelle:footer';

export const AuthenticatedView = React.createClass({
  render () {
    return (
      <div className='main-container'>
        <div className='main-content'>
          { this.props.yield }
        </div>
        <Footer />
      </div>
      );
  }
});
