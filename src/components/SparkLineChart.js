import React, { Component } from 'react';
import { Chart } from 'chart.js';

class SparkLineChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const options = {
      legend: {
        display: false
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

    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      data: {
        labels: this.props.data.map(d => ''),
        datasets: [{
          label: '',
          data: this.props.data,
          backgroundColor: this.props.color,
          borderColor: this.props.color,
          borderWidth: 1,
          fill: false
        }]
      },
      options: options
    });
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => '');
    this.myChart.data.datasets[0].data = this.props.data;
    this.myChart.update();
  }

  render() {
    return (
      <canvas ref={this.chartRef} />
    );
  }
}

export default SparkLineChart;
