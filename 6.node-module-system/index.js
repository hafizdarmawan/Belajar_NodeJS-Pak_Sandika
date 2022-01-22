// const nama = 'Hafiz Darmawan';
// const cetakNama = (nama) => {
//     return `Nama saya ${nama}`;
// }
// // console.log('Tampilan index');
// console.log(cetakNama(nama));
// const fs = require('fs'); //mengimport Core Module
// const cetakNama = require('./coba'); // mengimport local module
// const momment = require('mommen'); // third party/ npm module/ tersipan di folder node_module

// coba adalah object yang menampung fuction cetakNama dan PI
// cOBA ADALAH OBJECT dan function export dari coba.js
const coba = require('./coba');

// cara memnggil cetak nama di coba.js
console.log(
    coba.cetakNama('Hafiz Darmawan'),
    coba.PI,
    coba.mahasiswa.cetakMhs(),
    new coba.Orang()
);
