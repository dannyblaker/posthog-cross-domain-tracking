const { appendCrossPlatformLinks } = require('./flows/appendCrossPlatformLinks');
const { identifyCrossPlatformUser } = require('./flows/identifyCrossPlatformUser');

(async function () {
  const allPlatformDomains = [
    'domain1.com',
    'domain2.com',
    'domain3.com'
  ];

  console.group("appendCrossPlatformLinks");
  await appendCrossPlatformLinks(window, allPlatformDomains);
  console.groupEnd();

  console.group("identifyCrossPlatformUser");
  await identifyCrossPlatformUser(window, allPlatformDomains);
  console.groupEnd();
})();
