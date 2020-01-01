import React, { useState } from 'react';
import Loader from './Loader';

export default function FilmPreview({ movie, openMovie }) {
  const [loading, setLoading] = useState(true);

  const imageLoaded = () => {
    setLoading(false);
  };

  const posterSrc =
    'https://image.tmdb.org/t/p/w500/' + movie.poster_path ||
    './img/posterPH.png';

  return (
    <div className="movie">
      <div style={{ display: loading ? 'block' : 'none' }}>
        <Loader />
      </div>
      <button
        style={{ display: loading ? 'none' : 'flex' }}
        onClick={openMovie}
      >
        <div className="hover">
          {movie.title}
          <small>{movie.original_title}</small>
        </div>
        <img src={posterSrc} alt={movie.title} onLoad={imageLoaded} />
      </button>
    </div>
  );
}
