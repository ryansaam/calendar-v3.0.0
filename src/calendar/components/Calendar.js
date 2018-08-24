import React, { Component } from 'react';
import '../Calendar.css'
import { fillCalendar } from '../calendar.tools'
import ArrowBtn from './ArrowBtn'
import DateNodes from './DateNodes'

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      monthIsOffset: false,
      monthOffset: new Date().getMonth(),
      yearOffset: new Date().getFullYear(),
      datesArray: fillCalendar(new Date().getMonth(), new Date().getFullYear())
    }
    this.handlePrevMonth = this.handlePrevMonth.bind(this)
    this.handleNextMonth = this.handleNextMonth.bind(this)
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
      this.setState({ datesArray: fillCalendar(monthOffset, yearOffset) })
    }
  }

  handlePrevMonth(e) {
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
  handleNextMonth(e) {
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
      <div className="calendar">
        <div className="ui">
          <div className="c-header">

          </div>
          <div className="c-header2">
            
          </div>
          <div className="arrow-btns">
            <ArrowBtn id={"left-arrow"} eventHandler={this.handlePrevMonth} />
            <ArrowBtn id={"right-arrow"} eventHandler={this.handleNextMonth} />
          </div>
        </div>
        <div className="display">
          <div className="d-wkDays" id="wkDays">

          </div>
          <DateNodes datesArray={datesArray} monthIsOffset={monthIsOffset} />
        </div>
      </div>
    );
  }
}

export default Calendar