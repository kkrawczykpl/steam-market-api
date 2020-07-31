"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLHelper = void 0;
var URLHelper = /** @class */ (function () {
    function URLHelper() {
    }
    /**
     * Converts space to plus sign
     * @param url
     * @returns space to plus
     */
    URLHelper.prototype.convertSpaceToPlus = function (url) {
        return url.split(' ').join('+');
    };
    /**
     * Converts SearchOptions Object to query
     * e.g { appid: '730', foo: 'bar' } becomes ?appid=730&foo=bar
     * @param searchOptions (SearchOptions)
     * @returns string
     */
    URLHelper.prototype.convertSearchOptionsToQuery = function (searchOptions) {
        var query = Object.keys(searchOptions).map(function (key, index) {
            var prefix = (index === 0 ? '?' : '&');
            return prefix + (key + "=" + searchOptions[key]);
        });
        return query.join('');
    };
    return URLHelper;
}());
var helper = new URLHelper();
exports.URLHelper = helper;
