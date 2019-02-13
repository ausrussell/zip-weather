import React, { Component } from "react";
import OneDay from "./OneDay";
import "../css/day-display.css";

const FiveDayItem = ({ day, data, handleClick }) => {
  const handleCardClick = () => {
    handleClick(day);
  };
  return (
    <div className="day-card" key={day} onClick={handleCardClick}>
      <h2> {day}</h2>
      <div className="day-card__details">
        <div className="day-card__description">{data.summary.description}</div>
        <div>High {parseInt(data.summary.high, 10)}</div>
        <div>Low {parseInt(data.summary.low, 10)}</div>
      </div>
    </div>
  );
};

class FiveDayList extends Component {
  state = {
    data: this.props.currentData, //data includes summary and details
    view: "five-day" //toggles with day string if selected
  };

  constructor(props) {
    super(props);
    this.selectedDay = "";
  }

  componentDidUpdate(prevProps) {}
  handleClick(day) {
    this.setState({ view: day.day });
  }
  handleReturnClick = () => {
    this.setState({ view: "five-day" });
  };
  render5Days() {
    let dayArr = Object.entries(this.props.currentData);
    return (
      <div className="five-day-holder">
        {dayArr.map(([day, dayObj]) => {
          return (
            <div key={day} className="five-day-card">
              <FiveDayItem
                day={day.split(",")[0]}
                data={dayObj}
                handleClick={() => this.handleClick({ day })}
              />
            </div>
          );
        })}
      </div>
    );
  }

  render1Day() {
    return (
      <div className="one-day-card">
        <OneDay
          day={this.state.view}
          data={this.props.currentData[this.state.view].details}
          handleReturnClick={this.handleReturnClick}
        />
      </div>
    );
  }
  render() {
    const fiveDayView = this.state.view === "five-day";
    return (
      <div className="days-holder">
        {fiveDayView ? this.render5Days() : this.render1Day()}
      </div>
    );
  }
}

export default FiveDayList;
