import React, { Component } from 'react';
import { TimeSeries } from 'pondjs';
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  Baseline,
  Resizable,
  Legend,
  styler
} from 'react-timeseries-charts';
import '../../css/common.css';
const style = {
  value: {
      stroke: "#a02c2c",
      opacity: 0.2
  }
};

const baselineStyle = {
  line: {
    stroke: 'steelblue',
    strokeWidth: 1
  }
};

const baselineStyleLite = {
  line: {
    stroke: 'steelblue',
    strokeWidth: 1,
    opacity: 0.5
  }
};

const axisStyle = {
  labels: {
    labelSize: 0,
    // display: 'none'
  },
  axis: {
    axisColor: "grey",
    axisWidth: 1
  }
}
// const upDownStyle = styler([{ key: "in", color: "#C8D5B8" }, { key: "out", color: "#9BB8D7" }]);

const upDownStyle = styler([
  {key: "tds", color: "#F68B24", width: 2}
]);
export default class extends Component {
  
  state = {
    tracker: null,
    // timerange: series.range()
  };

  handleTrackerChanged = tracker => {
      this.setState({ tracker });
  };

  // handleTimeRangeChange = timerange => {
  //     this.setState({ timerange });
  // };
  
  render() {
    const series = this.props.data && new TimeSeries({
      name: "tds",
      columns: ["time", "value"],
      points: this.props.data
    }); 
    const dateStyle = {
      fontSize: 12,
      color: "#AAA",
      borderWidth: 1,
      borderColor: "#F4F4F4"
};
// let track = this.state.tracker;
// track.setFullYear(2018);
const tracker = this.state.tracker ? `${this.state.tracker}` : "";
    return (
      
    <div> 
      <div className="row-container row">
        <div className="col-md-3">
          <Legend
              type="line"
              style={upDownStyle}
              categories={[
                  { key: "tds", label: "tds" },
              ]}
          />
        </div>
        <div className="col-md-9">
          <span style={dateStyle}>{tracker}</span>
        </div>
      </div>
        <Resizable>
          {this.props.data &&
          <ChartContainer timeRange={series.range()} 
            format="%M:%S" timeAxisStyle={axisStyle} 
            enablePanZoom={true} transition={0.5}
            trackerPosition={this.state.tracker}
            onTrackerChanged={this.handleTrackerChanged}>
            <ChartRow height="150" >
              <YAxis
                  id="tds"
                  label="ppm"
                  labelOffset={-20}
                  min={series.min()}
                  max={series.max()}
                  width="60"
                  format=".2f"
              />
              <Charts width="50vw">
                <LineChart axis="tds" 
                  series={series} style={style}
                  interpolation="curveBasis"/>
              </Charts>
            </ChartRow>
          </ChartContainer>
          }
        </Resizable>
    </div>
    )
  }
}

