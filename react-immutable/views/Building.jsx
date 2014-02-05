/** @jsx React.DOM */
var React = require("react");
var Floor = require("./Floor");
var commandDispatcher = require("../commandDispatcher");

var Building = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.building !== this.props.building;
  },

  render: function() {
    return (
      <div className="building-container">
        <div className="building">
          {this.renderFloors()}
        </div>
        <a className="add-floor" href="#" onClick={this.handleAddFloorClick}>+</a>
      </div>
    );
  },

  renderFloors: function() {
    var buildingId = this.props.buildingId;
    return this.props.building.floors.map(function(floor, index) {
      return <Floor key={index} floorId={buildingId.concat(index)} floor={floor} />
    });
  },

  handleAddFloorClick: function(e) {
    e.preventDefault();
    commandDispatcher.dispatch("addFloor", {
      buildingId: this.props.buildingId
    });
    return false;
  }
});

module.exports = Building;

