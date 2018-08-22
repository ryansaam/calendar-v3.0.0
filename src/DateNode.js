import React from 'react';

const color = "#8ee5ff"
let date = new Date()
let i = 0;

function DateNode(props) {
  let dateNodes = props.datesArray.map(date => {
    <div className="dateNode" key={date.id}>
      <span>date.date</span>
    </div>
  })
  return (
    <div className="d-numbers">
      {dateNodes}
    </div>
  )
}

export default DateNode;