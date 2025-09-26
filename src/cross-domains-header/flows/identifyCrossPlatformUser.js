const { fetchPersonByEmail } = require("../functions/fetchPersonByEmail");
const { getEmailAddressFromPage } = require("../functions/getEmailAddressFromPage");
const { identifyPosthogUser } = require("../functions/identifyPosthogUser");
const { extractDomainFromURL } = require("../functions/extractDomainFromURL");
const { filterDomains } = require("../functions/filterDomains");
const { getLocalPlatformsIdentified } = require("../functions/getLocalPlatformsIdentified");
const { setLocalPlatformsIdentified } = require("../functions/setLocalPlatformsIdentified");
const { getCurrentUrl } = require("../functions/getCurrentUrl");
const { findMissingDomains } = require("../functions/findMissingDomains");
const { getValueFromParams } = require("../functions/getValueFromParams");
const { waitingForPosthog } = require("../functions/waitingForPosthog");

/**
 * Applies cross-platform tracking by identifying the user
 * in PostHog if the current URL contains a distinct ID parameter.
 */
async function identifyCrossPlatformUser(window, allPlatformDomains) {

  try {
    // 1. Check if referring domain has been previously identified
    console.group("1. Check if referring domain has been previously identified");

    const currentUrl = getCurrentUrl(window);
    console.debug("currentUrl: ", currentUrl);

    if (!currentUrl) {
      console.error("Error getting current URL");
      console.groupEnd();
      return;
    }

    const currentPlatformDomain = extractDomainFromURL(currentUrl);
    console.debug("currentPlatformDomain: ", currentPlatformDomain);

    // A list of platform domains, excluding the current platform.
    const domainsOtherThanCurrent = await filterDomains(allPlatformDomains, currentPlatformDomain);
    console.debug("domainsOtherThanCurrent: ", domainsOtherThanCurrent);


    // An array of objects, each featuring a referring platform and associated anonymous user id
    const platformsIdentified = await getLocalPlatformsIdentified(window);
    console.debug("platformsIdentified: ", platformsIdentified);

    let domainsToIdentify;

    if (platformsIdentified && platformsIdentified.length > 0) {
      console.debug("User previously identified on other platforms.");
      domainsToIdentify = findMissingDomains(domainsOtherThanCurrent, platformsIdentified);
    } else {
      domainsToIdentify = domainsOtherThanCurrent;
      console.debug("User not previously identified on other platforms.");
    }

    console.debug("domainsToIdentify: ", domainsToIdentify);


    if (domainsToIdentify && domainsToIdentify.length > 0) {
      console.group("1.1 Get identification info from URL params");
      console.debug("Identification required for: ", domainsToIdentify);

      let referring_platform_param;
      referring_platform_param = getValueFromParams("referring_platform_domain", window);
      console.debug("referringPlatform: ", referring_platform_param);

      let anonymous_distinct_id_param;
      anonymous_distinct_id_param = getValueFromParams("anonymous_distinct_id", window);
      console.debug("anonymous_distinct_id from params: ", anonymous_distinct_id_param);
      console.groupEnd();

      if (!referring_platform_param) {
        console.debug("ANSWER: no referring platform to identify... ENDING")
        return;
      }

      if (!anonymous_distinct_id_param) {
        console.debug("ANSWER: referring_platform_param provided, but no anonymous_distinct_id to identify... ENDING")
        return;
      }

      let AlreadyIdentified;

      console.debug("domainsToIdentify", domainsToIdentify);

      if (domainsToIdentify.includes(referring_platform_param)) {
        AlreadyIdentified = false;
        console.debug("ANSWER: referring_platform needs to be identified. PROCEEDING TO NEXT STEP...");
      } else {
        AlreadyIdentified = true;
        console.debug("ANSWER: referring_platform has been previously identified. ENDING");
        return;
      }

      console.groupEnd();

      // Identify the user
      let status = {
        anonymous_distinct_id_param: anonymous_distinct_id_param,
        referring_platform_param: referring_platform_param,
        AlreadyIdentified: AlreadyIdentified,
      }

      console.debug("status before identifying", status);

      if (anonymous_distinct_id_param && referring_platform_param && !AlreadyIdentified) {
        console.group("2 Identify the user");
        console.debug("id and platform found. Proceeding to identify user...");

        console.debug("wait for posthog to load...");
        let posthog_available = await waitingForPosthog(window);

        let userIdentified;

        if (posthog_available) {
          userIdentified = await identifyPosthogUser(anonymous_distinct_id_param, window.posthog);
        } else {
          console.error("Posthog not available.");
        }

        if (userIdentified) {
          console.debug("success!");
          if (platformsIdentified) {
            console.debug("storing newly identified platforms locally...");
            platformsIdentified.push({
              referring_platform_domain: referring_platform_param,
              anonymous_distinct_id: anonymous_distinct_id_param,
            });
            console.debug("platformsIdentified", platformsIdentified);
            await setLocalPlatformsIdentified(platformsIdentified);
          }
        }
        console.groupEnd();
      }
    }
  } catch (error) {
    console.error("Unexpected Error identifying cross-platform user");
    console.error(error);
  }
}

module.exports = { identifyCrossPlatformUser };
