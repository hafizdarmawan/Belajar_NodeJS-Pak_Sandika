const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {
    loadContact,
    findContact
} = require('./utils/contacts')
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// thirty-Party Middleware
app.use(expressLayouts);

// built in middleware image statis
app.use(express.static('public'));

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
    const contact = loadContact()
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Halaman Contct',
        contact: contact
    });
});

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Halaman Detail Contact',
        contact: contact
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
