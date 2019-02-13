import React, { Component } from "react";
import "../css/zip-input.css";

const ErrorItem = props => {
  return <div className="input-error">{props.message}</div>;
};

class ZipInput extends Component {
  state = {
    zip: "",
    errors: [] //holds array of error messages
  };
  constructor(props) {
    super(props);
    this.errorChecks = {
      characterLength: {
        message: "Zip codes have 5 characters",
        test: () => {
          return this.state.zip.length !== 5;
        }
      },
      allNumbers: {
        message: "Zip codes only have numbers!",
        test: () => {
          return isNaN(this.state.zip);
        }
      } //potentialy other tests for zips before api call
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }

    if (this.props.savedZips !== prevProps.savedZips) {
      // this.setState({ errors: this.props.errors });
    }
  }

  handleChange(event) {
    console.log(event.target.value);
    let zipInput = event.target.value;
    this.setState({ zip: zipInput });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateZip()) {
      this.props.handleSubmit(this.state.zip);
    } //call parent component with validated ZIP.
  }

  validateZip() {
    let errors = [];
    Object.values(this.errorChecks).forEach(({ message, test }) => {
      //run through form validation tests
      if (test()) errors.push(message);
    });
    this.setState({ errors: errors }); //add the message/s to error array if func fails
    return errors.length === 0;
  }

  render() {
    const errors = this.state.errors;
    return (
      <div className="zip-container">
        <div className="title-card">
          <h1>Zip Weather</h1>
          <div className="intro-text">
            Enter a zip code for a five day forecast, get details for a day and
            save your favorites!
          </div>
        </div>
        {errors.map((error, index) => (
          <ErrorItem key={index} message={error} />
        ))}
        <div>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              type="text"
              value={this.state.zip}
              onChange={e => this.handleChange(e)}
              placeholder="Please enter a Zip Code"
              className="zip-input"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default ZipInput;
