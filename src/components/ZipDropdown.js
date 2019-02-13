import React, { Component } from "react";
import "../css/zip-dropdown.css";
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
  arrayMove
} from "react-sortable-hoc";

const DragHandle = sortableHandle(() => <div className="drag-handle">::</div>);

const SortableItem = SortableElement(({ zip, onClickRemove, onClickZip }) => (
  <li className="saved-zip-item">
    <DragHandle />
    <button
      className="saved-zip-item__title"
      onClick={() => onClickZip(`${zip}`)}
    >
      {zip}
    </button>
    <button
      className="saved-zip-item__remove-button"
      onClick={() => onClickRemove(`${zip}`)}
    >
      Remove
    </button>
  </li>
));

const SortableList = SortableContainer(
  ({ items, onClickRemove, onClickZip }) => {
    return (
      <ul className="">
        {items.map((zip, index) => (
          <SortableItem
            key={`zip-item-${index}`}
            index={index}
            zip={zip}
            useDragHandle={true}
            onClickRemove={onClickRemove}
            onClickZip={onClickZip}
          />
        ))}
      </ul>
    );
  }
);

class ZipDropdown extends Component {
  state = {
    active: false //used for whether dropdown is displayed
  };

  handleArrowClick = () => {
    this.setState({ active: !this.state.active });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    let newAr = arrayMove(this.props.savedZips, oldIndex, newIndex);
    this.props.handleReorder(newAr);
  };

  render() {
    return (
      <div className="zip-dropdown">
        <div
          onClick={() => this.handleArrowClick()}
          className={`zip-dropdown__down-arrow ${this.state.active &&
            "active"}`}
          ref={div => (this.dropdownArrow = div)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <path d="M14 20l10 10 10-10z" />
          </svg>
        </div>
        <div
          className={`zip-dropdown__content ${this.state.active && "active"}`}
          ref={div => this.content}
        >
          <SortableList
            items={this.props.savedZips}
            onSortEnd={this.onSortEnd}
            onClickRemove={zip => this.props.handleClickRemove(zip)}
            onClickZip={zip => this.props.handleClickZip(zip)}
            useDragHandle
          />
        </div>
      </div>
    );
  }
}

export default ZipDropdown;
