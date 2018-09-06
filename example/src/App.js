import React, { Component } from 'react'

import Calendar, { colorTheme } from 'colorful-calendar'
import './Calendar.css'
import './mediaqueries.css'

export default class App extends Component {
  render () {
    return (
      <div>
        <Calendar 
          date={ new Date() }
          colors={ colorTheme.original }
        />
      </div>
    )
  }
}
