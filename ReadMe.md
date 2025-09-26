# Cross-Domain Tracking with Posthog

# About

A HTML header script to enable cross-domain tracking in [Posthog](https://posthog.com/) by identifying users as they navigate across any number of different domains. This is achieved by two core modules found in `src/flows`: `appendCrossPlatformLinks.js` and `identifyCrossPlatformUser.js`.

## `appendCrossPlatformLinks.js`

This module is responsible for appending parameters to links on the current page that point to external platform domains. It performs the following tasks:

- Fetches the current URL and extracts the current domain.
- Filters a list of provided platform domains to exclude the current domain.
- Detects platform domains present on the current page by searching for matching links.
- Appends the referring platform domain and the anonymous distinct ID as parameters to the identified platform domains, if available.

## `identifyCrossPlatformUser.js`

This module identifies users by searching for distinct ID parameters in the current URL. It carries out the following steps:

- Fetches the current URL and extracts the current platform domain.
- Retrieves a list of previously identified platform domains and anonymous distinct IDs from local browser storage (if exists & is ocal storage is accessible).
- Identifies any platform domains that have yet to be identified by comparing the list of all platform domains with the identified ones.
- If both the anonymous distinct ID and the referring platform domain are available, it identifies the user using PostHog analytics and updates the list of identified platform domains.


# Pre-requisites

Install `Docker`, `npm`, and `nodejs v18`

# Local Development

Run the following commands:

```bash
npm install
npm run build
```

## Helpful references for local testing

clear local storage: `window.localStorage.clear()`

example identification url: https://domain2.com/?referring_platform_domain=domain1.com&anonymous_distinct_id=<ID>

# Deployment

All production deployment steps can be found in `.onedev-buildspec.yml` which can be run as a CI/CD Pipeline via OneDev. See [OneDev documentation](https://docs.onedev.io/category/cicd) for reference. 

# Tests

A Jest Test suite is included with full coverage, located at `src/functions/__tests__`

# API Endpoints

This repository assumes API endpoints are created using [n8n](https://n8n.io/), which store user data in a redis database.


## Endpoint 1: set_user
set_user: https://n8n.example.com/cross-domain/set_user

Parameters:

    "email" : "email@test.com"
    distinct_id" : "123..."

Example: 

`https://n8n.example.com/cross-domain/set_user?email=email@test.com&distinct_id=81234`


## Endpoint 2: get_user
set_email_and_id: `https://n8n.example.com/cross-domain/get_user`

Parameters:
```
"email" : "email@test.com"
```

Example: 

`https://n8n.example.com/get_user?email=email@test.com`
