/**
 * @jest-environment jsdom
 */

const { getReferringDomain } = require("../getReferringDomain");

const { TextEncoder, TextDecoder } = require("text-encoding");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require("jsdom");

describe("getReferringDomain", () => {
  let correctReferringDomain = "example.com";
  let dom;
  let window;

  beforeEach(() => {
    dom = ""
    window = ""
  });

  it("return correct referring domain", () => {
    dom = new JSDOM("", {
      url: "http://example.com",
      referrer: "http://www.example.com",
    });
    window = dom.window
    const referringDomain = getReferringDomain(window);
    expect(referringDomain).toBe(correctReferringDomain);
  });

  it("return correct referring domain - testing multiple variants ", () => {

    const domainVariations = [
      "http://example.com",
      "http://www.example.com",
      "https://example.com",
      "https://www.example.com",
      "http://example.com/",
      "http://www.example.com/",
      "https://example.com/",
      "https://www.example.com/",
      "http://example.com/about",
      "http://www.example.com/about",
      "https://example.com/about",
      "https://www.example.com/about",
      "http://example.com/shop?category=electronics",
      "http://www.example.com/shop?category=electronics",
      "https://example.com/shop?category=electronics",
      "https://www.example.com/shop?category=electronics",
    ];

    domainVariations.forEach((referrer) => {
      dom = ""
      window = ""
      try {
        dom = new JSDOM("", {
          url: "http://example.com",
          referrer: referrer,
        });
        window = dom.window
      } catch {
        console.debug("Error with referrer: ", referrer);
      }
      if (dom) {
        const referringDomain = getReferringDomain(dom.window);
        expect(referringDomain).toBe(correctReferringDomain);
      }
    });
  });

  it("should return an empty string when there is no referrer", () => {

    dom = new JSDOM("", {
      url: "http://example.com"
    });
    window = dom.window;

    const referringPlatform = getReferringDomain(window);
    expect(referringPlatform).toBe("");
  });
});
