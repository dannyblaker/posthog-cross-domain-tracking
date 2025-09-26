// Function to extract a value from a URL's parameters
function getValueFromParams(key, window) {
  const urlParameters = new URLSearchParams(window.location.search);
  if (urlParameters.has(key)) {
    return urlParameters.get(key);
  }
  return null;
}

module.exports = { getValueFromParams }
