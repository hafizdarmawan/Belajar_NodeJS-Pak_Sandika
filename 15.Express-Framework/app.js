const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

// gunakan view ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);


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
        // mahasiswa: mahasiswa
        // atau dpat ditulis 
        // mahasiswa
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


// request method
app.get('/product/:id', (req, res) => {
    res.send(`Product Id : ${req.params.id}`);
});;



app.use('/', (req, res) => {
    res.status(404);
    res.send('<H1>Not Found</H1>')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
