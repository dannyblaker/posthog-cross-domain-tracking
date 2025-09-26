function getCurrentUrl(window) {
  let url = '';

  try {
    if (typeof window === 'undefined') {
      console.error('window is undefined');
      return url;
    }

    if (!window.location) {
      console.error('window.location is undefined');
      return url;
    }

    if (typeof window.location.href !== 'string') {
      console.error('window.location.href is not a string');
      return url;
    }

    url = window.location.href;
  } catch (error) {
    console.error('Error occurred while getting the current URL:', error);
  }

  return url;
}

module.exports = {
  getCurrentUrl
};
