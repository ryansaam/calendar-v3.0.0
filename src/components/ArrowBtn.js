import React from 'react';

function ArrowBtn(props) {
  return (
    <div id={props.id} onClick={props.eventHandler} style={{background: props.colors.arrowsBG}}>
      <svg xmlns="http://www.w3.org/2000/svg" id="arrowBtn" viewBox="0 0 6.3 4" style={{fill: props.colors.svgFill}}>
        <g id="Layer_2" data-name="Layer 2">
          <polygon points="0 1.5 5 1.5 4 0 5 0 6.3 2 5 4 4 4 5 2.5 0 2.5 0 1.5"/>
        </g>
      </svg>
    </div>
  )
}

export default ArrowBtn