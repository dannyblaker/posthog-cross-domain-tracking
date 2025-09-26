/**
 * @jest-environment jsdom
 */

const { getLocalAnonymousDistinctId } = require("../getLocalAnonymousDistinctId"); 

// mock window.localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

describe('Testing getLocalAnonymousDistinctId', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
  });

  it('returns null when anonymous_distinct_id is not set', async () => {
    expect(await getLocalAnonymousDistinctId()).toBeNull();
  });

  it('returns a string when anonymous_distinct_id is set', async () => {
    window.localStorage.setItem("anonymous_distinct_id", "distinct_id_123");
    expect(await getLocalAnonymousDistinctId()).toEqual("distinct_id_123");
  });
});
