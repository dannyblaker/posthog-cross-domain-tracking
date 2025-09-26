/**
 * Detects if external platform domains are present on the current page.
 *
 * @param {Array<string>} domains - The list of platform domains to search for.
 * @returns {Promise<Set<string>|null>} A Promise that resolves to a Set of found platform domains, or null if none were found.
 */
async function PlatformsDetectedOnCurrentPage(domains, window) {
  const foundPlatforms = new Set();
  const links = Array.from(window.document.querySelectorAll("a[href]"));
  const linkHrefs = links.map((link) => link.href);

  for (const platform of domains) {
    const platformExists = linkHrefs.some((href) => href.includes(platform));

    if (platformExists) {
      foundPlatforms.add(platform);
    }
  }

  return foundPlatforms.size > 0 ? foundPlatforms : null;
}

module.exports = { PlatformsDetectedOnCurrentPage }