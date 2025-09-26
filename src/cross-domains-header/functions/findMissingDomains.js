function findMissingDomains(otherDomains, platformsIdentified) {
  return otherDomains.filter((domain) =>
    !platformsIdentified.some((referringPlatform) =>
      referringPlatform.referring_platform_domain.includes(domain)
    )
  );
}


module.exports = { findMissingDomains }
