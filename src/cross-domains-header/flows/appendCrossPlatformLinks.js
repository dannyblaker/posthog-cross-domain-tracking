const { fetchDistinctID } = require("../functions/fetchDistinctID");
const { extractDomainFromURL } = require("../functions/extractDomainFromURL");
const { PlatformsDetectedOnCurrentPage } = require("../functions/PlatformsDetectedOnCurrentPage");
const { applyParamsToLinks } = require("../functions/applyParamsToLinks");
const { filterDomains } = require("../functions/filterDomains");
const { getLocalAnonymousDistinctId } = require("../functions/getLocalAnonymousDistinctId");
const { setLocalAnonymousDistinctId } = require("../functions/setLocalAnonymousDistinctId");
const { waitingForPosthog } = require("../functions/waitingForPosthog");

async function appendCrossPlatformLinks(window, allPlatformDomains) {
  try {

    console.group("1. Search for cross-platform links");

    const currentUrl = window.location.href;

    if (!currentUrl) {
      console.error("Error getting current URL");
      console.groupEnd();
      return;
    }

    const currentDomain = extractDomainFromURL(currentUrl);
    console.debug("currentDomain", currentDomain);

    const crossDomainPlatforms = await filterDomains(allPlatformDomains, currentDomain);
    console.debug("crossDomainPlatforms", crossDomainPlatforms);

    const platformDomains = await PlatformsDetectedOnCurrentPage(
      crossDomainPlatforms,
      window
    );
    console.debug("platformDomains", platformDomains);

    if (platformDomains) {
      console.debug("cross-platform domains found!");
      console.debug("PROCEEDING TO NEXT STEP")
      console.groupEnd();
    } else {
      console.debug("No cross-platform domains. ENDING");
      console.groupEnd();
      return;
    }


    console.group("2. Get anonymousDistinctId");

    let anonymousDistinctId = await getLocalAnonymousDistinctId();

    if (!anonymousDistinctId) {
      console.debug("no anonymousDistinctId Locally. Getting remotely...");

      console.debug("wait for posthog to load...");

      let posthog_available = waitingForPosthog(window);

      if (posthog_available) {
        console.debug("posthog available!")
        anonymousDistinctId = await fetchDistinctID(window.posthog);
      } else {
        console.error("Posthog not available.");
      }

      if (anonymousDistinctId) {
        console.debug("%cSuccessfully got anonymousDistinctId remotely", anonymousDistinctId, "color: green");
        console.debug("Setting locally for future...");
        await setLocalAnonymousDistinctId(anonymousDistinctId);
      }
    } else {
      console.debug("got anonymousDistinctId Locally", anonymousDistinctId);
    }

    if (anonymousDistinctId) {
      console.debug("anonymousDistinctId available. PROCEEDING TO NEXT STEP")
    } else {
      console.debug("anonymousDistinctId not available. ENDING")
    }
    console.groupEnd();


    if (anonymousDistinctId) {
      console.group("3. applyParamsToLinks");
      const urlParams = [
        { name: "referring_platform_domain", value: currentDomain },
        { name: "anonymous_distinct_id", value: anonymousDistinctId }
      ];

      console.debug("urlParams: ", urlParams);

      await applyParamsToLinks(platformDomains, urlParams, window);
      console.groupEnd();
    }
  } catch (error) {
    console.error("unexpected error:", error);
  }
}

module.exports = { appendCrossPlatformLinks };
