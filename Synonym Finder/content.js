console.log('Content script loaded'); // Confirm content script is loaded

document.addEventListener('mouseup', () => {
  let selectedText = window.getSelection().toString().trim();
  console.log('Selected text:', selectedText); // Log selected text
  if (selectedText.length > 0) {
    chrome.storage.sync.set({ selectedText: selectedText }, () => {
      console.log('Selected text saved:', selectedText); // Confirm saving
    });
  }
});
