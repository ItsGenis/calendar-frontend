import React, { useState } from 'react';
import Calendar from 'react-calendar'
import DisplayEvents from '../components/DisplayEvents';

function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <>
      <Calendar
        onClickDay={setCurrentDate}
      />
      <div>
        <h2>Events for {currentDate.toString()}</h2>
        <DisplayEvents currentDate={currentDate} />
      </div>
    </>
  );
}

export default HomePage;
