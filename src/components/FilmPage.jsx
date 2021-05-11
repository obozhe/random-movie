import React, { useState } from 'react';
import { genres } from '../tmdbApi';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import Loader from './Loader';

export default function FilmPage({ movie, close }) {
  const [loading, setLoading] = useState(true);

  const imageLoaded = () => {
    setLoading(false);
  };

  const posterSrc =
    'https://image.tmdb.org/t/p/w500/' + movie.poster_path ||
    './img/posterPH.png';

  return (
    <div className="filmpage-wrapper">
      <button className="fullpage-btn" onClick={close} />
      <div style={{ display: loading ? 'block' : 'none' }}>
        <Loader />
      </div>
      <div style={{ display: loading ? 'none' : 'flex' }} className="filmpage">
        <div className="poster">
          <img src={posterSrc} alt={movie.title} onLoad={imageLoaded} />
        </div>
        <div className="film-body">
          <div className="title">
            {movie.title} <small>{movie.original_title}</small>
            <br />
            <small>
              {movie.genre_ids.map((id) =>
                genres
                  .filter((genre) => genre.id === id)
                  .map((genre) => genre.name + ' ')
              )}
            </small>
          </div>
          <div className="description">{movie.overview}</div>
          <div className="extra-info">
            <span>
              <span role="img" aria-label="release_date">
                &#128197;
              </span>
              &nbsp;
              {movie.release_date.split('-').reverse().join('.')}
            </span>
            <span>
              {movie.vote_average}&nbsp;
              <span role="img" aria-label="vote_average">
                &#11088;
              </span>
            </span>
          </div>
        </div>
        <button className="close-but" onClick={close}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
