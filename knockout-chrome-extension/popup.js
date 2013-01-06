(function() {
  var appWindow;

  document.addEventListener("DOMContentLoaded", start, false);

  function start() {
    // Get application window, which is inside the "app" iframe.
    appWindow = getAppWindow();

    // The application window can post messages to us
    window.addEventListener("message", handleMessage, false);
  }

  function getAppWindow() {
    return document.getElementById("app").contentWindow;
  }

  function handleMessage() {
    if (event.data.appReady) {
      sendLinksToApp();
    } else if (event.data.openLink) {
      openLink(event.data.openLink);
    }
  }

  function sendLinksToApp() {
    // Get the user's top sites.
    chrome.topSites.get(function(topSites){
      // topSites is an array of { title, url } objects
      // post a message to the app window,
      // asking it to display these sites as links.
      appWindow.postMessage({ displayLinks: topSites }, "*");
    }); 
  }

  function openLink(url) {
    chrome.tabs.create({ url: url });
  }

}());
