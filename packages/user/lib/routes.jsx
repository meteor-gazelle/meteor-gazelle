import { UserProfile } from './components/UserProfile.jsx';

export default (() => {
  Router.private.user = Router.private.group({
    name: 'user'
  });

  Router.private.user.route('/user/:userId', {
    name: 'profile',
    action(params, queryParams) {
      ReactLayout.render(App, {
        yield: <UserProfile userId={params.userId} />
      });
    }
  });

})();
