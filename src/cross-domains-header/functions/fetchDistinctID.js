/**
 * Function to fetch a distinct ID from a remote server using PostHog's API.
 * @param {Object} posthog The PostHog object.
 * @returns {string|null} The distinct ID if successful, or null if not.
 */
async function fetchDistinctID(posthog) {
  let distinctId = null;

  try {
    // Attempt to get distinct ID using PostHog's API
    distinctId = posthog.get_distinct_id();
  } catch (error) {
    // Log the error message if API call fails
    console.error("Error fetching remote ID:", error);
  }

  return distinctId;
}

module.exports = { fetchDistinctID };
