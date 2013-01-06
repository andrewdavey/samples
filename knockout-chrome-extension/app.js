(function() {

  function postMessageToParent(message) {
    window.parent.postMessage(message, "*");
  }

  var app = {
    links: ko.observableArray(),
    anyClick: function(_, event) {
      // The app is sandboxed so cannot follow links to other pages.
      // However, the popup page can, so we'll post it a message
      // asking it to open the link.
      var clickedElement = event.target;
      if (clickedElement.tagName.toLowerCase() === "a") {
        event.preventDefault();
        postMessageToParent({ openLink: clickedElement.href });
      }
    }
  };

  window.addEventListener(
    "message",
    function(event) {
      if (event.data.displayLinks) {
        app.links(event.data.displayLinks);
      }
    },
    false
  );

  ko.applyBindings(app);

  // Tell the popup we are ready to recieve links to display.
  postMessageToParent({ appReady: true });

}());
