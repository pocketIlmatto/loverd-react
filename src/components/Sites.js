import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SparkLineChart from './SparkLineChart';

const GET_SITES = gql`
  query Sites($parameterType: String!) {
    sites {
      id
      name
      lat
      lon
      filteredSiteData(parameterType: $parameterType) {
        parameterType
        value
        unit
        timestamp
      }
    }
  }
`;

class Sites extends Component {
  state = {
    parameterType: "current_temp"
  };

  chartData(siteData) {
    return siteData.map((d) => {
      return d.value
    })
  }

  chartLabels(siteData) {
    return siteData.map((d) => {
      return ''
    })
  }

  render() {
    const { parameterType } = this.state;

    return (
      <Query query={GET_SITES} variables={{ parameterType }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching..</div>
          if (error) return <div>Error!</div>
          return (
            <div className="flex flex-wrap sites-list">
              {data.sites.map((site) => {
                const chartData = site.filteredSiteData.map(d => d.value);
                return <div key={site.id}
                        className="w-full site-entry-row-container"
                        onClick={this.props.selectSite.bind(this, site)}>
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
              })}
            </div>
          )
        }}
      </Query>
      )
  }
}
export default Sites
