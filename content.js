const ext = typeof browser !== "undefined" ? browser : chrome;

// Default values
let enabled = true;
let direction = DIRECTION_MAP.CN_TO_HK;

// Wait for settings
ext.storage.sync.get([STORAGE_KEY.ENABLED, STORAGE_KEY.DIRECTION], (data) => {
    enabled = data.enabled ?? true;
    direction = data.direction ?? DIRECTION_MAP.CN_TO_HK;
});

// Listen to future changes too
ext.storage.onChanged.addListener((changes) => {
    if (changes.enabled) enabled = changes.enabled.newValue;
    if (changes.direction) direction = changes.direction.newValue;
});

const converters = {
    [DIRECTION_MAP.CN_TO_HK]: OpenCC.Converter({ from: LOCALE.CN, to: LOCALE.HK }),
    [DIRECTION_MAP.HK_TO_CN]: OpenCC.Converter({ from: LOCALE.HK, to: LOCALE.CN }),
};

document.addEventListener('copy', async (event) => {
    if (!enabled) return;
    const text = window.getSelection().toString();
    if (!text) return;


    try {
        const text = window.getSelection().toString();
        if (!text) return;

        const converted = await converters[direction](text);

        // Prevent default copy
        event.preventDefault();

        // Replace clipboard content
        event.clipboardData.setData('text/plain', converted);
        console.log("Converted: ", "from: ", text, "to: ", converted);
    } catch (e) {
        console.error("Conversion failed", e);
    }
});
