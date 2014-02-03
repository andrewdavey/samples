var handlers = [];

exports.dispatch = function(commandId, commandData) {
  handlers
    .filter(function(h) { return h.id === commandId; })
    .forEach(function(h) {
      h.handler(commandData);
    });
};

exports.on = function(newHandlers) {
  Object.keys(newHandlers).forEach(function(commandId) {
    handlers.push({
      id: commandId,
      handler: newHandlers[commandId]
    });
  });
};

