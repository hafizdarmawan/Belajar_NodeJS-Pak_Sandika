const contacts = require('./contacts')

const main = async () => {
    const nama = await contacts.tulisPertanyaan('Nama anda :');
    const email = await contacts.tulisPertanyaan('email anda :');
    const tlpn = await contacts.tulisPertanyaan('No Telepon anda :');
    contacts.simpanContact(nama, email, tlpn);
}

main();
