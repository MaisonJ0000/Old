import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { fromJS } from 'immutable';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import useInput from '../hooks/useInput';
import { fetchMovies, fetchKoficMovies } from '../../redux/modules/movie';
import Search from '../primitives/Search';
import ReviewInputSectionStyle, { SearchedMovieStyle } from '../../styles/sections/ReviewInputSectionStyle';
import StyledButton from '../../styles/primitives/ButtonStyle';
import { addReview, resetAddReview } from '../../redux/modules/review';

const ReviewInputSection = () => {
  const [title, onChangeTitle, setTitle] = useInput();
  const [preview, setPreview] = useState(fromJS({ genre: '', rating: null }));
  const [genre, onChangeGenre, setGenre] = useInput();
  const [reviewText, onChangeReviewText] = useInput();
  const [rating, onChangeRating] = useInput({ type: 'number' });
  const [selectedMovie, setSelectedMovie] = useState({});
  const [opensAddReviewSuccess, setOpensAddReviewSuccess] = useState(false);
  const [addReviewSuccessMessage, setAddReviewSuccessMessage] = useState('');
  const [submitWarningMsg, setSubmitWarningMsg] = useState('');

  const createdReviewMap = useSelector((store) => store.review.get('createdReview'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (title) dispatch(fetchKoficMovies({ title }));
  }, [title]);

  useEffect(() => {
    const createdReview = createdReviewMap.toJS();
    if (createdReview.review) {
      const movie = _.get(createdReview, 'review.movie');
      setAddReviewSuccessMessage(`${movie.title}의 리뷰가 생성되었습니다.`);
      setOpensAddReviewSuccess(true);
      setSubmitWarningMsg('');
      dispatch(fetchMovies());
    }
  }, [createdReviewMap]);

  const { isLoading: isImdbLoading, movies: imdbMovies } = useSelector((store) => store.movie.get('imdbMovies').toJS());
  const movieOptions = _.map(imdbMovies, (movie) => _.assign(movie, { name: movie.titleKr }));
  const renderOption = (option) => (
    <div css={SearchedMovieStyle}>
      <span>{option.name}</span>
      <img src={option.poster} alt="" />
    </div>
  );

  const onChangeMovieSearch = (e, newValue) => {
    setTitle(newValue.titleKr);
    setGenre(newValue.genre);
    setSelectedMovie(newValue);
  };

  const onHighlightChange = (event, option) => {
    if (option) {
      setPreview(preview
        .set('genre', fromJS(option.genre || ''))
        .set('rating', fromJS(option.imdbRating || null)));
    }
  };

  const onSearchClose = () => {
    setPreview(preview
      .set('genre', fromJS(''))
      .set('rating', fromJS(null)));
  };

  const onClickSubmit = () => {
    if (!selectedMovie.imdbID) {
      setSubmitWarningMsg('imdb에서 검색 가능한 영화 제목을 등록해주세요.');
      return;
    }
    const review = {
      rating: Number(rating),
      text: reviewText,
      movie: {
        titleKr: title,
        poster: selectedMovie.poster || '',
      },
    };
    dispatch(addReview(review));
  };

  const onCloseAddReviewSuccess = () => {
    setOpensAddReviewSuccess(false);
    dispatch(resetAddReview());
  };

  return (
    <div className="review-input" css={ReviewInputSectionStyle}>
      <Search
        className="review-input__title col__6"
        options={movieOptions}
        placeholder="영화 제목"
        onChangeTextField={onChangeTitle}
        loading={isImdbLoading}
        renderOption={renderOption}
        onHighlightChange={onHighlightChange}
        onClose={onSearchClose}
        onChange={onChangeMovieSearch}
      />
      <input
        className="review-input__item col__6"
        placeholder={`장르${preview.get('genre') ? `: ${preview.get('genre')}` : ''}`}
        value={genre}
        onChange={onChangeGenre}
      />
      <input
        className="review-input__item col__12"
        placeholder="한줄평"
        value={reviewText}
        onChange={onChangeReviewText}
      />
      <input
        className="review-input__item col__12"
        placeholder={`${preview.get('rating') ? 'IMDb ' : ''}평점${preview.get('rating') ? `: ${preview.get('rating')}` : ''}`}
        value={rating}
        onChange={onChangeRating}
      />
      <div className="review-input__submit-wrapper">
        <span>{submitWarningMsg}</span>
        <StyledButton
          primary
          type="button"
          className="review-input__submit"
          onClick={onClickSubmit}
        >
          {createdReviewMap.toJS().isLoading ? <CircularProgress color="inherit" size={20} /> : 'Submit' }
        </StyledButton>
      </div>
      <Snackbar
        open={opensAddReviewSuccess}
        autoHideDuration={6000}
        onClose={onCloseAddReviewSuccess}
      >
        <Alert onClose={onCloseAddReviewSuccess} severity="success">
          {addReviewSuccessMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReviewInputSection;
