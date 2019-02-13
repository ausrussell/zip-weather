import React, { Component } from "react";
import "../css/view-header.css";

class ViewHeader extends Component {
  render() {
    return (
      <div className="view-header">
        <div className="view-header__main-group">
          <h2 className="view-header__title">Forecast for {this.props.zip}</h2>
          <button
            className="view-header__cancel-button"
            onClick={() => this.props.handleClickCancel()}
          >
            New
          </button>
          <button
            className="view-header__add-button"
            onClick={() => this.props.handleClickAdd()}
          >
            Save{this.props.isSaved && "d"}
          </button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ViewHeader;
