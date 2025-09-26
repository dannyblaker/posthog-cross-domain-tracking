const { getLocalPlatformsIdentified } = require('../getLocalPlatformsIdentified');
const { validatePlatformIdentifiedData } = require('../validatePlatformIdentifiedData');

jest.mock('../validatePlatformIdentifiedData');

describe('getLocalPlatformsIdentified', () => {
    let localStorage;

    beforeEach(() => {
        localStorage = {
            store: {},
            getItem(key) {
                return this.store[key] || null;
            },
            setItem(key, value) {
                this.store[key] = value;
            },
            clear() {
                this.store = {};
            },
        };

        global.window = { localStorage };
    });

    it('returns parsed data if localStorage contains valid data', async () => {
        const dummyData = { key: 'value' };
        localStorage.setItem('platforms_identified', JSON.stringify(dummyData));
        validatePlatformIdentifiedData.mockResolvedValue(true);

        const result = await getLocalPlatformsIdentified(window);
        expect(result).toEqual(dummyData);
    });

    it('returns an empty array if localStorage contains invalid data', async () => {
        const dummyData = { key: 'value' };
        localStorage.setItem('platforms_identified', JSON.stringify(dummyData));
        validatePlatformIdentifiedData.mockResolvedValue(false);

        const result = await getLocalPlatformsIdentified(window);
        expect(result).toEqual([]);
    });

    it('returns an empty array if localStorage contains non-JSON data', async () => {
        localStorage.setItem('platforms_identified', 'not JSON data');

        const result = await getLocalPlatformsIdentified(window);
        expect(result).toEqual([]);
    });
});



describe('getLocalPlatformsIdentified not present', () => {
    let localStorage;
    let window;

    it('returns null if localStorage is unavailable', async () => {
        const result = await getLocalPlatformsIdentified(window);
        expect(result).toEqual(null);
    });
});