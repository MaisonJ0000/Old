import React from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import CardGalleryStyle from '../../styles/primitives/CardGalleryStyle';

const CardGallery = ({ img, desc }) => (
  <div className="card-gallery" css={CardGalleryStyle}>
    <div className="card-gallery__thumbnail-wrapper">
      <img
        className="card-gallery__thumbnail"
        src={img || 'https://cdn.pixabay.com/photo/2020/07/14/13/42/boat-5404195__480.jpg'}
        alt=""
      />
    </div>
    <div className="card-gallery__description-wrapper">
      { desc }
    </div>
  </div>
);

export default React.memo(CardGallery);
