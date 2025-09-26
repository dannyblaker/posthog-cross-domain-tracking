async function fetchPersonByEmail(email) {
  // Prepare the request
  let baseUrl = "https://n8n.example.com/webhook/cross-domain/get_user";
  let url = new URL(baseUrl);

  url.searchParams.append('email', email);

  try {
    // Send the request and get the response


    console.debug("fetching...: ", url);

    const response = await fetch(url.href, {
      method: "GET",
    });

    console.debug("complete...: ", url);


    // If the response is not ok (status 200)
    if (!response.ok) {
      // If the status code is 404, return a specific message
      if (response.status === 404) {

        console.debug("Empty email parameter", response.status);

        return null;
      }
      if (response.status === 405) {

        console.debug("emaill address: ", emailAddress);

        console.error("User not found" + response.status);
        return null;
      }
      // Otherwise, return a generic message
      console.error("Error: " + response.status);
      return null;
    }

    // Parse the response body as JSON
    const data = await response.json();

    console.debug("SUCCESS: user with email found");

    return data;

  } catch (error) {
    // Log any errors
    console.error(error);
    return null;
  }
}

module.exports = { fetchPersonByEmail }
