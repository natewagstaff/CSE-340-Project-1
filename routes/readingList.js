const express = require('express');
const router = express.Router();

const readingListController = require('../controllers/readingList');

router.get('/', readingListController.getReadingList);
router.get('/:id', readingListController.getReadingListBooksById);
router.post('/', readingListController.addToReadingList);
router.put('/:id', readingListController.updateBook);
router.delete('/:id', readingListController.deleteBook);

module.exports = router;