import React, { Component } from "react";
import ZipInput from "./ZipInput";
import FiveDayList from "./FiveDayList";
import Timer from "./Timer";
import GetWeatherDataFromZip from "../api/OpenWeatherMap";
import ViewHeader from "./ViewHeader";
import ZipDropdown from "./ZipDropdown";
import "../css/app.css";

class App extends Component {
  state = {
    view: "edit", //either view or edit
    currentZip: "",
    currentData: {},
    errors: [],
    savedZips: []
  };
  constructor(props) {
    super(props);
    this.currentData = [];
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ number: this.state.number + 1 });
    }, 1000);
  }

  handleTimerRefresh = () => {
    console.log("handleTimerRefresh");
    this.handleSubmit(this.state.currentZip);
  };

  handleSubmit(zip) {
    //test for valid zip

    console.log("zip input", zip);
    this.setState({ errors: [] });
    GetWeatherDataFromZip(zip)
      .then(data => {
        this.setState({ currentData: data, view: "view", currentZip: zip });
      })
      .catch(error => {
        let newErrorArray = this.state.errors.concat(
          "We had trouble getting a forecast for that zip code... Are you sure it's correct?"
        );
        this.setState({ errors: newErrorArray });
      });
  }

  handleClickCancel = () => {
    this.setState({ currentData: {}, view: "edit" });
  };

  handleClickAdd = () => {
    if (this.state.savedZips.indexOf(this.state.currentZip) === -1) {
      let newAr = this.state.savedZips.concat(this.state.currentZip);
      this.setState({ savedZips: newAr });
    }
  };

  handleRemove = zip => {
    let newAr = this.state.savedZips;
    let index = newAr.indexOf(zip);
    newAr.splice(index, 1);
    this.setState({ savedZips: newAr });
  };

  handleReorder = zipArray => {
    this.setState({ savedZips: zipArray });
  };

  render() {
    const zipIsSaved = this.state.savedZips.indexOf(this.state.currentZip) >= 0;
    return (
      <div className="page-container">
        <div className="page-background" />
        {this.state.view === "edit" ? (
          <ZipInput
            handleSubmit={zip => this.handleSubmit(zip)}
            errors={this.state.errors}
          />
        ) : (
          <div className="view-container">
            <Timer
              refreshCall={this.handleTimerRefresh}
              timer={this.state.timer}
            />

            <ViewHeader
              zip={this.state.currentZip}
              handleClickCancel={this.handleClickCancel}
              handleClickAdd={this.handleClickAdd}
              isSaved={zipIsSaved}
            >
              {this.state.savedZips.length > 0 && (
                <ZipDropdown
                  savedZips={this.state.savedZips}
                  handleClickZip={zip => this.handleSubmit(zip)}
                  handleClickRemove={zip => this.handleRemove(zip)}
                  handleReorder={zipArray => this.handleReorder(zipArray)}
                />
              )}
            </ViewHeader>
            <FiveDayList currentData={this.state.currentData} />
          </div>
        )}
      </div>
    );
  }
}
//props.handleClickZip(zip)

export default App;
