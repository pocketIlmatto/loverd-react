import React, { Fragment } from 'react';
const SiteData = ({ siteData }) => (
  <Fragment>
    {siteData.map((siteDatum) =>
      <div key={siteDatum.id} className="flex border-b border-solid border-grey-light">
        <div className="w-3/4 p-4">
          <h3>{siteDatum.parameterType} - {siteDatum.timestamp}</h3>
          <p className="text-grey-darker">
          {siteDatum.value} {siteDatum.unit}
          </p>
        </div>
      </div>
    )}
  </Fragment>
);

export default SiteData;
