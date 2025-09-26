/**
 * @jest-environment jsdom
 */

const { identifyPosthogUser } = require("../identifyPosthogUser");

require('dotenv').config();

const posthog = require('posthog-js');

posthog.init(process.env.POSTHOG_API_KEY, {
  api_host: 'https://app.posthog.com/',
});

jest.mock("posthog-js", () => ({
  init: jest.fn(),
  get_distinct_id: jest.fn(),
  identify: jest.fn(),
}));

describe("identifyUser", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    posthog.identify.mockClear();
  });

  it("should return true when identification is successful", async () => {
    posthog.identify.mockImplementation(() => true);

    const result = await identifyPosthogUser("testId", posthog);

    expect(result).toBe(true);
    expect(posthog.identify).toHaveBeenCalledWith("testId");
  });

  it("should return false and log an error when identification fails", async () => {
    console.error = jest.fn();

    const mockError = new Error("Test Error");
    posthog.identify.mockImplementation(() => {
      throw mockError;
    });

    const result = await identifyPosthogUser("testId", posthog);

    expect(result).toBe(false);
    expect(posthog.identify).toHaveBeenCalledWith("testId");
    expect(console.error).toHaveBeenCalledWith(
      "Error identifying user with ID: testId",
      mockError
    );
  });
});
