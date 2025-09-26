/**
 * @jest-environment jsdom
 */

const { TextEncoder, TextDecoder } = require("text-encoding");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require("jsdom");

const { getValueFromParams } = require('../getValueFromParams');

describe('getValueFromParams', () => {

  test('should return the value of posthog_distinct_id if it exists in URL parameters', () => {
    // Create a new JSDOM instance for this specific test
    let jsdom = new JSDOM('', { url: 'http://example.com?posthog_distinct_id=12345' });

    expect(getValueFromParams("posthog_distinct_id",jsdom.window)).toBe("12345");
  });


  test('should return the value of posthog_distinct_id if it exists AND url has / prefix', () => {
    // Create a new JSDOM instance for this specific test
    let jsdom = new JSDOM('', { url: 'http://example.com/?posthog_distinct_id=12345' });

    expect(getValueFromParams("posthog_distinct_id",jsdom.window)).toBe("12345");
  });

  test('should return the value of posthog_distinct_id if it exists amongst mutliple URL parameters', () => {
    // Create a new JSDOM instance for this specific test
    let jsdom = new JSDOM('', { url: 'http://example.com?posthog_distinct_id=12345&another=sdf76d' });

    expect(getValueFromParams("posthog_distinct_id",jsdom.window)).toBe("12345");
  });

  test('should return null if posthog_distinct_id does not exist in URL parameters', () => {
    // Create a new JSDOM instance for this specific test
    let jsdom = new JSDOM('', { url: 'http://example.com' });

    expect(getValueFromParams("posthog_distinct_id",jsdom.window)).toBeNull();
  });

  test('should return the value of posthog_distinct_id even if it has special characters', () => {
    // Create a new JSDOM instance for this specific test
    let jsdom = new JSDOM('', { url: 'http://example.com?posthog_distinct_id=abc%23def' });

    expect(getValueFromParams("posthog_distinct_id",jsdom.window)).toBe("abc#def");
  });

  test('should return null if the URL has no parameters', () => {
    // Create a new JSDOM instance for this specific test
    let jsdom = new JSDOM('', { url: 'http://example.com' });

    expect(getValueFromParams("posthog_distinct_id",jsdom.window)).toBeNull();
  });

  test('should return null if the URL has no query string', () => {
    // Create a new JSDOM instance for this specific test
    let jsdom = new JSDOM('', { url: 'http://example.com?' });

    expect(getValueFromParams("posthog_distinct_id",jsdom.window)).toBeNull();
  });
});
