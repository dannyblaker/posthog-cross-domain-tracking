/**
 * @jest-environment jsdom
 */

const { fetchDistinctID } = require("../fetchDistinctID");

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

describe("fetchDistinctID Remotely", () => {
  it("fetches distinct ID successfully", async () => {
    // Mock successful ID fetch
    const mockId = "12345";
    posthog.get_distinct_id.mockResolvedValue(mockId);

    const id = await fetchDistinctID(posthog);
    expect(id).toBe(mockId);
  });

  it("returns null when an error occurs", async () => {
    // Mock a failed ID fetch
    posthog.get_distinct_id.mockRejectedValue(new Error("An error occurred"));

    const id = await fetchDistinctID();
    expect(id).toBeNull();
  });
});