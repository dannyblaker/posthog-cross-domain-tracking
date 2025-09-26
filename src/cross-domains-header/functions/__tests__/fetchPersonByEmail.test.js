const { fetchPersonByEmail } = require('../fetchPersonByEmail');
const fetchMock = require('jest-fetch-mock');

// Set up global fetch mock
fetchMock.enableMocks();

describe('fetchPersonByEmail', () => {
  
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch a person by email', async () => {
    const expectedData = { distinct_id: 'johndoe@example.com' };
    fetchMock.mockResponseOnce(JSON.stringify(expectedData));

    const data = await fetchPersonByEmail('johndoe@example.com');
    expect(data).toEqual(expectedData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

});
