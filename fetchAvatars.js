const records = require('./artists.json');
const shelljs = require('shelljs');

shelljs.mkdir('-p', 'avatars');
console.log('Downloading avatars...');

records.forEach(record => {
  let artistId = record.id;
  let { Avatar } = record.fields;
  Avatar.forEach(img => {
    console.log('...', artistId, img.url);
    shelljs.exec(`curl -s ${img.url} > avatars/${artistId}.png`);
  });
});
