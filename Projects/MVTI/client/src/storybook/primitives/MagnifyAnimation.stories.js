import React from 'react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import MagnifyAnimation from '../../components/primitives/MagnifyAnimation';
import CardGallery from '../../components/primitives/CardGallery';

export default {
  component: MagnifyAnimation,
  title: 'Primitives|MagnifyAnimation',
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};
const CARD_GALLERY_GROUP = 'Card';
const ANIMATION_GROUP = 'Animation';
const DEFAULT_IMG = 'https://m.media-amazon.com/images/M/MV5BYTg4YzkyMWEtODZhOS00ZDk1LThhNzUtYzBhZDVlZDIzYTc4XkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg';

export const cardGalleryData = {
  desc: (
    <div>
      <a href="https://google.com"> Link </a>
      <br />
      <button type="button"> button </button>
      <br />
      description (Any component)
    </div>
  ),
};

export const AnimCardGallery = () => {
  const img = text('img', DEFAULT_IMG, CARD_GALLERY_GROUP);
  const { desc } = cardGalleryData;
  const renderOpts = object('renderOpts', {
    animation: {
      animates: true,
      config: {
        mass: 5, tension: 350, friction: 40,
      },
    },
  }, ANIMATION_GROUP);

  return (
    <MagnifyAnimation renderOpts={renderOpts}>
      <CardGallery img={img} desc={desc} />
    </MagnifyAnimation>
  );
};
