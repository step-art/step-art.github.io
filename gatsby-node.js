const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const userTemplate = path.resolve('src/templates/artistPage.js');
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        query {
          allMergedAuthorsJson {
            edges {
              node {
                name
                username
                id
              }
            }
          }
        }
      `).then(result => {
        result.data.allMergedAuthorsJson.edges.forEach(({ node }) => {
          createPage({
            path: `/artists/${node.username}`,
            component: userTemplate,
            context: { username: node.id },
          });
        });
        resolve();
      })
    );
  });
};
