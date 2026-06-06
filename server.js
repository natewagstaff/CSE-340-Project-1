const express = require('express');
bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;


const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    // This is the basic express session ({...}) initialization.
    .use(passport.initialize())
    // init passport on every route call.
    .use(passport.session())
    // allow passport to use "express-session".
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE']}))
    .use(cors({ origin: '*' }))
    .use("/", require('./routes'));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ githubId: profile.id}, function (err, user) {
        //     return done(err, user);
        // });
        return done(null, profile);
    }
));

// Required for passport.session() to persist the logged-in user across requests.
// Without these, passport throws "Failed to serialize user into session" (500)
// at the GitHub callback.
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/'}), 
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');  
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