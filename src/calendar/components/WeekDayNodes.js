import React from 'react'

function WeekDayNodes(props) {
  const weekDayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  const weekDayNodes = weekDayNames.map(node => {
    return (
      <div style={{borderRight: "2px solid" + props.border}}>
        <span>{node}</span>
      </div>
    )
  })
  return weekDayNodes
}

export default WeekDayNodes