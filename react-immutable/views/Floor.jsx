/** @jsx React.DOM */
var React = require("react");
var Room = require("./Room");
var commandDispatcher = require("../commandDispatcher");

var Floor = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.floor !== this.props.floor;
  },

  render: function() {
    return (
      <div className="floor" onClick={this.handleFloorClick}>
        {this.renderRooms()}
      </div>
    );
  },

  renderRooms: function() {
    var floorId = this.props.floorId;
    return this.props.floor.rooms.map(function(room, index) {
      return <Room key={index} roomId={floorId.concat(index)} room={room} />;
    });
  },

  handleFloorClick: function(e) {
    e.preventDefault();
    commandDispatcher.dispatch("addRoom", {
      floorId: this.props.floorId
    });
    return false;
  }
}); 

module.exports = Floor;

