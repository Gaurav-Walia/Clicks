import React from 'react';
import logo from './logo.svg';
import './Solution.css';
let _ = require("underscore");
let data = { clicks: require('./clicks.json') }

class Solution extends React.Component {
  constructor() {
    super();

    // initialize state with clicks from clicks.json
    this.state = {
      clicks: data.clicks
    }    
    
    // binding process and writeFile method
    this.process = this.process.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }

  // method to write data to resultset.json file and download it
  downloadFile() {
    let output = this.process();
    this.setState({
      clicks: output
    });
    const fileData = JSON.stringify(output);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'resultset.json';
    link.href = url;
    link.click();
  }

  // method to work on the clicks data
  process() {
    // initialize variable declaration
    let large = {};
    let groupByTS = {};
    let result = [];
    let ipReject = [];

    // group clicks by ip, reject clicks with ip occurring more than 10
    _.groupBy(this.state.clicks, f => { ipReject = f.ip.length > 10 ? f.ip : null });

    // group clicks by timestamp
    groupByTS = _.groupBy(this.state.clicks, f => {return f.timestamp.split(" ")[1].split(":")[0]});
    
    // Iterating through the clicks data
    for (let key in groupByTS) {
      // In case ip grouped clicks have one click data, rejecting clicks inside ipReject
      // push clicks data inside result array
      if (groupByTS[key].length === 1) {
        if (ipReject !== groupByTS[key][0].ip) {
          result.push(groupByTS[key]);
        }

      // In case ip grouped clicks have more than one click data, rejecting clicks inside ipReject
      // push clicks data inside result array
      } else {
        large = groupByTS[key][0];
        for (let innerkey in groupByTS[key]) {
          if ((large.amount < groupByTS[key][innerkey].amount) && (ipReject !== groupByTS[key][innerkey].ip)){
            large = groupByTS[key][innerkey];
          }
        }
        result.push(large);
      }
    }

    // flat function is used to flatten the array
    return result.flat();    
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Developed By: Gaurav Walia</p>
          {/* link to initiate the process of pulling the requested clicks data on START */}
          <a className="App-link" onClick = { this.downloadFile } target="_blank" rel="noopener noreferrer">Download</a>
        </header>
      </div>
    )
  }
}

export default Solution;
