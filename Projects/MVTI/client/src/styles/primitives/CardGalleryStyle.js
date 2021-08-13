const CardGalleryStyle = {
  display: 'inline-block',
  width: '100%',
  background: '#fff',
  boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
  transition: 'box-shadow 0.5s',
  '&:hover': {
    boxShadow: '0px 30px 100px -10px rgba(0, 0, 0, 0.4)',
  },
  '& > .card-gallery__thumbnail-wrapper': {
    width: '100%',
    height: '0',
    paddingBottom: '125%',
    position: 'relative',
    overflow: 'hidden',
    '.card-gallery__thumbnail': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: '0',
      top: '0',
      objectFit: 'cover',
    },
  },
  '& > .card-gallery__description-wrapper': {
    padding: '16px',
    '.wrapper__content': {
      fontSize: '14px',
      letterSpacing: '-.5px',
      lineHeight: '1.5',
      p: {
        maxHeight: '3em',
      },
      i: {
        fontSize: '12px',
        color: '#999',
      },
    },
  },
};

export { CardGalleryStyle as default };
