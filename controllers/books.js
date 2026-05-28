const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAllBooks = async (req, res) => {       
    const result = await mongodb.getDatabase().collection('books').find();
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    }).catch((error) => {
        res.status(500).json({ message: 'Error fetching books', error: error });
    });
}



module.exports = {
    getAllBooks
};