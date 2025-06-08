const powerToggle = document.getElementById('powerToggle');
const directionRadios = document.querySelectorAll('input[name="direction"]');
const directionSection = document.getElementById('directionSection');

const ext = typeof browser !== "undefined" ? browser : chrome;

// Load saved toggle state
ext.storage.sync.get(['enabled', 'direction'], (result) => {
    console.log(result);
    const enabled = result.enabled ?? true;
    const direction = result.direction ?? DIRECTION_MAP.CN_TO_HK;

    powerToggle.checked = enabled;
    setDirectionState(enabled);

    [...directionRadios].forEach(r => {
        r.checked = r.value === direction;
    });
});

powerToggle.addEventListener('change', () => {
    const enabled = powerToggle.checked;
    ext.storage.sync.set({ enabled });
    setDirectionState(enabled);
});


directionRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            ext.storage.sync.set({ direction: radio.value });
        }
    });
});

// Enable/disable direction radios
function setDirectionState(enabled) {
    directionRadios.forEach(radio => {
        radio.disabled = !enabled;
    });
}