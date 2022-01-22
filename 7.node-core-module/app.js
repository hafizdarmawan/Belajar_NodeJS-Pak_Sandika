// Memanggil core module

//file sistem
// const fs = require('fs');

// console.log(fs);

// menuliskan string ke file secara (syncronous)
// fs.writeFileSync('test.txt', 'Hello world secara Syncronous!')


// syncronous
// try {
//     fs.writeFileSync('data/test.txt', 'Hello world secara Syncronous!');
// } catch (error) {
//     console.log(error);
// }


// // asyncronous
// // menuliskan  string kel file
// fs.writeFile('data/test.txt', 'Hello world secara Asyncronous', (e) => {
//     console.log(e)
// })


// membaca isi file
// syncronous
// const data = fs.readFileSync('data/test.txt');
// console.log(data.toString());
// atau
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data.toString());


// membaca file secara asyncroous
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err //throw merip seperti return
//     console.log(data);
// });;


// core module
// ReadLine
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('Masukan nama anda : ', (nama) => {
//     rl.question('Masukan No Handphone: ', (noHp) => {
//         console.log(`Nama anda ${nama} dan Nomor Telepon ${noHp}`);
//         rl.close();
//     })
// })





// gabungan readline dan file sistem
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Masukan nama anda : ', (nama) => {
    rl.question('Masukan No Handphone: ', (noHp) => {
        // const contact = {
        //     nama: nama,
        //     noHp: noHp
        // }

        // atau dapat ditulis 
        const contact = {
            nama,
            noHp
        }
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        // file diconvert ke bentuk json
        const contacts = JSON.parse(file);
        contacts.push(contact);
        // json.stringfy mengubah json ke string;
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        console.log(`Terimakasih ${nama} sudah memasukan data!`);
        rl.close();
    })
})