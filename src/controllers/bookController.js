const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookControllers(nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const collection = await db.collection('books');
        const books = await collection.find().toArray();

        res.render(
          'books', {
            books,
            title: 'Books',
            nav,
          }
        );

      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());

  }

  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const collection = await db.collection('books');
        const book = await collection.findOne({ _id: new ObjectID(id) });

        res.render(
          'bookView', {
            book,
            title: 'A Book',
            nav
          }
        );

      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());

  }

  function middleware(req, res, next) {
    //if (req.user) {
    next();
    //} else {
    //  res.redirect('/');
    //}
  }
  return {
    getIndex,
    getById,
    middleware
  }
}

module.exports = bookControllers;