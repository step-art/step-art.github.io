const records = require('./artists.json');
const images = require('./images.json');

let artistsWithContributions = images.map(x => x.fields.Artist[0]);

const fs = require('fs');
const shelljs = require('shelljs');

let onlyArtistsWeNeed = records.filter(x =>
  artistsWithContributions.includes(x.id)
);

let allAuthors = onlyArtistsWeNeed.map(record => {
  let { Username, Name } = record.fields;
  return { name: Name, username: Username, id: record.id };
});

shelljs.mkdir('-p', 'data');
fs.writeFileSync('data/mergedAuthors.json', JSON.stringify(allAuthors), 'utf8');
