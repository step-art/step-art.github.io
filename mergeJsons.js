const fs = require('fs');
const classroomPrefix = process.env.CLASSROOM_PREFIX || 'tdac-';

const readJson = fileName => {
  return JSON.parse(fs.readFileSync(fileName, 'utf8'));
};
const prependPathToImage = (entry, path) => {
  let originalPath = entry.image;
  let newPath = path + '/' + originalPath;
  return Object.assign(entry, { image: newPath });
};

const updatePath = (images, author) => {
  return images.map(i => prependPathToImage(i, `../repos/${author}/images`));
};

const insertAuthor = (images, author, username) => {
  let additionalAuthorInfo = {
    username: author,
    author: author,
    avatar: `../avatars/${username}.png`,
  };
  return images.map(i => Object.assign(i, additionalAuthorInfo));
};

let repos = fs.readdirSync('repos');
let authorsJson = [];
let imagesJson = [];

repos.forEach(repo => {
  let config = readJson(`repos/${repo}/config.json`);
  let images = readJson(`repos/${repo}/images.json`);
  let prefixRegex = new RegExp(`^${classroomPrefix}`);
  let username = repo.replace(prefixRegex, '');
  let newImagesJson = updatePath(images, repo);
  newImagesJson = insertAuthor(newImagesJson, repo, username);
  authorsJson.push(Object.assign(config, { id: repo, username: username }));
  imagesJson = imagesJson.concat(newImagesJson);
});

fs.writeFileSync(
  'data/mergedAuthors.json',
  JSON.stringify(authorsJson),
  'utf8'
);
fs.writeFileSync('data/mergedImages.json', JSON.stringify(imagesJson), 'utf8');
