chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'findSynonym',
      title: 'Find Synonyms',
      contexts: ['selection']
    });
  
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === 'findSynonym') {
        console.log('Context menu clicked, selected text:', info.selectionText); // Log selected text
        chrome.storage.sync.set({ selectedText: info.selectionText }, () => {
          console.log('Selected text from context menu saved:', info.selectionText); // Confirm saving
          chrome.action.openPopup();
        });
      }
    });
  });
  