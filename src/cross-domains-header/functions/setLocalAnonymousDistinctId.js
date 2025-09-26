async function setLocalAnonymousDistinctId(id) {
    try {
        window.localStorage.setItem("anonymous_distinct_id", id);
    } catch (err) {
        console.error('LocalStorage may be disabled:', err);
    }
}

module.exports = { setLocalAnonymousDistinctId };
