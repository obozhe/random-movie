import React from 'react';
import WeeksHot from './components/WeeksHot';
import RandomButt from './components/RandomButt';
import ParticleJS from './components/ParticleJS';
import Filters from './components/Filters';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loadedMovie: null,
      filters: null
    };
  }

  render() {
    return (
      <div class="App">
        <ParticleJS />
        <WeeksHot id="weeksHot" />
        <div id="main" className="main">
          <RandomButt
            filters={this.state.filters}
            openMovie={movie => this.setState({ openFilmPage: movie })}
          />
          <Filters setFilters={filters => this.setState({ filters })} />
        </div>
      </div>
    );
  }
}
