import React from "react";

class Timer extends React.Component {
  state = { number: 1, windowWidth: window.innerWidth, timerWidth: 0 }; // just for the timer line

  constructor(props) {
    super(props);
    this.refreshPeriod = 600; //15; //in seconds
  }

  componentDidMount() {
    this.interval = setInterval(this.handleTimerUpdate, 1000);
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleTimerUpdate = () => {
    this.setState({ number: this.state.number + 1 });

    let timerWidth =
      (this.state.number * this.state.windowWidth) / this.refreshPeriod;
    if (this.state.number > this.refreshPeriod) {
      this.setState({ number: 1 });
      this.props.refreshCall();
    }
    this.setState({ timerWidth: timerWidth });
  };

  handleWindowResize = () => {
    this.updateWindowDimensions();
  };

  updateWindowDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  render() {
    return (
      <div className="refresh-timer">
        <div
          className="refresh-timer__background"
          style={{ width: this.state.timerWidth }}
        />
      </div>
    );
  }
}

export default Timer;
