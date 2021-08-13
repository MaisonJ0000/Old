import React from 'react';
import _ from 'lodash';
import CardGalleryList from '../../components/combinations/CardGalleryList';

export default {
  component: CardGalleryList,
  title: 'CardGalleryList',
  excludeStories: /.*Data$/,
};

const defaultItem = {};
const customItem = {
  img: 'https://m.media-amazon.com/images/M/MV5BYTg4YzkyMWEtODZhOS00ZDk1LThhNzUtYzBhZDVlZDIzYTc4XkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg',
  desc: <div>hi</div>,
};
const n = 10;
const defaultItems = _.fill(Array(n), defaultItem);
const customItems = _.fill(Array(n), customItem);
const noAnimationOpts = {
  animation: {
    animates: false,
  },
};

export const cardGalleryListData = {
  defaultItems,
  customItems,
  noAnimationOpts,
};

export const Default = () => (
  <CardGalleryList items={cardGalleryListData.defaultItems} />
);

export const Custom = () => (
  <CardGalleryList items={cardGalleryListData.customItems} />
);

export const noAnimation = () => (
  <CardGalleryList items={cardGalleryListData.customItems} itemRenderOpts={noAnimationOpts} />
);
