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
//         rl.question('Masukan No Telepon : ', (noHP) => {
//             resolve(noHP);
//         });
//     });
// }


// // promise
// const main = async () => {
//     const nama = await pertanyaan1();
//     const email = await pertanyaan2();
//     const noHP = await pertanyaan3();

//     const contact = {
//         nama,
//         email,
//         noHP
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
const chalk = require('chalk');
const validator = require('validator');

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}


const simpanContact = (nama, email, noHP) => {
    const contact = {
        nama,
        email,
        noHP
    }

    const contacts = loadContact();
    // cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain'));
        return false;
    }

    if (email) {
        const duplikatEmail = contacts.find((contact) => contact.email === email);
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Email tidak valid'));
            return false;
        }
        if (duplikatEmail) {
            console.log(chalk.red.inverse.bold('Email sudah terdaftar, gunakan nama lain'));
            return false;
        }
    }

    if (!validator.isMobilePhone(noHP, "id-ID")) {
        console.log(chalk.red.inverse.bold('No Telepon tidak valid'));
        return false;
    }


    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold(`Terimakasih ${nama} sudah memasukan data!`));
}

const listContact = () => {
    const contacts = loadContact();
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    });
}

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    if (!contact) {
        console.log(chalk.red.inverse.bold(`${nama} Tidak ditemukan`));
        return false;
    }

    console.log(chalk.green.inverse.bold(contact.nama));
    console.log(chalk.green.inverse.bold(contact.email));
    console.log(chalk.green.inverse.bold(contact.noHP));
}


const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if (contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold(`${nama} Tidak ditemukan`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.green.inverse.bold(`data ${nama} berhasil dihapus`));
}

module.exports = {
    simpanContact,
    listContact,
    detailContact,
    deleteContact
}