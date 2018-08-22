import React, { Component } from 'react';
import './App.css';
import DateNodes from './DateNodes.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datesArray: [],
      date: new Date(),
      monthIsOffset: false,
      monthOffset: new Date().getMonth(),
      yearOffset: new Date().getFullYear()
    }
    this.leftArrowClick = this.leftArrowClick.bind(this)
    this.rightArrowClick = this.rightArrowClick.bind(this)
  }

  fillCalendar(year,month) {
    let monthStart = new Date(year,month,1).getDay()
    let yearType = false;
    let filledNodes = 0;
    // Check for leap year
    (year%4 === 0) ? 
      (year%100 === 0) ?
        (year%400) ? yearType = true : yearType = false : 
      yearType = true : 
    yearType = false
    const monthArrays = yearType ? [31,29,31,30,31,30,31,31,30,31,30,31] : [31,28,31,30,31,30,31,31,30,31,30,31]
    if (month === 0) { month = 12; }
    let leadDayStart = monthArrays[month-1] - monthStart + 1
    // Loop out lead date numbers
    let datesArray = []
    for (let i = 0; i < monthStart; i++) {
      datesArray.push({date: leadDayStart, type: "leadDate", id: "leadDate" + i})
      leadDayStart++
      filledNodes++
    }
    if (month === 12) { month = 0; }
    // Loop out month's date numbers
    for (let i = 0; i < monthArrays[month]; i++) {
      datesArray.push({date: i + 1, type: "monthDate", id: "monthDate" + i})
      filledNodes++
    }
    // fill the empty remaining cells in the calendar
    let remainingNodes = 42 - filledNodes;
    for (let i = 0; i < remainingNodes; i++) {
      datesArray.push({date: i + 1, type: "postDate", id: "postDate" + i})
    }
    this.setState({ datesArray: datesArray })
  }

  componentWillMount() {
    const cYear = this.state.date.getFullYear()
    const cMonth = this.state.date.getMonth()
    this.fillCalendar(cYear, cMonth)
  }
  componentDidMount() {
    // Loop out weekday names
    const wkDayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const wkDaysContainer = document.getElementById('wkDays')
    for (let i = 0; i < 7; i++) {
      let wkDayNode = document.createElement("div");
      wkDayNode.textContent = wkDayNames[i];
      wkDayNode.setAttribute("id", "wkDayNode" + i);
      wkDayNode.setAttribute("class", "wkDayNode");
      wkDaysContainer.appendChild(wkDayNode);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { yearOffset, monthOffset } = this.state
    if (this.state.monthOffset !== prevState.monthOffset) {
      this.fillCalendar(yearOffset, monthOffset)
    }
  }

  leftArrowClick(e) {
    const { monthOffset, yearOffset, date } = this.state
    const cMonth = date.getMonth();
    const cYear = date.getFullYear();
    this.setState(( monthOffset === 0 ) ? {
      monthOffset: 11,
      yearOffset: yearOffset - 1
    } : {
      monthOffset: monthOffset - 1,
    }, () => {
      const { monthOffset, yearOffset } = this.state
      this.setState({ monthIsOffset: ( monthOffset === cMonth && yearOffset === cYear ) ? false : true })
    })
  }
  rightArrowClick(e) {
    const { monthOffset, yearOffset, date } = this.state
    const cMonth = date.getMonth();
    const cYear = date.getFullYear();
    this.setState((monthOffset === 11) ? {
      monthOffset: 0,
      yearOffset: yearOffset + 1
    } : {
      monthOffset: monthOffset + 1
    }, () => {
      const { monthOffset, yearOffset } = this.state
      this.setState({ monthIsOffset: ( monthOffset === cMonth && yearOffset === cYear ) ? false : true })
    })
  }

  render() {
    const { datesArray, monthIsOffset } = this.state
    return (
      <div className="App">
        <div className="calendar">
          <div className="ui">
            <div className="c-header">

            </div>
            <div className="c-header2">
              
            </div>
            <div className="arrow-btns">
              <div id="right-arrow" onClick={this.rightArrowClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.3 4" height="60px" width="60px">
                  <title>Asset 1</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                      <polygon points="0 1.5 5 1.5 4 0 5 0 6.3 2 5 4 4 4 5 2.5 0 2.5 0 1.5"/>
                    </g>
                  </g>
                </svg>
              </div>
              <div id="left-arrow" onClick={this.leftArrowClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.3 4" height="60px" width="60px">
                  <title>Asset 1</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                      <polygon points="0 1.5 5 1.5 4 0 5 0 6.3 2 5 4 4 4 5 2.5 0 2.5 0 1.5"/>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="display">
            <div className="d-wkDays" id="wkDays">

            </div>
            <DateNodes datesArray={datesArray} monthIsOffset={monthIsOffset}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
