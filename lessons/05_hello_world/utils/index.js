const {FAVICON_URL, GET_METHOD} = require('../constants');

const isFaviconRequest = (url, method) => {
    return method === GET_METHOD && url === FAVICON_URL
}

module.exports = {isFaviconRequest}