import React, { Component } from 'react';
import { Dropdown } from 'reactjs-dropdown-component';
import { viewTypeMap } from './Sites';

class SitesHeader extends Component {
  constructor(props) {
    super(props)
    let { selectedView } = this.props;

    const view = this.buildViewObject(selectedView);
    this.state = {
      selectedView: selectedView,
      view: view
    };
  }

  buildViewObject(selectedView) {
    return Object.keys(viewTypeMap).map((key, index) => {
      return { id: index, title: viewTypeMap[key][1],
        selected: key === selectedView,
        viewKey: key,
        key: 'view'
      }
    });
  }

  resetThenSet = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]));
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      selectedView: temp[id].viewKey,
      [key]: temp
    });

    this.props.selectedViewChange(temp[id].viewKey);
  }

  render () {
    return (
        <div className="w-full" id="site-list-header">
          <div className="flex site-header-row bg-gray-500">
            <div className="font-bold text-xl mb-2 ml-2 w-3/4">L Over D</div>
            <div className="w-1/4 mb-1 site-data-view-dd">
              <Dropdown
                title="Select view"
                list={this.state.view}
                resetThenSet={this.resetThenSet}
              />
            </div>
          </div>
        </div>
    );
  }
}

export default SitesHeader;
