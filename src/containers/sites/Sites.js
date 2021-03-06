import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SiteRow from './SiteRow';

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
        forecastModel
      }
    }
  }
`;

// TODO: Eventually might want to gracefully skip depricated viewTypes based on
// querying the server in case deprication is not also fixed here manually
export const viewTypeMap = {
  current_temp: [{chartType: 'line', displayLegend: false}, 'Current T'],
  current_pressure: [{chartType: 'line', displayLegend: false}, 'Current P'],
  current_wind_speed: [{chartType: 'bar', displayLegend: false}, 'Current WS'],
  fct_temp: [{chartType: 'line', displayLegend: true}, 'Fct T'],
  fct_pressure: [{chartType: 'line', displayLegend: true}, 'Fct P'],
  fct_wind_speed: [{chartType: 'bar', displayLegend: true}, 'Fct WS'],
  flyability_score: [{chartType: 'bar', displayLegend: false}, 'Flyability']
}

class Sites extends Component {
  render() {
    let parameterType = this.props.selectedView;
    let chartOptions = {};
    if (parameterType !== '') {
      chartOptions = viewTypeMap[parameterType][0];
    }

    return (
      <Query query={GET_SITES} variables={{ parameterType }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching..</div>
          if (error) return <div>Error!</div>
          return (
            <div className="flex flex-wrap sites-list">
              {data.sites.map((site) => { return <SiteRow site={site} key={site.id} chartOptions={chartOptions} /> } )}
            </div>
          )
        }}
      </Query>
      )
  }
}
export default Sites
