const fs = require('fs');
//file yang di buat 
const writableStream = fs.createWriteStream('./writable/output.txt');
//tulisan yang adan di buat
writableStream.write('Ini merupakan teks baris pertama!\n');
writableStream.write('Ini merupakan teks baris kedua!\n');
writableStream.end('Akhir dari writable stream!');
