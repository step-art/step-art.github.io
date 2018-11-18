const records = require('./images.json');
const shelljs = require('shelljs');

console.log('Downloading images...');
records.forEach(record => {
  let imgId = record.id;
  let { Artist, Image } = record.fields;
  Image.forEach(img => {
    let path = `repos/${Artist[0]}/images`;
    console.log('...', Artist[0], img.id, img.url);
    shelljs.mkdir('-p', path);
    shelljs.exec(`curl -s ${img.url} > ${path}/${img.id}.jpg`);
  });
});
