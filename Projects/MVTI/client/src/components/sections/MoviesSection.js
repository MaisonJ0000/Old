import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { fetchMovies } from '../../redux/modules/movie';
import CardGalleryList from '../combinations/CardGalleryList';
import MovieSectionStyle from '../../styles/sections/MovieSectionStyle';
import { ButtonStyle } from '../../styles/CommonStyle';

const MoviesSection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  const { movies } = useSelector((store) => store.movie.toJS());

  const createMovieDescription = (movie) => (
    <div className="wrapper__content">
      <p>
        { movie.title }
      </p>
      <i>{ movie.movieNmEn ? movie.movieNmEn : '-' }</i>
    </div>
  );

  const items = useMemo(() => _.map(movies, (movie) => ({
    key: movie.id,
    img: movie.poster,
    desc: createMovieDescription(movie),
  })), [movies]);

  return (
    <div className="card__section--wrapper" css={MovieSectionStyle}>
      <div className="wrapper">
        <CardGalleryList items={items} />
        <button type="button" onClick={() => console.log('view more')} css={ButtonStyle}> View More</button>
      </div>
    </div>
  );
};

export default MoviesSection;
