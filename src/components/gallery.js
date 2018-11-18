import React from 'react';
import styled from 'styled-components';
import Card from './card';
import chunk from 'lodash/chunk';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 960px;
  margin: 0 auto;
`;

const GalleryRow = props => {
  let cards = props.images.map(x => <Card node={x.node} />);
  return <Row>{cards}</Row>;
};

const Gallery = props => {
  let chunked = chunk(props.images.edges, 3);
  let rows = chunked.map(row => <GalleryRow images={row} />);
  return <div>{rows}</div>;
};

export default Gallery;
