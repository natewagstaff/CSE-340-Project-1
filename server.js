const express = require('express');
bodyParser = require('body-parser');


const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const booksController = require('./controllers/books');
const readingListController = require('./controllers/readingList');


app.get('/api/books', booksController.getAllBooks);
app.get('/api/reading-list', readingListController.getReadingList);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
mongodb.initDatabase((error) => {
    if (error) {
        console.error('Failed to initialize database:', error);
    }   else {
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        }
});