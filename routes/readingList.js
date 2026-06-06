const express = require('express');
const router = express.Router();

const readingListController = require('../controllers/readingList');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/',  readingListController.getReadingList);
router.get('/:id', readingListController.getReadingListBooksById);
router.post('/', isAuthenticated, readingListController.addToReadingList);
router.put('/:id', isAuthenticated, readingListController.updateBook);
router.delete('/:id', isAuthenticated, readingListController.deleteBook);

module.exports = router;