async function getEmailAddressFromPage() {
  return new Promise((resolve, reject) => {
    // Defining the email regex (from web standard: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const targetSelector = "#site-navigation-header > div.site-top-menu-bar > div > div.site-aux-menu-bar > a.sx-l-menuitem.role-account.sx-l-hasmenu > span.sx-l-label";
    
    const checkEmailElement = () => {
      const emailElement = document.querySelector(targetSelector);
      if (emailElement && emailRegex.test(emailElement.textContent)) {
        console.debug(emailElement);
        // If an email is found, resolve the Promise with the email, else resolve with null
        resolve(emailElement.textContent.match(emailRegex)[0]);
        observer.disconnect();
      }
    };

    // Check if the element is already available
    checkEmailElement();

    // If not available, start observing the DOM changes to detect when it becomes available
    const observer = new MutationObserver(checkEmailElement);
    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
}

module.exports = { getEmailAddressFromPage };
