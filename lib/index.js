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
var https_1 = require("https");
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
            var url = _this.marketBase + query;
            _this.callMarket(url).then(resolve, reject);
        });
    };
    SteamMarket.prototype.getQuery = function (searchOptions) {
        searchOptions.query = url_1.URLHelper.formatURL(searchOptions.query);
        return url_1.URLHelper.convertSearchOptionsToQuery(__assign({ start: 0, count: 50, sort_column: 'price', sort_dir: 'desc', search_descriptions: 0, norender: 1 }, searchOptions));
    };
    SteamMarket.prototype.callMarket = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            https_1.get(url, function (res) {
                _this.handle(res).then(resolve, reject);
            });
        });
    };
    SteamMarket.prototype.handle = function (res) {
        return new Promise(function (resolve, reject) {
            var data = '';
            res.on('error', function () { return data += '{msg: "Error!"}'; });
            res.on('data', function (chunk) { return data += chunk; });
            res.on('end', function () {
                try {
                    var dataJson = JSON.parse(data);
                    if (!res.statusCode) {
                        return reject(new Error('Status code not received'));
                    }
                    if (res.statusCode !== 200) {
                        return reject(new Error('Bad status code: ' + res.statusCode));
                    }
                    if (dataJson.success !== true) {
                        return reject(new Error('Error occured'));
                    }
                    resolve(dataJson.results);
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    };
    return SteamMarket;
}());
exports.SteamMarket = SteamMarket;
var market = new SteamMarket();
market.search({ query: "AK-47", appid: 730, start: 10 }).then(function (resolve) {
    console.log(resolve);
});
