const mongoose = require('mongoose');
const Contact = mongoose.model('Cobas', {
    nama: {
        type: String,
        required: true,
    },
    nohp: {
        type: String,
        required: true
    },
    email: {
        type: String,
    }
});


module.exports = Contact;