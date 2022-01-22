// const fs = require('fs');
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // merupakan vareabel/ inisialisasi "./data"(folder data) ke dirPath
// const dirPath = './data';

// //cek apakah data/ dirPath tidak ada
// if (!fs.existsSync(dirPath)) {
//     //jika dirPath/  folder "./data" tidak ada
//     // maka buatkan folder data
//     fs.mkdirSync(dirPath);
// }
// const dataPath = './data/contacts.json';
// if (!fs.existsSync(dataPath)) {
//     fs.writeFileSync(dataPath, '[]', 'utf-8');
// }

// const pertanyaan1 = () => {
//     return new Promise((resolve, rejects) => {
//         rl.question('Masukan nama anda : ', (nama) => {
//             resolve(nama);
//         });
//     });
// }

// const pertanyaan2 = () => {
//     return new Promise((resolve, rejects) => {
//         rl.question('Masukan Email : ', (email) => {
//             resolve(email);
//         });
//     });
// }

// const pertanyaan3 = () => {
//     return new Promise((resolve, rejects) => {
//         rl.question('Masukan No Telepon : ', (tlpn) => {
//             resolve(tlpn);
//         });
//     });
// }


// // promise
// const main = async () => {
//     const nama = await pertanyaan1();
//     const email = await pertanyaan2();
//     const tlpn = await pertanyaan3();

//     const contact = {
//         nama,
//         email,
//         tlpn
//     }
//     const file = fs.readFileSync('data/contacts.json', 'utf-8');
//     const contacts = JSON.parse(file);
//     contacts.push(contact);
//     fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
//     console.log(`Terimakasih ${nama} sudah memasukan data!`);
//     rl.close();

// }

// main()


/////////////////////////////////////////////////////////////////////////////////////////////////
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// merupakan vareabel/ inisialisasi "./data"(folder data) ke dirPath
const dirPath = './data';
//cek apakah data/ dirPath tidak ada
if (!fs.existsSync(dirPath)) {
    //jika dirPath/  folder "./data" tidak ada
    // maka buatkan folder data
    fs.mkdirSync(dirPath);
}
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama);
        });
    });
}


const simpanContact = (nama, email, tlpn) => {
    const contact = {
        nama,
        email,
        tlpn
    }
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(`Terimakasih ${nama} sudah memasukan data!`);
    rl.close();
}

module.exports = {
    tulisPertanyaan,
    simpanContact
}