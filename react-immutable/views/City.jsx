/** @jsx React.DOM */
var React = require("react");
var Building = require("./Building");
var commandDispatcher = require("../commandDispatcher");

var City = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps !== this.props;
  },

  render: function() {
    return (
      <div className="city-container">
        {this.renderBuildings()}
        <div className="city-controls">
          <a href="#" onClick={this.addBuilding}>Add Building</a>
        </div>
      </div>
    );
  },

  renderBuildings: function() {
    return this.props.city.map(function(building, index) {
      return <Building key={index} buildingId={[index]} building={building} />
    });
  },

  addBuilding: function(e) {
    e.preventDefault();
    commandDispatcher.dispatch("addBuilding");
    return false;
  }
});

module.exports = City;

