const {
    MongoClient,
    ObjectID
} = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'wpu';

// inisialisai client
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect((error, client) => {
    if (error) {
        return console.log('Connection Failed!');
    }

    console.log(' Connection Success !');

    // pilih databse
    const db = client.db(dbName);

    // menambahkan 1 data ke collections mahasiswa
    // db.collection('mahasiswa').insertOne({
    //     nama: 'bambang Erik',
    //     email: 'bamerik@gmail.com'
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Gagal menambahkan data!');
    //     }
    //     console.log(result);
    // });

    // menambahkan lebih dari 1 data
    // db.collection('mahasiswa').insertMany(
    //     [{
    //         nama: 'Erik',
    //         email: 'bamerik@gmail.com'
    //     }, {
    //         nama: 'ngEr',
    //         email: 'rik@gmail.com'
    //     }, ], (error, result) => {
    //         if (error) {
    //             return console.log('Gagal menambahkan data!');
    //         }
    //         console.log(result);
    //     });


    // menampilkan semua data di table mahasiswa
    // console.log(db.collection('mahasiswa').find().toArray((error, result) => {
    //     console.log(result);
    // }));


    // menampilkan data berdasarkan kriteria
    // console.log(db.collection('mahasiswa').find({
    //     nama: 'Erik',
    // }).toArray((error, result) => {
    //     console.log(result);
    // }));

    // berdasrkan object id
    // console.log(db.collection('mahasiswa').find({
    //         _id: ObjectID("61e90481f5b6783558524f22")
    //     })
    //     .toArray((error, result) => {
    //         console.log(result);
    //     }));


    // MENGUBAH DATA BERDASRKAN ID
    // db.collection('mahasiswa').updateOne({
    //     _id: ObjectID('61e90481f5b6783558524f22'),
    // }, {
    //     $set: {
    //         nama: 'Erik Lamela'
    //     },
    // });

    // console.log(db.collection('mahasiswa').find({
    //         _id: ObjectID("61e90481f5b6783558524f22")
    //     })
    //     .toArray((error, result) => {
    //         console.log(result);
    //     }));


    // menghapus 1 data
    // db.collection('mahasiswa').deleteOne({
    //     _id: ObjectID('61e90481f5b6783558524f22')
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // menghapsu lebih dari satu
    db.collection('mahasiswa').deleteMany({
        nama: 'hafiz',
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });


});