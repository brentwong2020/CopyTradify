const OpenCC = require('opencc-js');

// Load OpenCC converter
const converter = OpenCC.Converter({ from: 'cn', to: 'hk' });
const ext = typeof browser !== "undefined" ? browser : chrome;


document.addEventListener('copy', async (event) => {
    ext.storage.sync.get(['enabled'], async (data) => {
        try {
            const text = window.getSelection().toString();
            if (!text) return;

            const converted = await converter(text);

            // Prevent default copy
            event.preventDefault();

            // Replace clipboard content
            event.clipboardData.setData('text/plain', converted);
            console.log("Simplified converted to Traditional:", converted);
        } catch (e) {
            console.error("Conversion failed", e);
        }
    });
});
