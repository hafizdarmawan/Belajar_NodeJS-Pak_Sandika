const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));


// konfogurasi flash
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: {
            maxAge: 6000
        },
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(flash());


app.get('/', (req, res) => {
    const mahasiswa = [{
            nama: 'Hafiz Darmawan',
            email: 'hafiz1@gmail.com'
        }, {
            nama: 'Darmawan',
            email: 'hafiz2@gmail.com'
        },
        {
            nama: 'DarmawanHafiz',
            email: 'hafiz3@gmail.com'
        },
    ]
    res.render('index', {
        layout: 'layouts/main-layout',
        nama: 'Hafiz Oke',
        title: 'Halaman Index',
        mahasiswa
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman about',
    });
});


app.get('/contact', async (req, res) => {
    // Contact.find().then((contact) => {
    //     res.send(contact);
    // })
    const contacts = await Contact.find()
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Halaman Contct',
        contacts,
        msg: req.flash('msg')
    });
});

// halaman detail
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({
        nama: req.params.nama
    });
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Halaman Detail Contact',
        contact
    });
});


app.listen(port, () => {
    console.log(`Mongo Contact App | Listening at HTTP://localhost:${port}`);
});