// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
        app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    
     //VIEW ENTRIES =========

    app.get('/view-entries', (req, res) => {
      db.collection('entries').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('view-entries.ejs', {entries: result})
      })
    })
    
    //POST - save entry
app.post('/view-entries', (req, res) => {
    db.collection('entries').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('Saved to db')
        res.redirect('/view-entries')
    })
  console.log(req.body)
})

//DELETE

app.delete('/view-entries', (req, res) => {
  db.collection('entries').findOneAndDelete({entrynum: req.body.entrynum},
  (err, result) => {
    if (err) return res.send(500, err)
    res.redirect('/view-entries')
  })
})

//POST - UPDATE
app.post('/entriesUP', (req, res) => {
  db.collection('entries')
  .findOneAndUpdate({entrynum: req.body.entrynum}, {
    $set: {
      entrydesc: req.body.entrydesc
    }
  },  (err, result) => {
    if (err) return res.send(err)
    res.redirect('/view-entries')
  })
})
    
    
    
};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}