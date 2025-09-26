/**
 * @jest-environment jsdom
 */

const { findMissingDomains }  = require('../findMissingDomains');

test('findMissingDomains returns the correct missing domains', () => {
  const otherDomains = ["example.com", "example.com"];
  const platformsIdentified = [
    {
      referring_platform_domain: "example.com",
      anonymous_distinct_id: "s87d6f87...",
    },
    {
      referring_platform_domain: "example.net",
      anonymous_distinct_id: "87d387f...",
    },
  ];
  const result = findMissingDomains(otherDomains, platformsIdentified);
  expect(result).toEqual(["example.com"]);
});

test('findMissingDomains returns the correct missing domains where otherDomains > 1', () => {
  const otherDomains = ["example.com", "example.com", "another_example.com"];
  const platformsIdentified = [
    {
      referring_platform_domain: "example.com",
      anonymous_distinct_id: "s87d6f87...",
    },
    {
      referring_platform_domain: "example.net",
      anonymous_distinct_id: "87d387f...",
    },
    {
      referring_platform_domain: "other.com",
      anonymous_distinct_id: "87d387f...",
    },
  ];
  const result = findMissingDomains(otherDomains, platformsIdentified);
  expect(result).toEqual(["example.com", "another_example.com"]);
});

test('findMissingDomains returns an empty array if all domains are found', () => {
  const otherDomains = ["example.com", "example.com"];
  const platformsIdentified = [
    {
      referring_platform_domain: "example.com",
      anonymous_distinct_id: "s87d6f87...",
    },
    {
      referring_platform_domain: "example.com",
      anonymous_distinct_id: "87d387f...",
    },
  ];
  const result = findMissingDomains(otherDomains, platformsIdentified);
  expect(result).toEqual([]);
});



test('findMissingDomains returns an all domains if platformsIdentified is empty', () => {
  const otherDomains = ["example.com", "example.com"];
  const platformsIdentified = [];
  const result = findMissingDomains(otherDomains, platformsIdentified);
  expect(result).toEqual(["example.com", "example.com"]);
});
