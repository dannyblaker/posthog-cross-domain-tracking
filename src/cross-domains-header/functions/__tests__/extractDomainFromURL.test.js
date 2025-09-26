/**
 * @jest-environment jsdom
 */

const {
  extractDomainFromURL,
} = require("../extractDomainFromURL");


const domainVariations1 = [
  "example.com",
  "www.example.com",
  "http://example.com",
  "http://www.example.com",
  "https://example.com",
  "https://www.example.com",
  "example.com/",
  "www.example.com/",
  "http://example.com/",
  "http://www.example.com/",
  "https://example.com/",
  "https://www.example.com/",
  "blog.example.com",
  "shop.example.com",
  "mail.example.com",
  "example.com/about",
  "www.example.com/about",
  "http://example.com/about",
  "http://www.example.com/about",
  "https://example.com/about",
  "https://www.example.com/about",
  "example.com/shop?category=electronics",
  "www.example.com/shop?category=electronics",
  "http://example.com/shop?category=electronics",
  "http://www.example.com/shop?category=electronics",
  "https://example.com/shop?category=electronics",
  "https://www.example.com/shop?category=electronics",
];

describe("extractDomainFromURL", () => {
  test.each(domainVariations1)(
    "should return 'example.com' for URL '%s'",
    (url) => {
      const domain = extractDomainFromURL(url);
      expect(domain).toBe("example.com");
    }
  );
});



const domainVariations2 = [
  "example.net",
  "www.example.net",
  "http://example.net",
  "http://www.example.net",
  "https://example.net",
  "https://www.example.net",
  "example.net/",
  "www.example.net/",
  "http://example.net/",
  "http://www.example.net/",
  "https://example.net/",
  "https://www.example.net/",
  "blog.example.net",
  "shop.example.net",
  "mail.example.net",
  "example.net/about",
  "www.example.net/about",
  "http://example.net/about",
  "http://www.example.net/about",
  "https://example.net/about",
  "https://www.example.net/about",
  "example.net/shop?category=electronics",
  "www.example.net/shop?category=electronics",
  "http://example.net/shop?category=electronics",
  "http://www.example.net/shop?category=electronics",
  "https://example.net/shop?category=electronics",
  "https://www.example.net/shop?category=electronics",
];

describe("extractDomainFromURL", () => {
  test.each(domainVariations2)(
    "should return 'example.net' for URL '%s'",
    (url) => {
      const domain = extractDomainFromURL(url);
      expect(domain).toBe("example.net");
    }
  );
});

const domainVariations3 = [
  "example.online",
  "www.example.online",
  "http://example.online",
  "http://www.example.online",
  "https://example.online",
  "https://www.example.online",
  "example.online/",
  "www.example.online/",
  "http://example.online/",
  "http://www.example.online/",
  "https://example.online/",
  "https://www.example.online/",
  "blog.example.online",
  "shop.example.online",
  "mail.example.online",
  "example.online/about",
  "www.example.online/about",
  "http://example.online/about",
  "http://www.example.online/about",
  "https://example.online/about",
  "https://www.example.online/about",
  "example.online/shop?category=electronics",
  "www.example.online/shop?category=electronics",
  "http://example.online/shop?category=electronics",
  "http://www.example.online/shop?category=electronics",
  "https://example.online/shop?category=electronics",
  "https://www.example.online/shop?category=electronics",
];

describe("extractDomainFromURL", () => {
  test.each(domainVariations3)(
    "should return 'example.online' for URL '%s'",
    (url) => {
      const domain = extractDomainFromURL(url);
      expect(domain).toBe("example.online");
    }
  );
});