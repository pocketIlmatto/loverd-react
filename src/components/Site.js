import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SiteData from './SiteData';

const SITE_QUERY = gql`
  query Site($id: ID!) {
    site(id: $id) {
      siteData {
        id
        parameterType
        value
        unit
        timestamp
      }
    }
  }
`;

const Site = ({ site, selectSite }) => (
  <Query query={SITE_QUERY} variables={{ id: site.id }}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching..</div>
      if (error) return <div>Error!</div>

      return (
        <Fragment>
          <div className="flex my-4">
            <button
              className="bg-grey-light hover:bg-grey text-grey-darkest font-bold rounded"
              onClick={selectSite.bind(this, null)}>
              Back
            </button>
          </div>
          <div className="flex mb-4">
            <div className="my-4 w-1/4 rounded">
              {site.name}
            </div>
            <div className="my-4 px-4 w-3/4">
              <SiteData siteData={data.site.siteData} />
            </div>
          </div>
        </Fragment>
      )
    }}
  </Query>
);
export default Site;
