import React from 'react';
import './App.css';
import Calendar from './calendar/components/Calendar.js'

const App = () => {
  return (
    <div className="App">
      <Calendar 
        date={new Date()}
        monthNames={["Jan ", "Feb ", "Mar ", "Apr ", "May ", "Jun ", "Jul ", "Aug ", "Sept ", "Oct ", "Nov ", "Dec "]}
      />
    </div>
  )
}

export default App;
