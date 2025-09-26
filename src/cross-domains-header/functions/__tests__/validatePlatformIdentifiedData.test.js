/**
 * @jest-environment jsdom
 */

const { validatePlatformIdentifiedData } = require("../validatePlatformIdentifiedData");

describe('setLocalPlatformsIdentified', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    localStorage.clear();
  });

  it('format is valid', async () => {
    console.error = jest.fn();

    const validData = [
      {
        referring_platform_domain: "example.com",
        anonymous_distinct_id: "87d387f..."
      },
      {
        referring_platform_domain: "example.net",
        anonymous_distinct_id: "87d387f...",
      },
    ];

    const result = await validatePlatformIdentifiedData(validData);
    expect(result).toBe(true);

  });

  it('format is invalid', async () => {
    console.error = jest.fn();

    const invalidData = [
      {
        referring_platform_domain: "example.com",
      },
      {
        referring_platform_domain: "example.net",
        anonymous_distinct_id: "87d387f...",
      },
    ];

    const result = await validatePlatformIdentifiedData(invalidData);
    expect(result).toBe(false);

  });

  it('format is invalid - wrong key', async () => {
    console.error = jest.fn();

    const invalidData = [
      {
        platforms: "example.com",
        anonymous_distinct_id: "87d387f..."
      },
      {
        referring_platform_domain: "example.net",
        anonymous_distinct_id: "87d387f...",
      },
    ];

    const result = await validatePlatformIdentifiedData(invalidData);
    expect(result).toBe(false);

  });

  it('format is invalid - missing platform property', async () => {
    console.error = jest.fn();

    const invalidData = [
      {
        anonymous_distinct_id: "87d387f..."
      },
      {
        referring_platform_domain: "example.net",
        anonymous_distinct_id: "87d387f...",
      },
    ];

    const result = await validatePlatformIdentifiedData(invalidData);
    expect(result).toBe(false);
  });

  it('format is invalid - missing distinct_id property', async () => {
    console.error = jest.fn();

    const invalidData = [
      {
        referring_platform_domain: "example.com"
      },
      {
        referring_platform_domain: "example.net",
      },
    ];

    const result = await validatePlatformIdentifiedData(invalidData);
    expect(result).toBe(false);
  });

  it('format is invalid - platform property is not a string', async () => {
    console.error = jest.fn();

    const invalidData = [
      {
        referring_platform_domain: { name: "example.com" },
        anonymous_distinct_id: "87d387f..."
      },
      {
        referring_platform_domain: ["example.net"],
        anonymous_distinct_id: "87d387f...",
      },
    ];

    const result = await validatePlatformIdentifiedData(invalidData);
    expect(result).toBe(false);
  });

  it('format is invalid - distinct_id property is not a string', async () => {
    console.error = jest.fn();

    const invalidData = [
      {
        referring_platform_domain: "example.com",
        anonymous_distinct_id: 12345
      },
      {
        referring_platform_domain: "example.net",
        anonymous_distinct_id: ["87d387f..."],
      },
    ];

    const result = await validatePlatformIdentifiedData(invalidData);
    expect(result).toBe(false);
  });

  it('format is invalid - not an array', async () => {
    console.error = jest.fn();

    const invalidData = {
      referring_platform_domain: "example.com",
      anonymous_distinct_id: "87d387f..."
    };

    const result = await validatePlatformIdentifiedData(invalidData);
    expect(result).toBe(false);
  });

  it('format is invalid - empty array', async () => {
    console.error = jest.fn();

    const invalidData = [];

    const result = await validatePlatformIdentifiedData(invalidData);
    expect(result).toBe(false);
  });

  it('format is invalid - mixed valid and invalid data', async () => {
    console.error = jest.fn();

    const invalidData = [
      {
        referring_platform_domain: "example.com",
        anonymous_distinct_id: "87d387f..."
      },
      {
        referring_platform_domain: "example.net",
      },
      {
        referring_platform_domain: "example.com",
        anonymous_distinct_id: "abc123"
      },
    ];

    const result = await validatePlatformIdentifiedData(invalidData);
    expect(result).toBe(false);
  });

});

