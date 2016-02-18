import './methods.js';
import { Hooks } from 'meteor/meteor-gazelle:hooks';

Hooks.addCallback('userRegistered', ({ userId }) => console.log(userId));
