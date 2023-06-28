const fs = require('fs');
const process = require('process');
const cheerio = require('cheerio');

let fsFilePath = `/home/anova02/fontdev/oisinfan62/glyph-bat/${process.argv[2]}`;
let folder = `/home/anova02/fontdev/oisinfan62/${process.argv[3].replace(/\/$/, '')}`;
let fsHtml = fs.readFileSync(fsFilePath).toString();
let $ = cheerio.load(fsHtml);
let elements = $("svg > g > g").children().toArray();
console.log(elements);
let parsedElements = elements.map((element) => $.html(element));

if (!fs.existsSync(folder)) fs.mkdirSync(folder);

for (let i = 0; i < parsedElements.length; i++) {
    let glyph = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="446.5" height="233" viewBox="0,0,446.5,233"><g transform="translate(-30,-17)"><g data-paper-data="{&quot;isPaintingLayer&quot;:true}" fill="none" fill-rule="nonzero" stroke="#000000" stroke-width="5" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" style="mix-blend-mode: normal">${parsedElements[i]}</g></g></svg>`;
    let glyphFilePathAndName = `/${folder}/glyph-${i}.svg`;
    fs.writeFile(glyphFilePathAndName, glyph, (err) => {
        if (err) console.error(err);
        console.log(glyph);
    });
}
