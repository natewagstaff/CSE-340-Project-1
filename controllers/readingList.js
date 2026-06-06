const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getReadingList = async (req, res) => {
    // #swagger.tags=['Reading List']
    try {
        const books = await mongodb.getDatabase().collection('readingList').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reading list', error: error.message });
    }
};

const getReadingListBooksById = async (req, res) => {
    // #swagger.tags=['Reading List']
    try {
        const readingListId = new ObjectId(req.params.id);
        const book = await mongodb.getDatabase().collection('readingList').find({ _id: readingListId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reading list', error: error.message });
    }
};

const addToReadingList = async (req, res) => {
    // #swagger.tags=['Reading List']
    try {
        const book = {
            userId: req.body.userId,
            bookId: req.body.bookId,
            status: req.body.status,
            rating: req.body.rating,
            notes: req.body.notes,
            dateAdded: req.body.dateAdded,
            dateCompleted: req.body.dateCompleted
        };
        const response = await mongodb.getDatabase().collection('readingList').insertOne(book);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'An error occurred while adding the book' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding to reading list', error: error.message });
    }
};

const updateBook = async (req, res) => {
    // #swagger.tags=['Reading List']
    try {
        const bookId = new ObjectId(req.params.id);
        const book = {
            userId: req.body.userId,
            bookId: req.body.bookId,
            status: req.body.status,
            rating: req.body.rating,
            notes: req.body.notes,
            dateAdded: req.body.dateAdded,
            dateCompleted: req.body.dateCompleted
        };
        const response = await mongodb.getDatabase().collection('readingList').replaceOne({ _id: bookId }, book);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'An error occurred while updating the book' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating reading list', error: error.message });
    }
};

const deleteBook = async (req, res) => {
    // #swagger.tags=['Reading List']
    try {
        const bookId = req.params.id;
        const result = await mongodb.getDatabase().collection('readingList').deleteOne({ _id: new ObjectId(bookId) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
};



module.exports = {
    getReadingList,
    getReadingListBooksById,
    addToReadingList,
    updateBook,
    deleteBook
};
