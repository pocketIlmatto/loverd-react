import React, { Component } from 'react';
import SparkLineChart from '../../components/SparkLineChart';
import SparkBarChart from '../../components/SparkBarChart';

class SiteRow extends Component {

  buildChart(chartType, chartData) {
    switch(chartType) {
      case 'line':
        return (<SparkLineChart data={chartData} color={'#70cad1'}/>)
      case 'bar':
        return (<SparkBarChart data={chartData} color={'#70cad1'}/>)
      default:
        return (<SparkLineChart data={chartData} color={'#70cad1'}/>)
      }
  }

  render() {
    const { chartType, site } = this.props;
    const chartData = site.filteredSiteData.map(d => d.value);
    const chart = this.buildChart(chartType, chartData);

    return (
      <div key={site.id} className="w-full site-entry-row-container">
        <div className="flex site-entry-row">
          <div className="font-bold text-xl mb-2 w-1/2 site-name">
            {site.name}
          </div>
          <div className="w-1/2 mb-1 site-chart" key={'cjs-' + site.id}>
            {chart}
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

export default SiteRow;
