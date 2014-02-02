"use strict";

var immutable = require("immutable-object");

// Create lenses that match the city data structure.
// These will let us get/set properties within the data structure.
var cityLens = immutable.lens.build([
  {
    floors: [
      {
        rooms: [
          { light_on: true }
        ]
      }
    ]
  }
]);

function randomCity() {
  return immutable(repeat(7, randomBuilding));
}

function randomBuilding() {
  var floorCount = 5 + Math.floor(Math.random() * 10);
  var width = 2 + Math.floor(Math.random() * 3);
  return immutable({
    floors: repeat(floorCount, function() {
      return {
        rooms: repeat(width, randomRoom)
      };
    })
  });
}

function randomFloor() {
  return immutable({
    rooms: repeat(3, randomRoom)
  });
}

function randomRoom() {
  return immutable({
    light_on: Math.random() > 0.5
  });
}

function repeat(n, createItem) {
  var array = new Array(n);
  for (var i = 0; i < n; i++) {
    array[i] = createItem();
  }
  return array;
}

exports.randomRoom = randomRoom;
exports.randomFloor = randomFloor;
exports.randomBuilding = randomBuilding;
exports.randomCity = randomCity;
exports.lens = cityLens;

