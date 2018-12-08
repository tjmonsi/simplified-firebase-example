'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('@littleq/core-lite');
var firebase = _interopDefault(require('firebase'));

const config = {
  apiKey: 'AIzaSyApOY0BhvtPyxJXmfyd3P30ydeXu4JCiMA',
  authDomain: 'fir-extended-summit-ph.firebaseapp.com',
  databaseURL: 'https://fir-extended-summit-ph.firebaseio.com',
  projectId: 'fir-extended-summit-ph',
  storageBucket: 'fir-extended-summit-ph.appspot.com',
  messagingSenderId: '644786851300'
};

firebase.initializeApp(config);
