const SearchedMovieStyle = {
  '& > img': {
    width: '20px',
  },
};

const ReviewInputSectionStyle = {
  display: 'grid',
  '& > .review-input__submit-wrapper': {
    display: 'flex',
    justifyContent: 'flex-end',
    '.review-input__submit': {
      marginTop: '10px',
    },
  },
};

export { ReviewInputSectionStyle as default, SearchedMovieStyle };
