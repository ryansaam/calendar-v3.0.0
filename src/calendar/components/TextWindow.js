import React from 'react'

function TextWindow(props) {
  return (
    <React.Fragment>
      <div className="c-header">
        <span>{new Date().toDateString()}</span>
      </div>
      <div className="c-header2">
        <div className="container-3d">
          <div className="box-3d" style={{ transform: "rotateY("+props.rotateY+"deg)" }}>
            <div id="front">{props.monthGroup[0]}</div>
            <div id="right">{props.monthGroup[1]}</div>
            <div id="back">{props.monthGroup[2]}</div>
            <div id="left">{props.monthGroup[3]}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TextWindow