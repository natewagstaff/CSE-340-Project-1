const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Welcome to the Book Tracker API!']
    res.send('Welcome to the Book Tracker API!' );
});

router.use('/books', require('./books'));
router.use('/reading-list', require('./readingList'));



module.exports = router;