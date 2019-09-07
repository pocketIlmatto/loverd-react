import React, { Component } from 'react';
import Sites from './Sites';
import Site from './Site';

class App extends Component {
  state = {
    selectedSite: null
  };

  selectSite = (site) => {
    this.setState({ selectedSite: site})
  }

  render() {
    return (
      <div className="container mx-auto px-4">
        {this.state.selectedSite ?
          <Site site={this.state.selectedSite} selectSite={this.selectSite} /> :
          <Sites selectSite={this.selectSite} />}
      </div>
    );
  }
}

export default App;