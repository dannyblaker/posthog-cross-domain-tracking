async function getLocalAnonymousDistinctId() {
    try {
        return window.localStorage.getItem("anonymous_distinct_id");
    } catch (err) {
        console.error('LocalStorage may be disabled:', err);
        return null;
    }
}

module.exports = { getLocalAnonymousDistinctId };