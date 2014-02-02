var handlers = [];

exports.dispatch = function(command) {
  handlers
    .filter(function(h) { return h.type === command.type; })
    .forEach(function(h) {
      h.handler(command);
    });
};

exports.handle = function(newHandlers) {
  Object.keys(newHandlers).forEach(function(commandName) {
    handlers.push({
      type: commandName,
      handler: newHandlers[commandName]
    });
  });
};

