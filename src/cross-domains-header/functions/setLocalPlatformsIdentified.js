
async function setLocalPlatformsIdentified(platformsIdentified) {
    try {
        window.localStorage.setItem("platforms_identified", JSON.stringify(platformsIdentified));

        console.debug("%cSUCCESS: platforms_identified stored locally", "color: green");

    } catch (err) {
        console.error('LocalStorage may be disabled or invalid data format:', err);
    }
}

module.exports = { setLocalPlatformsIdentified };
