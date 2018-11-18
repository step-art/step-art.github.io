const Airtable = require('airtable');
const AIRTABLE_KEY = process.env.AIRTABLE_KEY;
const baseId = process.env.BASE_ID;
const base = new Airtable({ apiKey: AIRTABLE_KEY }).base(baseId);
const fs = require('fs');

let allImageRecords = [];
base('Images')
  .select({
    maxRecords: 100,
    view: 'Grid view',
  })
  .eachPage(
    function page(records, fetchNextPage) {
      records.forEach(function(record) {
        allImageRecords.push(record._rawJson);
      });
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err);
        return;
      }
      fs.writeFile(
        'images.json',
        JSON.stringify(allImageRecords),
        'utf8',
        () => {}
      );
    }
  );

let allArtistRecords = [];
base('Artists')
  .select({
    maxRecords: 100,
    view: 'Grid view',
  })
  .eachPage(
    function page(records, fetchNextPage) {
      records.forEach(function(record) {
        allArtistRecords.push(record._rawJson);
      });
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err);
        return;
      }
      fs.writeFile(
        'artists.json',
        JSON.stringify(allArtistRecords),
        'utf8',
        () => {}
      );
    }
  );
