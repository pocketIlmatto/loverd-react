import React, { Component } from 'react';
import SparkLineChart from '../../components/SparkLineChart';

class SiteRow extends Component {

  render() {
    const { site } = this.props;
    const chartData = site.filteredSiteData.map(d => d.value);

    return (
      <div key={site.id} className="w-full site-entry-row-container">
        <div className="flex site-entry-row">
          <div className="font-bold text-xl mb-2 w-1/2 site-name">
            {site.name}
          </div>
          <div className="w-1/2 mb-1 site-chart" key={'cjs-' + site.id}>
            <SparkLineChart data={chartData} color={'#70cad1'}/>
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

export default SiteRow;
