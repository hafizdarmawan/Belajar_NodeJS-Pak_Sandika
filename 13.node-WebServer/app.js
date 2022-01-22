// Hello world masih plainText
// const http = require('http');
// http.createServer((req, res) => {
//     res.write('Hello World');
//     res.end();
// }).listen(3000, () => {
//     console.log('Server is listening on part 3000...');
// })


// Membuat server dab routing
const http = require('http');
const fs = require('fs');

const renderHTML = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('Error: File Not Found');
        } else {
            res.write(data);
        }
        res.end();
    });
}

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    const url = req.url;
    if (url === '/') {
        renderHTML('./index.html', res);
    } else if (url === '/about') {
        renderHTML('./about.html', res);
    } else if (url === '/contact') {
        renderHTML('./contact.html', res);
    } else {
        res.writeHead(404);
        res.write('Error: File Not Found');
        res.end();
    }
}).listen(3000, () => {
    console.log('Server is listening on part 3000...');
})