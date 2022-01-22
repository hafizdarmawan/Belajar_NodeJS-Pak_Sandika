const yargs = require("yargs");
const contacts = require("./contacts");

// yargs.command(
//     'add',
//     'Menambahkan contact baru',
//     () => { },
//     (argv) => {
//         console.log(argv.nama);
//     }
// );

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string"
        },
        email: {
            describe: "Email",
            demandOption: true,
            type: "string"
        },
        noHP: {
            describe: "No telepon",
            demandOption: true,
            type: "string"
        },
    },
    handler(argv) {
        // const contact = {
        //     nama: argv.nama,
        //     email: argv.email,
        //     noHP: argv.noHP
        // };
        // console.log(contact);
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    }
}).demandCommand();

// .demandCommand()
// digunakan ketika mengakses node app maka akan muncul perintah
// peringatan

// menampilkan list
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & nomor HP contact',
    handler() {
        contacts.listContact();
    },
});

// menampilkan detail
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    },
});


// delete
yargs.command({
    command: 'delete',
    describe: 'Menghapus data contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    },
});



yargs.parse();
