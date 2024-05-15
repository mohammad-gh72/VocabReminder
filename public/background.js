// background.js
chrome.action.onClicked.addListener(function () {
  // Open a new tab when the extension icon is clicked
  chrome.tabs.create({ url: "index.html" });
});
