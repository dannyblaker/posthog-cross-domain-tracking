/**
 * @jest-environment jsdom
 */

const { setLocalPlatformsIdentified } = require("../setLocalPlatformsIdentified");

// mock window.localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => {
      if (store === null) {
        throw new Error('localStorage is disabled');
      }
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

// assign mock to the global window object
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('setLocalPlatformsIdentified', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    localStorage.clear();
  });

  it('sets the correct data in local storage', async () => {
    const mockData = [
      {
        platform: "example.com",
        distinct_id: "s87d6f87...",
      },
      {
        platform: "example.net",
        distinct_id: "87d387f...",
      },
    ];
    await setLocalPlatformsIdentified(mockData);
    const storedData = JSON.parse(window.localStorage.getItem("platforms_identified"));
    expect(storedData).toEqual(mockData);
  });

});

