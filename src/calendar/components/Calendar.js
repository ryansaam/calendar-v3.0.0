import React, { Component } from 'react';
import '../Calendar.css'
import { fillCalendar, route } from '../calendar.tools'
import ArrowBtn from './ArrowBtn'
import DateNodes from './DateNodes'
import TextWindow from './TextWindow'

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      monthIsOffset: false,
      monthOffset: props.date.getMonth(),
      yearOffset: props.date.getFullYear(),
      datesArray: fillCalendar(props.date.getMonth(), props.date.getFullYear()),
      rotateY: 0,
      itorator: 0,
      rightBtn: false,
      leftBtn: false,
      monthGroup: [props.monthNames[props.date.getMonth()] + props.date.getFullYear(), undefined, undefined, undefined]
    }
    this.handleMonthChange = this.handleMonthChange.bind(this)
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

  handleMonthChange(e) {
    const { monthOffset, yearOffset, rotateY, itorator, rightBtn, leftBtn } = this.state
    const cMonth = this.props.date.getMonth();
    const cYear = this.props.date.getFullYear();
    const nextMonthValues = {
      nextYear: {
        monthOffset: 0,
        yearOffset: yearOffset + 1,
        rotateY: rotateY - 90,
        itorator: route(itorator, leftBtn)
      },
      currentYear: {
        monthOffset: monthOffset + 1,
        rotateY: rotateY - 90,
        itorator: route(itorator, leftBtn)
      }
    }
    const prevMonthValues = {
      prevYear: {
        monthOffset: 11,
        yearOffset: yearOffset - 1,
        rotateY: rotateY + 90,
        itorator: route(itorator, rightBtn)
      },
      currentYear: {
        monthOffset: monthOffset - 1,
        rotateY: rotateY + 90,
        itorator: route(itorator, rightBtn)
      }
    }
    if (e.currentTarget.id === "right-arrow") {
      this.setState(( monthOffset === 11 ) ? nextMonthValues.nextYear : nextMonthValues.currentYear, () => {
        const { monthOffset, yearOffset, itorator } = this.state
        this.setState({ monthIsOffset: ( monthOffset === cMonth && yearOffset === cYear ) ? false : true })
        this.setState({rightBtn: true, leftBtn: false})
        this.setState(
          (itorator === 1) ? prevState => ({ monthGroup: [prevState.monthGroup[0], this.props.monthNames[monthOffset] + yearOffset, undefined, undefined] }) :
          (itorator === 2) ? prevState => ({ monthGroup: [undefined, prevState.monthGroup[1], this.props.monthNames[monthOffset] + yearOffset, undefined] }) :
          (itorator === 3) ? prevState => ({ monthGroup: [undefined, undefined, prevState.monthGroup[2], this.props.monthNames[monthOffset] + yearOffset] }) :
          (itorator === 4) ? prevState => ({ monthGroup: [this.props.monthNames[monthOffset] + yearOffset, undefined, undefined, prevState.monthGroup[3]], itorator: 0 }) : void 0
        )
      })
    } else {
      this.setState(( monthOffset === 0 ) ? prevMonthValues.prevYear : prevMonthValues.currentYear, () => {
        const { monthOffset, yearOffset, itorator } = this.state
        this.setState({ monthIsOffset: ( monthOffset === cMonth && yearOffset === cYear ) ? false : true })
        this.setState({rightBtn: false, leftBtn: true})
        this.setState(
          (itorator === 1) ? prevState => ({ monthGroup: [prevState.monthGroup[0], undefined, undefined, this.props.monthNames[monthOffset] + yearOffset] }) :
          (itorator === 2) ? prevState => ({ monthGroup: [undefined, undefined, this.props.monthNames[monthOffset] + yearOffset, prevState.monthGroup[3]] }) :
          (itorator === 3) ? prevState => ({ monthGroup: [undefined, this.props.monthNames[monthOffset] + yearOffset, prevState.monthGroup[2], undefined] }) :
          (itorator === 4) ? prevState => ({ monthGroup: [this.props.monthNames[monthOffset] + yearOffset, prevState.monthGroup[1], undefined, undefined], itorator: 0 }) : void 0
        )
      })
    }
  }

  render() {
    const { datesArray, monthIsOffset, rotateY, monthGroup, monthOffset } = this.state
    const { date, monthNames } = this.props
    return (
      <div className="calendar">
        <div className="ui">
          <TextWindow
            monthGroup={monthGroup}
            rotateY={rotateY} 
            monthOffset={monthOffset} 
            cMonth={date.getMonth()}
            monthNames={monthNames}
           />
          <div className="arrow-btns">
            <ArrowBtn id={"left-arrow"} eventHandler={this.handleMonthChange} />
            <ArrowBtn id={"right-arrow"} eventHandler={this.handleMonthChange} />
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