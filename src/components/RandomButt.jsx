import React from 'react';
import MoviePreview from './MoviePreview';
import FilmPage from './FilmPage';
import { getMovie } from '../tmdbApi';

const createQuery = ({ rating, dates, genres, certification }) => {
  let query = [
    `primary_release_date.gte=${dates.min}-01-01&primary_release_date.lte=${dates.max}-12-31`
  ];
  query.push(`vote_average.gte=${rating.min}&vote_average.lte=${rating.max}`);
  if (genres.length) query.push('with_genres=' + genres.join(','));
  if (certification) query.push('certification_country=US&certification.gte=R');
  return query.join('&');
};

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedMovie: null,
      openFilmPage: false,
      noMovie: false
    };
  }

  getRandomMovie() {
    const random = (min, max) =>
      Math.round(min - 0.5 + Math.random() * (max - min + 1));

    const query = this.props.filters ? createQuery(this.props.filters) : '';

    this.setState({ loadedMovie: null, noMovie: false });
    const flipElem = document.getElementById('flip').classList;
    flipElem.add('flipping');

    getMovie(query).then(allMovies => {
      if (!allMovies.total_results) {
        return this.setState({ noMovie: true });
      }
      const page = random(1, allMovies.total_pages);
      getMovie(query, page).then(moviesAtPage => {
        const movieIndex = random(0, moviesAtPage.results.length - 1);
        this.setState({ loadedMovie: moviesAtPage.results[movieIndex] }, () => {
          flipElem.remove('flipping');
        });
      });
    });
  }

  render() {
    return (
      <div className="random-wrapper">
        {this.state.openFilmPage && (
          <FilmPage
            movie={this.state.loadedMovie}
            close={() => this.setState({ openFilmPage: false })}
          />
        )}
        <button onClick={() => this.getRandomMovie()}>
          <div className="flip-card">
            <div id="flip" className="flip-card-inner">
              <div className="flip-card-front">
                <span role="img" aria-label="cube">
                  &#127922;
                </span>
              </div>
              <div className="flip-card-back">
                <span role="img" aria-label="cube">
                  &#127922;
                </span>
              </div>
            </div>
          </div>
        </button>
        <div className="movie-preview">
          {this.state.loadedMovie && (
            <MoviePreview
              movie={this.state.loadedMovie}
              openMovie={() => this.setState({ openFilmPage: true })}
            />
          )}
          {this.state.noMovie && (
            <div className="error">
              Упс, кажется у нас нет таких фильмов...&nbsp;
              <span role="img" aria-label="sad">
                &#129301;
              </span>
              <br />
              <small>попробуйте изменить фильтры</small>
              &nbsp;
              <span role="img" aria-label="hug">
                &#129303;
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
