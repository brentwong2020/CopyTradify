const OpenCC = require('opencc-js');

// Load OpenCC converter
const converter = OpenCC.Converter({ from: 'cn', to: 'hk' });

document.addEventListener('copy', async (event) => {
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
