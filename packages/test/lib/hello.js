import {Hello2, Test3} from 'meteor/meteor-gazelle:test2'

console.log('hello hit');

export const Hello = {
  test: () => {
    console.log(Test3);
    Hello2.test();
    console.log("hello world");
  }
};
