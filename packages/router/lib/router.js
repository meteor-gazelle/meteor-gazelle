const Router = {
  public: FlowRouter.group({
    name: 'public'
  }),
  private: FlowRouter.group({
    name: 'private'
  })
};

export { FlowRouter, Router }
