/**
 * Returns the domain of a given URL.
 *
 * @param {string} url The URL to extract the domain from.
 * @returns {string} The domain of the URL.
 */
function extractDomainFromURL(url) {
    if (!url.includes("://")) {
      url = "http://" + url;
    }
    const domain = new URL(url).hostname;
    const domainParts = domain.split(".");
    if (domainParts.length > 2) {
      return domainParts.slice(-2).join(".");
    }
    return domain;
  }

// Export functions
module.exports = {
  extractDomainFromURL,
};