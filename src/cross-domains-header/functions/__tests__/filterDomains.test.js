const { filterDomains } = require('../filterDomains');

describe('filter_domains', () => {
    it('should correctly filter the current domain out of the list', async () => {
        const platform_domains_list = [
            "example.net",
            "example.online",
            "example.com",
        ];
        const current_domain = "example.net";
        const expected_result = [
            "example.online",
            "example.com",
        ];
        const result = await filterDomains(platform_domains_list, current_domain);
        expect(result).toEqual(expected_result);
    });

    it('should return an empty array when all elements are the current domain', async () => {
        const platform_domains_list = [
            "example.net",
            "example.net",
            "example.net",
        ];
        const current_domain = "example.net";
        const expected_result = [];
        const result = await filterDomains(platform_domains_list, current_domain);
        expect(result).toEqual(expected_result);
    });

    it('should return the same array when no elements are the current domain', async () => {
        const platform_domains_list = [
            "example.online",
            "example.com",
        ];
        const current_domain = "example.net";
        const expected_result = [...platform_domains_list];
        const result = await filterDomains(platform_domains_list, current_domain);
        expect(result).toEqual(expected_result);
    });
});
