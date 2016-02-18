//TODO (ajax) Allow callbacks to be ran asynchronously
export const Hooks = {
  _callbacks: {},
  addCallback (hook, callback) {
    check(hook, String);
    check(callback, Function);
    // If a hook doesn't exist, create it
    if (!Hooks._callbacks.hasOwnProperty(hook)) {
      Hooks._callbacks[hook] = [];
    }
    // Add the callback
    Hooks._callbacks[hook].push(callback);
  },
  run (hook, params) {
    check(hook, String);
    check(params, Object);
    // Run callbacks
    if (Hooks._callbacks.hasOwnProperty(hook)) {
      const callbacks = Hooks._callbacks[hook];
      callbacks.forEach(value => value(params));
    }
  }
};
