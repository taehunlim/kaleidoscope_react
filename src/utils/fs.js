const fs = require('fs');

const files = fs.readdirSync('public/assets/images');
const filePaths = files.map(file => `/assets/images/${file}`);

fs.writeFile(
    'src/images.json',
    JSON.stringify(filePaths),
    'utf8',
    err => {
    if(err) {
        throw err;
    }
})