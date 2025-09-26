const { validatePlatformIdentifiedData } = require('./validatePlatformIdentifiedData');

async function getLocalPlatformsIdentified(window) {
    let data;

    try {
        data = window.localStorage.getItem("platforms_identified")
        if (data) {

            let jsonData;

            try {
                jsonData = JSON.parse(data);

            } catch (err) {
                console.error('error parsing JSON data');
                console.error(data);
                return [];
            }

            if (jsonData) {
                console.debug("jsonData type is:")
                console.debug(typeof (jsonData))
                const data_is_valid = await validatePlatformIdentifiedData(jsonData);

                if (data_is_valid) {
                    return jsonData
                } else {
                    console.error('getLocalPlatformsIdentified has invalid data');
                    return [];
                }
            }

        } else {
            console.debug('platforms_identified key doesnt exist')
            return [];
        }

    } catch (err1) {
        console.error('error setting platforms_identified in localStorage:', err1);
        try {
            window.localStorage.setItem('t', 't');
            window.localStorage.removeItem('t');
        } catch (err2) {
            console.error('localStorage not accessible', err2);
        }
        return null;
    }
}

module.exports = { getLocalPlatformsIdentified };

