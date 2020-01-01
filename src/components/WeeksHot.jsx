import React from 'react';
import { getWeeksHot } from '../tmdbApi';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import MoviePreview from './MoviePreview';
import FilmPage from './FilmPage';
import { ReactComponent as NextIcon } from '../assets/icons/next.svg';
import { ReactComponent as BackIcon } from '../assets/icons/back.svg';
import { ReactComponent as LessIcon } from '../assets/icons/less.svg';
import { ReactComponent as MoreIcon } from '../assets/icons/more.svg';

const debounce = require('lodash.debounce');

export default class WeeksHot extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      movie: null,
      opened: true,
      slidesCount: Math.floor(window.innerWidth / 170)
    };
    this.movies = [];

    getWeeksHot().then(movies => {
      this.movies = movies;
      this.setState({ loaded: true });
    });
  }

  setSlidesCount = debounce(
    () => this.setState({ slidesCount: Math.floor(window.innerWidth / 170) }),
    200
  );

  componentDidMount() {
    window.addEventListener('resize', this.setSlidesCount);
  }

  componentDidUpdate() {
    const height =
      window.innerHeight -
      document.getElementById('weeks-hot').offsetHeight -
      38;
    document.getElementById('main').style.height = height + 'px';
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setSlidesCount);
  }

  render() {
    return (
      <div id="weeks-hot" className="weeksHot-wrapper">
        {this.state.movie && (
          <FilmPage
            movie={this.state.movie}
            close={() => this.setState({ movie: null })}
          />
        )}
        <div className="week-title">
          <button onClick={() => this.setState({ opened: !this.state.opened })}>
            <h2>Популярное</h2>
            {this.state.opened ? <LessIcon /> : <MoreIcon />}
          </button>
        </div>
        {this.state.loaded && this.state.opened && (
          <CarouselProvider
            naturalSlideWidth={1}
            naturalSlideHeight={1}
            totalSlides={this.movies.results.length}
            visibleSlides={this.state.slidesCount}
            step={this.state.slidesCount}
            infinite
          >
            <div className="carousel-buttons">
              <ButtonBack>
                <BackIcon />
              </ButtonBack>
              <ButtonNext>
                <NextIcon />
              </ButtonNext>
            </div>
            <Slider>
              {this.movies.results.map((movie, i) => (
                <Slide key={i} index={i}>
                  <MoviePreview
                    movie={movie}
                    openMovie={() => this.setState({ movie })}
                  />
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
        )}
      </div>
    );
  }
}
