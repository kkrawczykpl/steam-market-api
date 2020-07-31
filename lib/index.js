"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SteamMarket = void 0;
var url_1 = require("./helpers/url");
var SteamMarket = /** @class */ (function () {
    function SteamMarket() {
        this.marketBase = 'https://steamcommunity.com/market/search/render/';
        this.imageBase = 'https://steamcommunity-a.akamaihd.net/economy/image/';
        return this;
    }
    SteamMarket.prototype.search = function (searchOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = _this.getQuery(searchOptions);
            console.log(_this.marketBase + query);
        });
    };
    SteamMarket.prototype.getQuery = function (searchOptions) {
        searchOptions.query = url_1.URLHelper.convertSpaceToPlus(searchOptions.query);
        return url_1.URLHelper.convertSearchOptionsToQuery(__assign({ start: 0, count: 50, sort_column: 'price', sort_dir: 'desc', search_descriptions: 0, norender: 1 }, searchOptions));
    };
    return SteamMarket;
}());
exports.SteamMarket = SteamMarket;
var market = new SteamMarket();
market.search({ query: "AK-47", appid: 730, start: 10 });
