import React, { Component } from 'react';
import Sites from './sites/Sites';
import SitesHeader from './sites/SitesHeader';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedView: ''
    };

    this.selectedViewChange = this.selectedViewChange.bind(this);
  }

  selectedViewChange(view) {
    this.setState({
      selectedView: view
    })
  }

  render() {
    const { selectedView } = this.state;

    return (
      <div className="container mx-auto px-4">
        <SitesHeader
          selectedViewChange={this.selectedViewChange}
          selectedView={selectedView}
        />
        <Sites selectedView={selectedView}/>}
      </div>
    );
  }
}

export default App;
