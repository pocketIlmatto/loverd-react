import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const SITES_QUERY = gql`
  query {
    sites {
      id
      name
    }
  }
`;

class Sites extends Component {
  render() {
    return (
      <Query query={SITES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching..</div>
          if (error) return <div>Error!</div>
          return (
            <div className="flex flex-wrap">
              {data.sites.map((site) => {
                return <div key={site.id} className="w-full site-entry"
                        onClick={this.props.selectSite.bind(this, site)}>>
                    <div className="font-bold text-xl mb-2">{site.name}</div>
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
