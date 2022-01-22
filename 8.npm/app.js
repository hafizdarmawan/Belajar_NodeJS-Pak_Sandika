const validator = require('validator');
const chalk = require('chalk');
// console.log(validator.isEmail('hafizdarmawan@gmail.com'));
// console.log(validator.isMobilePhone('087758373050', 'id-ID'));
// console.log(validator.isNumaric('087758373050'));
const nama = 'Hafiz';
const pesan = chalk `Lorem ipsum ${nama} dolor,{bgGreen.black.bold necessitatibus ipsam!} Quibusdam, voluptas qui.`;
console.log(pesan);
console.log(chalk.black.bgBlueBright.italic('hello World'));