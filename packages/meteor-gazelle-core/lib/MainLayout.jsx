MainLayout = React.createClass({
  render() {
    return (
      <div>
        main layout
      </div>
    );

  }
});

Gazelle.Components.MainLayout = MainLayout;


FlowRouter.route('/', {
  name: 'home',
  action: function (params, queryParams) {
    ReactLayout.render(Gazelle.Components.MainLayout);
  }
});
