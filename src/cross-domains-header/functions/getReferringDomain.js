const { extractDomainFromURL } = require("./extractDomainFromURL");

function getReferringDomain(window) {
  if (window.document.referrer) {
    const host = extractDomainFromURL(window.document.referrer);
    return host;
  } else {
    return "";
  }
}

module.exports = {
  getReferringDomain,
};
