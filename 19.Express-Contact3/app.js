const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {
    loadContact,
    findContact,
    addContact,
    cekDuplikat,
    deleteContact,
    updateContacts
} = require('./utils/contacts')
const {
    body,
    validationResult,
    check
} = require('express-validator');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


const app = express();
const port = 3000;

app.set('view engine', 'ejs');
// thirty-Party Middleware
app.use(expressLayouts);
// built in middleware image statis
app.use(express.static('public'));
// middleware
app.use(express.urlencoded({
    extended: true
}));
// konfigurasi flash
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

// flash
app.use(flash());


app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layout',
        nama: 'Hafiz Oke',
        title: 'Halaman Index',
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman about',
    });
});

app.get('/contact', (req, res) => {
    const contacts = loadContact()
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Halaman Contct',
        contacts,
        msg: req.flash('msg')
    });
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
        body('nama').custom((value) => {
            const duplikat = cekDuplikat(value);
            if (duplikat) {
                throw new Error('nama contact sudah digunakan')
            }
            return true;
        }),
        check('email', 'Email tidak valid ').isEmail(),
        check('noHP', 'Nomor HP tidak valid').isMobilePhone('id-ID')
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
            addContact(req.body);
            req.flash('msg', 'Data Contact berhasil tambahkan');
            res.redirect('/contact');
        }

    });


// route delete contact
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    // jika cntact tidak ada
    if (!contact) {
        res.status('404');
        res.send('<h1>Not Found</h1>');
    } else {
        // res.send('berhasil');
        deleteContact(req.params.nama);
        req.flash('msg', 'Data Contact berhasil dihapus');
        res.redirect('/contact');
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
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Halaman Detail Contact',
        contact: contact
    });
});


app.post('/contact/update',
    [
        body('nama').custom((value, {
            req
        }) => {
            const duplikat = cekDuplikat(value);
            if (value !== req.body.oldNama && duplikat) {
                throw new Error('nama contact sudah digunakan')
            }
            return true;
        }),
        check('email', 'Email tidak valid ').isEmail(),
        check('noHP', 'Nomor HP tidak valid').isMobilePhone('id-ID')
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
            updateContacts(req.body);
            req.flash('msg', 'Data Contact berhasil ubah');
            res.redirect('/contact');
        }
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
