import React from 'react';

function DateNodes(props) {
  const cDate = new Date()
  const dateNodes = props.datesArray.map(date => {
    if (date.type === "leadDate") {
      return (
        <div
          className="dateNode" 
          key={date.id} 
          style={{background: props.colors.prevMonthNodesBG}}
        >
          <span>{date.date}</span>
        </div>
      )
    }
    if (date.date === cDate.getDate() && props.monthIsOffset !== true && date.type === "monthDate") {
      return (
        <div
          className="dateNode"
          key={date.id}
          style={{background: props.colors.currentDateNodeBG}}
        >
          <span>{date.date}</span>
        </div>
      )
    }
    if (date.type === "postDate") {
      return (
        <div 
          className="dateNode" 
          key={date.id} 
          style={{background: props.colors.nextMonthNodesBG}}
        >
          <span>{date.date}</span>
        </div>
      )
    }
    return (
      <div 
        className="dateNode" 
        key={date.id}
        style={{background: props.colors.currentMonthNodesBG}}
      >
        <span>{date.date}</span>
      </div>
    )
  })
  return (
    <div className="d-numbers">
      {dateNodes}
    </div>
  )
}

export default DateNodes;