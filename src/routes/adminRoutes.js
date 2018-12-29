const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const books = [
  {
    title: 'book1',
    author: 'abcded',
    genre: 'Historical Fiction',
    read: false
  },
  {
    title: 'book2',
    author: 'ah ha',
    genre: 'Science Fiction',
    read: false
  },
  {
    title: 'book3',
    author: 'hahaha',
    genre: 'Non Fiction',
    read: false
  }
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);

          res.json(response);

        } catch (error) {
          debug(error.stack);
        }
        client.close();
      }());

    });
  return adminRouter;
}

module.exports = router;
