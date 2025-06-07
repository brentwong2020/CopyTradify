const toggle = document.getElementById('toggle');

const ext = typeof browser !== "undefined" ? browser : chrome;

// Load saved toggle state
ext.storage.sync.get(['enabled'], (result) => {
    toggle.checked = !!result.enabled;
});

// Save toggle state on change
ext.addEventListener('change', () => {
    chrome.storage.sync.set({ enabled: toggle.checked });
});
