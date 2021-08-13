import React from 'react';
import CardGallery from '../primitives/CardGallery';
import MagnifyAnimation from '../primitives/MagnifyAnimation';

const CardGalleryList = ({ items, itemRenderOpts }) => {
  const renderOpts = itemRenderOpts || {
    animation: {
      animates: true,
    },
  };
  const animation = renderOpts.animation || {};
  const renderItems = () => items.map((item) => (
    <li className="card__item" key={item.key}>
      {
        animation.animates
          ? (
            <MagnifyAnimation renderOpts={renderOpts}>
              <CardGallery img={item.img} desc={item.desc} />
            </MagnifyAnimation>
          )
          : <CardGallery img={item.img} desc={item.desc} />
      }
    </li>
  ));

  return (
    <ul className="card__list">
      {renderItems()}
    </ul>
  );
};

export default React.memo(CardGalleryList);
