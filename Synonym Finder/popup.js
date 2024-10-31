document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('selectedText', ({ selectedText }) => {
    console.log('Retrieved selected text:', selectedText); // Log retrieved text
    if (selectedText) {
      document.getElementById('selected-word').textContent = `Selected word: ${selectedText}`;
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle non-200 responses
          }
          return response.json();
        })
        .then(data => {
          console.log('API Response:', data); // Debug line

          let synonyms = [];
          if (Array.isArray(data)) {
            data.forEach(entry => {
              entry.meanings.forEach(meaning => {
                meaning.definitions.forEach(definition => {
                  if (definition.synonyms) {
                    synonyms.push(...definition.synonyms);
                  }
                });
              });
            });
          }

          if (synonyms.length === 0) {
            document.getElementById('synonyms').textContent = 'No synonyms found.';
          } else {
            document.getElementById('synonyms').textContent = `Synonyms: ${synonyms.join(', ')}`;
          }
        })
        .catch(error => {
          console.error('Error fetching synonyms:', error); // Debug line
          document.getElementById('synonyms').textContent = 'Error fetching synonyms.';
        });
    } else {
      document.getElementById('selected-word').textContent = 'No word selected.';
      document.getElementById('synonyms').textContent = '';
    }
  });
});
