const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAllBooks = async (req, res) => {       
    // #swagger.tags=['Books']
    const result = await mongodb.getDatabase().collection('books').find();
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    }).catch((error) => {
        res.status(500).json({ message: 'Error fetching books', error: error });
    });
}

const getBookById = async (req, res) => {
    // #swagger.tags=['Books']
    try {
        const bookId = req.params.id;
        const book = await mongodb.getDatabase().collection('books').findOne({ _id: new ObjectId(bookId) });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book', error: error.message });
    }
};

const addBook = async (req, res) => {
    // #swagger.tags=['Books']
    const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            isbn: req.body.isbn,
            pageCount: req.body.pageCount,
            publishedYear: req.body.publishedYear,
            language: req.body.language,
            description: req.body.description
    }

    const response = await mongodb.getDatabase().collection('books').insertOne(book);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: response.error || 'An error occurred while adding the book' });
    }
};

const updateBook = async (req, res) => {
    // #swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            isbn: req.body.isbn,
            pageCount: req.body.pageCount,
            publishedYear: req.body.publishedYear,
            language: req.body.language,
            description: req.body.description
    };
    const response = await mongodb.getDatabase().collection('books').replaceOne({ _id:  bookId }, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {        res.status(500).json({ error: response.error || 'An error occurred while updating the book' });
    }
};

const deleteBook = async (req, res) => {
    // #swagger.tags=['Books']
    try {
        const bookId = req.params.id;
        const result = await mongodb.getDatabase().collection('books').deleteOne({ _id: new ObjectId(bookId) });
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
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
};