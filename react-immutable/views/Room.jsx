/** @jsx React.DOM */
var React = require("react");
var commandDispatcher = require("../commandDispatcher");

var Room = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    // We have no state, and props are immutable, so can make this
    // "should update" test really efficient.
    return nextProps !== this.props;
  },

  render: function() {
    return (
      <span className="room">
        <a href="#" className={this.windowClasses()} onClick={this.handleWindowClick}></a>
      </span>
    );
  },

  windowClasses: function() {
    return "window " + (this.props.room.light_on ? "light-on" : "light-off");
  },
 
  handleWindowClick: function(e) {
    e.preventDefault();
    // We'd like to change the app's data.
    // So dispatch a command.
    commandDispatcher.dispatch("switchLight", {
      roomId: this.props.roomId,
      light_on: !this.props.room.light_on
    });
    return false;
  }
});

module.exports = Room;

