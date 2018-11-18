import React from 'react';
import { graphql } from 'gatsby';
import Gallery from '../components/gallery';

export default ({ data }) => <Gallery images={data.images} />;

export const pageQuery = graphql`
  query {
    images: allMergedImagesJson {
      edges {
        node {
          title
          author {
            name
            username
          }
          avatar {
            childImageSharp {
              original {
                src
              }
            }
          }
          image {
            childImageSharp {
              fluid(maxWidth: 300, traceSVG: { blackOnWhite: false }) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;
