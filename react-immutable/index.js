var React = require("react");
var App = require("./App");
var commandDispatcher = require("./commandDispatcher");
var cities = require("./cities");
var cityLens = cities.lens; 
var City = require("./views/City");

var app = new App(
  // The initial data for the app.
  cities.randomCity(),
  // A function that creates the root component, given the current app data.
  function(data) {
    return City({ city: data });
  },
  // The document element to render the component into.
  document.getElementById("city")
);

// Components will dispatch commands when they want changes to happen
// to the application's data.
// Handle these commands here, updating the application.
// A real app would probably communicate with a back-end here too.
commandDispatcher.handle({
  switchLight: function(command) {
    var ids = command.roomId;
    app.update(
      // Create a lens that targets the light_on property
      // of the referenced buildling, floor and room.
      cityLens(ids[0]).floors(ids[1]).rooms(ids[2]).light_on,
      // Pass the new value
      command.light_on
    );
  },

  addRoom: function(command) {
    var ids = command.floorId;
    app.update(
      // Create a lense that targets the rooms array
      // of the referenced building and floor.
      cityLens(ids[0]).floors(ids[1]).rooms,
      // Pass a function from current-state to new-state.
      function(rooms) {
        return rooms.concat(cities.randomRoom());
      }
    );
  },

  addFloor: function(command) {
    var newFloor = cities.randomFloor();
    var ids = command.buildingId;
    app.update(
      cityLens(ids[0]).floors,
      function(floors) {
        return floors.concat(newFloor);
      }
    );
  },

  addBuilding: function(command) {
    // Passing null lens means update the entire app data.
    app.update(null, function(city) {
      return city.concat(cities.randomBuilding());
    });
  }
});

