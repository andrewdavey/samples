var React = require("react");
var immutable = require("immutable-object");

function App(data, createComponent, applicationElement) {
  this.createComponent = createComponent;
  this.applicationElement = applicationElement;
  this.data = data;
  this.render();
}

App.prototype.update = function(lens, change) {
  if (lens) {
    if (typeof change === "function") {
      this.data = immutable.lens.update(this.data, lens, change);
    } else {
      this.data = lens.set(this.data, change);
    }
  } else {
    this.data = change(this.data);
  }
  this.render();
};

App.prototype.render = function() {
  React.renderComponent(
    this.createComponent(this.data),
    this.applicationElement
  );
};

module.exports = App;

