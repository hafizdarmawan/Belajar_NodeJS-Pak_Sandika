const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan')
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// thirty-Party Middleware
app.use(expressLayouts);

// menulis log
app.use(morgan('dev'));

// built in middleware image statis
app.use(express.static('public'));

// aplication middleware
app.use((req, res, next) => {
    console.log('Time :', Date.now());
    next();
})

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
})

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman about',
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Halaman Contct',
    });
});

app.get('/product/:id', (req, res) => {
    res.send(`Product Id : ${req.params.id}`);
});;

// app.use('/', (req, res) => {
//     res.status(404);
//     res.send('<H1>Not Found</H1>')
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
