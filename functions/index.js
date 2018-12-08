const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const database = admin.database();

exports.onTodoCreate = functions.database.ref('/todo/data/{uid}/{todoId}').onCreate((snap, context) => {
  const { params } = context;
  const { uid } = params;
  const data = snap.val();
  const updates = {};
  updates[`status/data/${uid}`] = data.todo;
  return database.ref().update(updates);
});
