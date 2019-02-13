import React from "react";

const OneDay = ({ day, data, handleReturnClick }) => {
  const handleButtonClick = () => {
    handleReturnClick();
  };

  const render3hourlyList = () => {
    return (
      <div className="one-day__table">
        <div className="one-day__3hour-unit one-day__3hour-unit--header">
          <div className="day-cell" />
          <div className="day-cell" />
          <div className="day-cell">F</div>
          <div className="day-cell">Clouds</div>
          <div className="day-cell">Rain</div>
          <div className="day-cell">Wind</div>
        </div>
        {data.map(item => {
          return (
            <div className="one-day-row" key={item.dt}>
              {renderThreeHourlyItem(item)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderThreeHourlyItem = item => {
    const formatTime = time => {
      console.log("time", time);
      var date = new Date(0);
      date.setUTCSeconds(time);

      let hours = date.getHours() + ":00";
      return hours;
    };
    return (
      <div className="one-day__3hour-unit">
        <div className="day-cell">{formatTime(item.dt)} </div>
        <div className="day-cell">{item.weather[0].description} </div>
        <div className="day-cell">{parseInt(item.main.temp, 10)}&#8457; </div>
        <div className="day-cell">{item.clouds.all}% </div>
        <div className="day-cell">
          {item.rain && `${parseInt(item.rain["3h"], 10)}`}mm
        </div>
        <div className="day-cell">
          {parseInt(item.wind.speed, 10)}mph from {parseInt(item.wind.deg, 10)}
          &#176;
        </div>
      </div>
    );
  };

  return (
    <div className="one-day-holder">
      <button className="return-button" onClick={handleButtonClick}>
        5 day view
      </button>
      <h3>{day}</h3>
      <div className="one-day-card">{render3hourlyList()}</div>
    </div>
  );
};

export default OneDay;
