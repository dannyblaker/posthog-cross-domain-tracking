
/**
 * Identifies a user via PostHog analytics.
 *
 * @param {string} person_distinct_id - The unique identifier of the person.
 * @returns {Promise<boolean>} Resolves with `true` if the identification was successful,
 *                            `false` otherwise.
 */
async function identifyPosthogUser(person_distinct_id, posthog) {
  try {
    // Attempt to identify the user using PostHog's identify method
    posthog.identify(person_distinct_id);
    console.debug("%c Successfully identified user!", "color: green");
    return true;
  } catch (error) {
    console.error(
      `Error identifying user with ID: ${person_distinct_id}`,
      error
    );
    return false;
  }
}

module.exports = { identifyPosthogUser }