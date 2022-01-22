function cetakNama(nama) {
    return `Hello, nama saya ${nama}`;
}

const PI = 3.14;


const mahasiswa = {
    nama: 'DODY',
    umur: 20,
    cetakMhs() {
        return `Hello, Nama saya ${this.nama} dan umur saya ${this.umur} Tahun`;
    }
}

class Orang {
    constructor() {
        console.log('Oobject Oorang telah dibuat');
    }
}



// //melakukan eksport 1 function
// module.exports  = cetakNama;

// melakukan ekport lebih dari 1 function
// yang dimana file export akan menjadi object ketika diakses/ di require
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// atau dapat disingkat lebih mudah
// module.exports = {
//     cetakNama: cetakNama,
//     PI: PI,
//     mahasiswa: mahasiswa,
//     Orang: Orang,
// }


// atau dapat disingkat lebih mudah
// karena nama dan value sama
module.exports = {
    cetakNama,
    PI,
    mahasiswa,
    Orang,
}