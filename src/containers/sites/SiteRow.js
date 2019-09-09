import React, { Component } from 'react';
import SparkMultiChart from '../../components/SparkMultiChart';

class SiteRow extends Component {

  buildChartData(siteData) {
    let chartData = {}
    for (var i = 0; i < siteData.length ; i++) {
      const groupBy = siteData[i].forecastModel || 'none';
      if (groupBy in chartData) {
        chartData[groupBy].push(siteData[i].value)
      } else {
        chartData[groupBy] = [siteData[i].value]
      }
    }
    return chartData;
  }

  render() {
    const { chartOptions, site } = this.props;
    const chartData = this.buildChartData(site.filteredSiteData);

    return (
      <div key={site.id} className="w-full site-entry-row-container">
        <div className="flex site-entry-row">
          <div className="font-bold text-xl mt-2 mb-2 w-1/2 site-name">
            {site.name}
          </div>
          <div className="w-1/2 m-8 site-chart" key={'cjs-' + site.id}>
            <SparkMultiChart chartOptions={chartOptions} data={chartData} />
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

export default SiteRow;
