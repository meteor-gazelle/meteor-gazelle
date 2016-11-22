import { Hooks } from 'meteor/meteor-gazelle:hooks';

describe('hooks', () => {

  const userId = '1';
  let counter = 0;

  it('Hooks.addCallback', () => {
    Hooks.addCallback('hook-one', ({ userId }) => {
      counter++;
    });

    Hooks.addCallback('hook-one', () => {
      counter++;
    });

    Hooks.addCallback('hook-two', () => {
      counter++;
    });

    assert.ok(Hooks._callbacks['hook-one']);
    assert.ok(Hooks._callbacks['hook-two']);
    assert.equal(Hooks._callbacks['hook-one'].length, 2);
  });

  it('Hooks.run', () => {
    Hooks.run('hook-one', { userId: userId });
    Hooks.run('hook-two', {});

    assert.equal(counter, 3);
  });
});
