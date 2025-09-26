async function filterDomains(platform_domains_list, current_domain) {

    const cross_domain_platforms = platform_domains_list.filter(
        (domain) => domain !== current_domain
    );

    return cross_domain_platforms;
}


module.exports = { filterDomains }; 