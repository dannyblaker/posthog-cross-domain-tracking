async function waitingForPosthog(window) {
  let posthogPromise;

  function waiting() {
    console.debug("Waiting for posthog!");
  }

  let counter = 0;
  const maxAttempts = 30;

  while (!window["posthog"]) {
    if (counter >= maxAttempts) {
      console.debug("posthog was not found after", maxAttempts, "attempts.");
      if (posthogPromise) {
        // Clear the promise if the maximum attempts are reached
        posthogPromise.clear();
      }
      return false;
    }

    if (!posthogPromise) {
      posthogPromise = new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Wait for the promise to resolve or reject with a timeout
    try {
      await Promise.race([posthogPromise, new Promise((_, reject) => setTimeout(reject, 1000))]);
    } catch (error) {
      // Timeout occurred, continue waiting
      posthogPromise = null; // Clear the current promise to create a new one in the next iteration
    }

    counter++;
    waiting();
  }

  console.debug("posthog is available!");
  return true;
}

module.exports = { waitingForPosthog };
