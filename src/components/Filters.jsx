import React, { Component } from 'react';
import { genres } from '../tmdbApi';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

export default class Filters extends Component {
  constructor(props) {
    super(props);

    this.year = new Date().getYear() + 1900;

    this.state = {
      rating: { min: 6.5, max: 9 },
      dates: { min: 2010, max: this.year },
      genres: [],
      certification: false,
      openFilters: false,
      useFilters: false
    };

    this.props.setFilters(null);

    this.filters = React.createRef();
    this.filtersWrapper = React.createRef();
  }

  componentDidUpdate(_, previousState) {
    if (previousState !== this.state) {
      this.state.useFilters
        ? this.props.setFilters({
            rating: this.state.rating,
            dates: this.state.dates,
            genres: this.state.genres,
            certification: this.state.certification
          })
        : this.props.setFilters(null);
    }

    if (this.state.openFilters) {
      this.filtersWrapper.current.style.transform = 'translateY(0)';
    } else {
      const height = this.filters.current.offsetHeight;
      this.filtersWrapper.current.style.transform = `translateY(${height}px)`;
      this.filtersWrapper.current.style.transition = '0.3s';
    }
  }

  toogleGenre = (checked, genreId) => {
    if (checked) {
      this.setState({ genres: [genreId, ...this.state.genres] });
    } else {
      let genres = this.state.genres;
      genres = genres.splice(genres.indexOf(genreId), 1);
      this.setState({ genres });
    }
  };

  toogleOpen = () => {
    this.setState({ openFilters: !this.state.openFilters, useFilters: true });
  };

  render() {
    return (
      <div ref={this.filtersWrapper} className="filters-wrapper">
        <div className="open">
          <button onClick={this.toogleOpen}>
            {this.state.useFilters
              ? this.state.openFilters
                ? 'скрыть фильтры'
                : 'показать фильтры'
              : 'применить фильтры'}
          </button>
          {this.state.useFilters && (
            <button
              onClick={() =>
                this.setState({ useFilters: false, openFilters: false })
              }
            >
              сбросить фильтры
            </button>
          )}
        </div>
        <div ref={this.filters} className="filters">
          <div className="left">
            <div className="rating">
              <InputRange
                maxValue={9}
                minValue={0}
                step={0.5}
                value={this.state.rating}
                onChange={rating => this.setState({ rating })}
                allowSameValues
              />
            </div>
            <div className="dates">
              <InputRange
                maxValue={this.year}
                minValue={1950}
                value={this.state.dates}
                onChange={dates => this.setState({ dates })}
                allowSameValues
              />
            </div>
            <label className="certification">
              <input
                className="cb cb1"
                type="checkbox"
                name="social"
                onClick={e =>
                  this.setState({ certification: e.target.checked })
                }
              />
              <i></i>
              <span>Возрастной рейтинг 18+</span>
            </label>
          </div>

          <div className="right">
            <div className="genres-wrapper">
              <ul className="genres">
                {genres.map((genre, i) => (
                  <li key={i}>
                    <input
                      type="checkbox"
                      id={genre.id}
                      value={genre.id}
                      onClick={e => {
                        this.toogleGenre(
                          e.target.checked,
                          parseInt(e.target.value)
                        );
                      }}
                    />
                    <label htmlFor={genre.id}>{genre.name}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
