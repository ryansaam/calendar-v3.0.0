import React from 'react';
import './App.css';
import Calendar from './calendar/Calendar'
import { redflat } from './calendar/calendar.colors'

const App = () => {
  return (
    <div className="App">
      <Calendar 
        date={new Date()}
        colors={redflat}
      />
    </div>
  )
}

export default App;
