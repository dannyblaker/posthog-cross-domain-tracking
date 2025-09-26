/**
 * @jest-environment jsdom
 */

const {
  PlatformsDetectedOnCurrentPage,
} = require("../PlatformsDetectedOnCurrentPage");

require('dotenv').config();

// Add the following lines to import and use the TextEncoder and TextDecoder polyfills
const { TextEncoder, TextDecoder } = require("text-encoding");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// import test dependencies
const { JSDOM } = require("jsdom");


// TEST: PlatformsDetectedOnCurrentPage
describe("PlatformsDetectedOnCurrentPage", () => {
  beforeEach(() => {
    // Mock the DOM environment.
    document.body.innerHTML = `<a href="http://google.com">Google</a>
       <a href="http://facebook.com">Facebook</a>
       <a href="http://twitter.com">Twitter</a>`;
  });

  it("should detect platforms in the page", async () => {
    const domains = ["google.com", "facebook.com", "linkedin.com"];
    const expectedSet = new Set(["google.com", "facebook.com"]);

    const result = await PlatformsDetectedOnCurrentPage(domains, window);
    expect(result).toEqual(expectedSet);
  });

  it("should return null if no platforms are detected", async () => {
    const domains = ["linkedin.com", "instagram.com"];
    const result = await PlatformsDetectedOnCurrentPage(domains, window);
    expect(result).toBeNull();
  });
});
