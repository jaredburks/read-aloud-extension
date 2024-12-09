// Create the context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "readAloud",
    title: "Read Aloud",
    contexts: ["selection"]
  });
});

// Add a listener for when the context menu item is clicked
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "readAloud" && info.selectionText) {
    // Use the TTS API to read the selected text
    chrome.tts.speak(info.selectionText, {
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      lang: "en-US",
      onEvent: (event) => {
        if (event.type === "error") {
          console.error("TTS Error:", event.errorMessage);
        }
      }
    });
  }
});

// Add a "Stop Speaking" context menu item
chrome.contextMenus.create({
  id: "stopSpeaking",
  title: "Stop Speaking",
  contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "stopSpeaking") {
    chrome.tts.stop();
  }
});
