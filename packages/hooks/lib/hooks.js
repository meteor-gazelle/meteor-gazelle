//TODO (ajax) Allow callbacks to be ran asynchronously
export const Hooks = {
  _callbacks: {},
  addCallback (hook, callback) {
    check(hook, String);
    check(callback, Function);
    if (!Hooks._callbacks.hasOwnProperty(hook)) {
      Hooks._callbacks[hook] = [];
    }
    Hooks._callbacks[hook].push(callback);
  },
  run (hook, params) {
    check(hook, String);
    check(params, Object);
    if (Hooks._callbacks.hasOwnProperty(hook)) {
      const callbacks = Hooks._callbacks[hook];
      callbacks.forEach(value => value(params));
    }
  }
};
