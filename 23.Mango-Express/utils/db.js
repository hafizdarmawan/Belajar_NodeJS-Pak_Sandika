const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/wpu', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// const Contact = mongoose.model('Coba', {
//     nama: {
//         type: String,
//         required: true,
//     },
//     nohp: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//     }
// });

// const contact1 = new Contact({
//     nama: 'Hapiz Darmawan',
//     nohp: '09876543212',
//     email: 'apis@gmail.com'
// });

// contact1.save().then((contact) => console.log(contact));
