import { chai, assert } from 'meteor/practicalmeteor:chai';
import { Hello } from '../lib/client.js';


describe('todos', () => {
  it('builds correctly from factory', () => {
    assert.equal(Hello.test(), 'test');
  });

  it('leaves createdAt on update', () => {
    assert.equal('', '');
  });
});
