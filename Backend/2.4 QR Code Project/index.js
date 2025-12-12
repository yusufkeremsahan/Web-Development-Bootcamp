//1.
import fs from 'fs';
import qr from 'qr-image';
import inquirer from 'inquirer';

let urlGenerate;
inquirer.prompt([
    {
        type: 'input',
        name: 'url',
        message: 'What is your URL to make QR?'
    }
]).then((answers) => {
    urlGenerate = answers.url;
    const qr_svg = qr.image(urlGenerate, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream("url.png"));

    const svg_string = qr.imageSync(urlGenerate, { type: 'png' });
    fs.writeFile("url.txt", urlGenerate,{encoding: "utf8"}, (err) => {
        if (err) throw err;
    });

});








/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/



