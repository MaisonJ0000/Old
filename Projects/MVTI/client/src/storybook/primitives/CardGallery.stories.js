import React from 'react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import CardGallery from '../../components/primitives/CardGallery';

export default {
  component: CardGallery,
  title: 'Primitives|CardGallery',
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};
const DEFAULT_GROUP = 'CardGallery';
const DESC_GROUP = 'Description(html)';
const DEFAULT_IMG = 'https://m.media-amazon.com/images/M/MV5BYTg4YzkyMWEtODZhOS00ZDk1LThhNzUtYzBhZDVlZDIzYTc4XkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg';

export const Default = () => (
  <CardGallery />
);

export const ThumbnailAndDescription = () => {
  const img = text('img', DEFAULT_IMG, DEFAULT_GROUP);
  const desc = object('desc(html)', (
    <div>
      <a href="https://google.com"> Link </a>
      <br />
      <button type="button"> button </button>
      <br />
      description (Any component)
    </div>
  ), DESC_GROUP);
  return <CardGallery img={img} desc={desc} />;
};
