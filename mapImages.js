const records = require('./images.json');
const fs = require('fs');
const shelljs = require('shelljs');

let allImages = [];
const split = x => x.split(/\s+/);

const pathTo = (artist, filename) =>
  `../repos/${artist}/images/${filename}.jpg`;

records.forEach(record => {
  let { Title, Desc, Image, Tags, Artist } = record.fields;
  let mapped = Image.map(i => {
    return {
      image: pathTo(Artist[0], i.id),
      title: Title,
      desc: Desc,
      tags: split(Tags),
      date: record.createdTime,
      username: Artist[0],
      author: Artist[0],
      avatar: `../avatars/${Artist[0]}.png`,
    };
  });
  allImages = allImages.concat(mapped);
});

shelljs.mkdir('-p', 'data');
fs.writeFileSync('data/mergedImages.json', JSON.stringify(allImages), 'utf8');
