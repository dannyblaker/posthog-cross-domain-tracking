async function applyParamsToLinks(platform_domains, URL_params_to_append, window) {
  // Convert NodeList to Array and iterate over each link
  Array.from(window.document.querySelectorAll("a[href]")).forEach((link) => {
    // Iterate over each platform
    for (const domain of platform_domains) {
      // If the link's href includes the platform
      if (link.href.includes(domain)) {
        // Create URL object
        let url = new URL(link.href);
        
        // Create URLSearchParams object
        let params = new URLSearchParams(url.search);

        // Append each parameter to the URL
        URL_params_to_append.forEach((param) => {
          params.append(param.name, param.value);
        });

        // Assign updated search parameters back to the URL
        url.search = params.toString();

        // Assign updated URL back to the link
        link.href = url.toString();
        break;
      }
    }
  });
}

module.exports = { applyParamsToLinks }
