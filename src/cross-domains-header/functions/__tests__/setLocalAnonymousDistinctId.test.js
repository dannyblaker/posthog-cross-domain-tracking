/**
 * @jest-environment jsdom
 */

const { setLocalAnonymousDistinctId } = require("../setLocalAnonymousDistinctId"); 

// mock window.localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    }
  };
})();

describe('Testing setLocalAnonymousDistinctId', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
  });

  it('sets the anonymous_distinct_id', async () => {
    const setResult = await setLocalAnonymousDistinctId("distinct_id_456");
    const getItemResult = window.localStorage.getItem("anonymous_distinct_id");
    expect(getItemResult).toEqual("distinct_id_456");
  });
});
