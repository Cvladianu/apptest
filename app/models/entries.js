// load the things we need
var mongoose = require('mongoose');


// define the schema for our user model
var entrySchema = mongoose.Schema({

    local            : {
        entrynum        : Number,
        entrydesc     : String,
    }
    

});

// methods ======================
// checking if password is valid



// create the model for entries and expose it to our app
module.exports = mongoose.model('Entry', entrySchema);