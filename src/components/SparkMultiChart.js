import React, { Component } from 'react';
import { Chart } from 'chart.js';

const colorMap = {
  gfs: '#DAF7A6',
  hrrr: '#FFC300',
  nam3: '#FF5733',
  nam12: '#C70039 ',
  none: '#70cad1'
}

class SparkMultiChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const options = {
      // TODO : Move the legend out since it will be the same with every graph
      legend: {
        display: this.props.chartOptions.displayLegend
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
      scaleShowLabels : false,
      global: {
        responsive: true,
        maintainAspectRatio: true
      }
    };

    const datasets = this.buildDatasets();
    this.myChart = new Chart(this.chartRef.current, {
      type: this.props.chartOptions.chartType,
      data: {
        labels: Object.keys(this.props.data).map(d => ''),
        datasets: datasets
      },
      options: options
    });
  }

  buildDatasets(){
    return Object.keys(this.props.data).map((key, index) => {
      return {
        label: key,
        data: this.props.data[key],
        backgroundColor: colorMap[key],
        borderColor: colorMap[key],
        borderWidth: 1,
        fill: this.props.chartOptions.chartType !== 'line'
      }
    })
  }

  componentDidUpdate() {
    // TODO: Implement
    // this.myChart.data.labels = this.props.data.map(d => '');
    // this.myChart.data.datasets[0].data = this.props.data;
    // this.myChart.update();
  }

  render() {
    return (
      <canvas ref={this.chartRef} />
    );
  }
}

export default SparkMultiChart;
