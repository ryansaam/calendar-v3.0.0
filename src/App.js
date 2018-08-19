import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const date = new Date()
    const wkDayNames = ["Sun","Mon","Tu","Wed","Th","Fri","Sat"]
    const datesContainer = document.getElementById('display')
    const wkDaysContainer = document.getElementById('wkDays')
    const cYear = date.getFullYear()
    let yearOffset = new Date().getFullYear()
    const cMonth = date.getMonth()
    let monthOffset = new Date().getMonth()
    let monthIsOffset = false
    // Loop out weekday names
    for (let i = 0; i < 7; i++) {
      let wkDayNode = document.createElement("div");
      wkDayNode.textContent = wkDayNames[i];
      wkDayNode.setAttribute("id", "wkDayNode" + i);
      wkDayNode.setAttribute("class", "wkDayNode");
      wkDaysContainer.appendChild(wkDayNode);
    }
    // Loop out month's date numbers
    for (let i = 0; i < 42; i++) {
      let dateNode = document.createElement("div");
      dateNode.setAttribute("class", "dateNode");
      datesContainer.appendChild(dateNode);
    }
    let dateNodes = document.querySelectorAll(".dateNode")
    let dates = [];
    function fillCalendar(year,month) {
      console.log(month)
      monthIsOffset = (month === cMonth && year === cYear) ? false : true
      if (month - 1 === 11) { month = 0; monthOffset = 0; console.log("true"); console.log(month)}
      if (month === 13) { month = 1; monthOffset = 1; console.log("true"); console.log(month)}
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
      if (month - 1 === -1) { month = 12; monthOffset = 12; console.log("true"); console.log(month)}
      let leadDayStart = monthArrays[month-1] - monthStart + 1
      // Loop out lead date numbers
      for (let i = 0; i < monthStart; i++) {
        dateNodes[i].style.background = "#8ee5ff"
        let span = document.createElement("span")
        span.textContent = leadDayStart
        span.setAttribute("class", "number")
        dateNodes[i].appendChild(span);
        //dateNodes[i].textContent = leadDayStart;
        leadDayStart++
        filledNodes++
      }
      if (month + 1 === 13) { month = 0; console.log("true"); console.log(month)}
      // Loop out month's date numbers
      for (let i = 0; i < monthArrays[month]; i++) {
        dateNodes[filledNodes].style.background = "#ffffff"
        let span = document.createElement("span")
        span.textContent = i + 1
        span.setAttribute("class", "number")
        dateNodes[filledNodes].appendChild(span);
        //dateNodes[filledNodes].textContent = i + 1;
        if (date.getDate() === i+1 && !monthIsOffset) { 
          dateNodes[filledNodes].style.background = "#c4c1c1"
        };
        filledNodes++
      }
      // fill the empty remaining cells in the calendar
      let remainingNodes = 42 - filledNodes
      for (let i = 0; i < remainingNodes; i++) {
        dateNodes[filledNodes].style.background = "#8ee5ff"
        let span = document.createElement("span")
        span.textContent = i + 1
        span.setAttribute("class", "number")
        dateNodes[filledNodes].appendChild(span);
        //dateNodes[filledNodes].textContent = i + 1;
        filledNodes++
      }
      return dates = document.querySelectorAll(".number");
    }
    fillCalendar(cYear,cMonth);
    console.log(dates)
    // ui module
    let rotate = 0
    document.getElementById("right-arrow").addEventListener("click", (e) => {
      dates[0].classList.add("rotateNumber")
      console.log(dates)
      rotate -= 90;
      // Reset the calendar cells
      (function filp(i) {
        setTimeout(() => {
          dateNodes[i].style.transform = "rotateY("+rotate+"deg)"
          dateNodes[i].removeChild(dateNodes[i].firstChild)
          if (i !==  41) {i++;filp(i)} else {
            rotate -= 90
            monthOffset--
            if (monthOffset === 11) { yearOffset--; console.log("true"); console.log(yearOffset)}
            fillCalendar(yearOffset,monthOffset);

            (function filp(j) {
              setTimeout(() => {
                dateNodes[j].style.transform = "rotateY("+rotate+"deg)"
                if (j !== 41) {j++;filp(j)}
              }, 5)
            })(0);
          }
        }, 5)
      })(0);
      // rotate -= 90
      // // Reset the calendar cells
      // for (let i = 0; i < 42; i++) {
      //   dateNodes[i].style.transform = "rotateY("+rotate+"deg)"
      //   dateNodes[i].removeChild(dateNodes[i].firstChild)
      // }
      // rotate -= 90
      // monthOffset--
      // if (monthOffset === 11) { yearOffset--; console.log("true"); console.log(yearOffset)}
      // fillCalendar(yearOffset,monthOffset)
      // for (let i = 0; i < 42; i++) {
      //   dateNodes[i].style.transform = "rotateY("+rotate+"deg)"
      // }
    })
    document.getElementById("left-arrow").addEventListener("click", (e) => {
      rotate += 90;
      // Reset the calendar cells
      (function filp(i) {
        setTimeout(() => {
          dateNodes[i].style.transform = "rotateY("+rotate+"deg)"
          dateNodes[i].removeChild(dateNodes[i].firstChild)
          if (i !==  41) {i++;filp(i)} else {
            rotate += 90
            monthOffset++
            if (monthOffset === 12) { yearOffset++; console.log("true"); console.log(yearOffset)}
            fillCalendar(yearOffset,monthOffset);

            (function filp(i) {
              setTimeout(() => {
                dateNodes[i].style.transform = "rotateY("+rotate+"deg)"
                if (i !== 41) {i++;filp(i)}
              }, 5)
            })(0);
          }
        }, 5)
      })(0);
      // for (let i = 0; i < 42; i++) {
      //   dateNodes[i].style.transform = "rotateY("+rotate+"deg)"
      //   dateNodes[i].removeChild(dateNodes[i].firstChild)
      // }
      // rotate += 90
      // monthOffset++
      // if (monthOffset === 12) { yearOffset++; console.log("true"); console.log(yearOffset)}
      // fillCalendar(yearOffset,monthOffset)
      // for (let i = 0; i < 42; i++) {
      //     dateNodes[i].style.transform = "rotateY("+rotate+"deg)"
      // }
    })
  }
  render() {
    return (
      <div className="App">
        <div className="calendar">
          <div className="ui">
            <div className="c-header">

            </div>
            <div className="c-header2">
              
            </div>
            <div className="arrow-btns">
              <div id="left-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.3 4" height="60px" width="60px">
                  <title>Asset 1</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                      <polygon points="0 1.5 5 1.5 4 0 5 0 6.3 2 5 4 4 4 5 2.5 0 2.5 0 1.5"/>
                    </g>
                  </g>
                </svg>
              </div>
              <div id="right-arrow">
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
            <div className="d-numbers" id="display">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
