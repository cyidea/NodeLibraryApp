const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to server');
          debug(username);
          debug(password);
          
          const db = client.db(dbName);
          const col = db.collection('users');
          const user = await col.findOne({ username });

          debug(user);
          if (user.password === password) {
            debug('password matches');
            done(null, user);
          }
          else {
            done(null, false);
          }
        } catch (err) {
          debug(err);
        }
        client.close();
      }());
    }
  ));
};
