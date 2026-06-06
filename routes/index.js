const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Welcome to the Book Tracker API!']
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'You are not logged in.');
});

router.use('/books', require('./books'));
router.use('/reading-list', require('./readingList'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.user = undefined;
        res.redirect('/'); // Redirect to the homepage after logout
    })
});

module.exports = router;