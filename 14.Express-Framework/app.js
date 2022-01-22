const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // mengirim tulisan (bukan html)
    // res.send('Halaman Index');

    // mngirim dalam bentuk json
    // res.json({
    //     nama: 'hafiz darmawan',
    //     kelas: "Informatika B",
    //     email: "hafizdarmawan@gmail.com"
    // })

    // mengirim file index.html
    res.sendFile('./index.html', {
        root: __dirname
    })


})

app.get('/about', (req, res) => {
    res.sendFile('./about.html', {
        root: __dirname
    });
});

app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', {
        root: __dirname
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

/////////////////////////////////////////////////////////////////////////////////////////

// // Hello world masih plainText
// // const http = require('http');
// // http.createServer((req, res) => {
// //     res.write('Hello World');
// //     res.end();
// // }).listen(3000, () => {
// //     console.log('Server is listening on part 3000...');
// // })


// // Membuat server dab routing
// const http = require('http');
// const fs = require('fs');

// const renderHTML = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             res.writeHead(404);
//             res.write('Error: File Not Found');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// }

// http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/html',
//     });

//     const url = req.url;
//     if (url === '/') {
//         renderHTML('./index.html', res);
//     } else if (url === '/about') {
//         renderHTML('./about.html', res);
//     } else if (url === '/contact') {
//         renderHTML('./contact.html', res);
//     } else {
//         res.writeHead(404);
//         res.write('Error: File Not Found');
//         res.end();
//     }
// }).listen(3000, () => {
//     console.log('Server is listening on part 3000...');
// })