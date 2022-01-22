const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {
    body,
    validationResult,
    check
} = require('express-validator');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
// require databse mogo
require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride('_method'));

// setup ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));


// setup session
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
// setup flash
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

// route delete contact
// app.get('/contact/delete/:nama', async (req, res) => {
//     const contact = await Contact.findOne({
//         nama: req.params.nama
//     });
//     if (!contact) {
//         res.status('404');
//         res.send('<h1>Not Found</h1>');
//     } else {
//         Contact.deleteOne({
//             _id: contact._id
//         }).then((result) => {
//             req.flash('msg', 'Data Contact berhasil dihapus');
//             res.redirect('/contact');
//         });
//     }
// });
app.delete('/contact', (req, res) => {
    Contact.deleteOne({
        nama: req.body.nama
    }).then((result) => {
        req.flash('msg', 'Data Contact berhasil dihapus');
        res.redirect('/contact');
    })
});


// halaman edit
// form ubah data contact
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({
        nama: req.params.nama
    });
    res.render('edit-contact', {
        title: 'Form Ubah Data Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

app.put('/contact',
    [
        body('nama').custom(async (value, {
            req
        }) => {
            const duplikat = await Contact.findOne({
                nama: value
            });
            if (value !== req.body.oldNama && duplikat) {
                throw new Error('nama contact sudah digunakan')
            }
            return true;
        }),
        check('email', 'Email tidak valid ').isEmail(),
        check('nohp', 'Nomor HP tidak valid').isMobilePhone('id-ID')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('edit-contact', {
                title: 'Form Ubah Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                contact: req.body,
            });
        } else {
            Contact.updateOne({
                _id: req.body._id
            }, {
                $set: {
                    nama: req.body.nama,
                    email: req.body.email,
                    nohp: req.body.nohp
                }
            }).then((result) => {
                req.flash('msg', 'Data Contact berhasil ubah');
                res.redirect('/contact');
            })
        }
    });



// halaman form tambah data contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form Tambah Data Contact',
        layout: 'layouts/main-layout',
    });
});

// proses data contact
app.post('/contact',
    [
        body('nama').custom(async (value) => {
            const duplikat = await Contact.findOne({
                nama: value
            });
            if (duplikat) {
                throw new Error('nama contact sudah digunakan')
            }
            return true;
        }),
        check('email', 'Email tidak valid ').isEmail(),
        check('nohp', 'Nomor HP tidak valid').isMobilePhone('id-ID')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('add-contact', {
                title: 'Form Tambah Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
            });
        } else {
            Contact.insertMany(req.body, (error, result) => {
                req.flash('msg', 'Data Contact berhasil tambahkan');
                res.redirect('/contact');
            });
        }
    });







// form ubah data contact
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('edit-contact', {
        title: 'Form Ubah Data Contact',
        layout: 'layouts/main-layout',
        contact,
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