const siteName = Meteor.settings.public.site.name; // TODO: Move to utility

Footer = React.createClass({

  getInitialState () {
    return {
      // Putting date here so that the date in the footer doesn't update
      // every time its re-rendered
      now: moment()
    };
  },

  render () {
    const { now } = this.state;
    const year = now.format('YYYY');
    const date = now.format('MMM D YYYY, HH:mm');

    return (
      <footer className='main-footer' role='contentinfo'>
        <div className='main-footer__title'>
          {siteName}
        </div>

        <Components.Nav maxDepth={1} />

        <div className='main-footer__copyright'>
          Site &amp; Design © {year} Gazelle
        </div>

        <div className='main-footer__activity'>
          Last Activity: XXXX
        </div>

        <dl className='main-footer__stats'>
          <dt className='main-footer__stats__label'>Time</dt>
          <dd className='main-footer__stats__value'>XXXX</dd>

          <dt className='main-footer__stats__label'>Used</dt>
          <dd className='main-footer__stats__value'>XXXX</dd>

          <dt className='main-footer__stats__label'>Load</dt>
          <dd className='main-footer__stats__value'>XXXX</dd>

          <dt className='main-footer__stats__label'>Date</dt>
          <dd className='main-footer__stats__value'>{date}</dd>

          <dt className='main-footer__stats__label'>Rev</dt>
          <dd className='main-footer__stats__value'>XXXX</dd>
        </dl>
      </footer>
    );
  }

});
