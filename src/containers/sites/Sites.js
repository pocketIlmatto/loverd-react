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
      }
    }
  }
`;

class Sites extends Component {
  state = {
    parameterType: "current_temp"
  };

  render() {
    const { parameterType } = this.state;

    return (
      <Query query={GET_SITES} variables={{ parameterType }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching..</div>
          if (error) return <div>Error!</div>
          return (
            <div className="flex flex-wrap sites-list">
              {data.sites.map((site) => { return <SiteRow site={site}/>})}
            </div>
          )
        }}
      </Query>
      )
  }
}
export default Sites
