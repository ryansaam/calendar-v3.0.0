import React from 'react'

function TextWindow(props) {
  return (
    <React.Fragment>
      <div className="c-header" style={{background: props.header1BG}}>
        <span>{new Date().toDateString()}</span>
      </div>
      <div className="c-header2" style={{background: props.header2BG}}>
        <div className="container-3d">
          <div className="box-3d" style={{ transform: "rotateY("+props.rotateY+"deg)" }}>
            <div id="front" style={{background: props.header2BG}}>{props.monthGroup[0]}</div>
            <div id="right" style={{background: props.header2BG}}>{props.monthGroup[1]}</div>
            <div id="back" style={{background: props.header2BG}}>{props.monthGroup[2]}</div>
            <div id="left" style={{background: props.header2BG}}>{props.monthGroup[3]}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TextWindow