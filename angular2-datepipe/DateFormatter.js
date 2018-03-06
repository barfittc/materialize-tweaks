/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";


var KeyValuePair = (function () {
    function KeyValuePair(key, value) {
        this.key = key;
        this.value = value;
    }
    return KeyValuePair;
}());
var Map = (function () {
    // ---------------------------------------------
    function Map() {
        this.keyAndValues = [];
    }
    // --- Public Methods ---
    Map.prototype.getKeysOfValue = function (value) {
        var keysToReturn = [];
        var valueToFind = value;
        this.keyAndValues.forEach(function (value, index, array) {
            if (value.value === valueToFind) {
                keysToReturn.push(value.key);
            }
        });
        return keysToReturn;
    };
    // Standard:
    Map.prototype.clear = function () {
        this.keyAndValues = [];
    };
    Map.prototype.delete = function (key) {
        var found = false;
        this.keyAndValues.forEach(function (value, index, array) {
            if (found)
                return;
            if (key === value.key) {
                array = array.slice(0, index).concat(array.slice(index + 1));
                found = true;
            }
        });
        return found;
    };
    Map.prototype.forEach = function (callbackfn, thisArg) {
        this.keyAndValues.forEach(function (value, index, array) {
            callbackfn.apply(thisArg, [value.value, value.key, this]);
        }, this);
    };
    Map.prototype.get = function (key) {
        var valueToReturn = undefined;
        this.keyAndValues.forEach(function (value, index, array) {
            if (valueToReturn !== undefined)
                return;
            if (key === value.key) {
                valueToReturn = value.value;
            }
        });
        return valueToReturn;
    };
    Map.prototype.has = function (key) {
        var found = false;
        this.keyAndValues.forEach(function (value, index, array) {
            if (found)
                return;
            if (key === value.key) {
                found = true;
            }
        });
        return found;
    };
    Map.prototype.set = function (key, value) {
        var found = false;
        var valueToSet = value;
        this.keyAndValues.forEach(function (value, index, array) {
            if (found)
                return;
            if (key === value.key) {
                found = true;
                value.value = valueToSet;
            }
        });
        if (!found) {
            this.keyAndValues.push(new KeyValuePair(key, valueToSet));
        }
        return this;
    };
    Object.defineProperty(Map.prototype, "size", {
        // ----------------------
        // Getters:
        // Standard:
        get: function () {
            return this.keyAndValues.length;
        },
        enumerable: true,
        configurable: true
    });
    return Map;
}());
var NumberFormatStyle = {};
(function (NumberFormatStyle) {
    NumberFormatStyle[NumberFormatStyle["Decimal"] = 0] = "Decimal";
    NumberFormatStyle[NumberFormatStyle["Percent"] = 1] = "Percent";
    NumberFormatStyle[NumberFormatStyle["Currency"] = 2] = "Currency";
})(NumberFormatStyle);

var NumberFormatter = (function () {
    function NumberFormatter() {
    }
    NumberFormatter.format = function (num, locale, style, _a) {
        var _b = _a === void 0 ? {} : _a, minimumIntegerDigits = _b.minimumIntegerDigits, minimumFractionDigits = _b.minimumFractionDigits, maximumFractionDigits = _b.maximumFractionDigits, currency = _b.currency, _c = _b.currencyAsSymbol, currencyAsSymbol = _c === void 0 ? false : _c;
        var options = {
            minimumIntegerDigits: minimumIntegerDigits,
            minimumFractionDigits: minimumFractionDigits,
            maximumFractionDigits: maximumFractionDigits,
            style: NumberFormatStyle[style].toLowerCase()
        };
        if (style == NumberFormatStyle.Currency) {
            options.currency = currency;
            options.currencyDisplay = currencyAsSymbol ? 'symbol' : 'code';
        }
        return new Intl.NumberFormat(locale, options).format(num);
    };
    return NumberFormatter;
}());

var DATE_FORMATS_SPLIT = /((?:[^yMLdHhmsazZEwGjJ']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|J+|j+|m+|s+|a|z|Z|G+|w+))(.*)/;
var PATTERN_ALIASES = {
    yMMMdjms: datePartGetterFactory(combine([
        digitCondition('year', 1),
        nameCondition('month', 3),
        digitCondition('day', 1),
        digitCondition('hour', 1),
        digitCondition('minute', 1),
        digitCondition('second', 1),
    ])),
    yMdjm: datePartGetterFactory(combine([
        digitCondition('year', 1), digitCondition('month', 1), digitCondition('day', 1),
        digitCondition('hour', 1), digitCondition('minute', 1)
    ])),
    yMMMMEEEEd: datePartGetterFactory(combine([
        digitCondition('year', 1), nameCondition('month', 4), nameCondition('weekday', 4),
        digitCondition('day', 1)
    ])),
    yMMMMd: datePartGetterFactory(combine([digitCondition('year', 1), nameCondition('month', 4), digitCondition('day', 1)])),
    yMMMd: datePartGetterFactory(combine([digitCondition('year', 1), nameCondition('month', 3), digitCondition('day', 1)])),
    yMd: datePartGetterFactory(combine([digitCondition('year', 1), digitCondition('month', 1), digitCondition('day', 1)])),
    jms: datePartGetterFactory(combine([digitCondition('hour', 1), digitCondition('second', 1), digitCondition('minute', 1)])),
    jm: datePartGetterFactory(combine([digitCondition('hour', 1), digitCondition('minute', 1)]))
};
var DATE_FORMATS = {
    yyyy: datePartGetterFactory(digitCondition('year', 4)),
    yy: datePartGetterFactory(digitCondition('year', 2)),
    y: datePartGetterFactory(digitCondition('year', 1)),
    MMMM: datePartGetterFactory(nameCondition('month', 4)),
    MMM: datePartGetterFactory(nameCondition('month', 3)),
    MM: datePartGetterFactory(digitCondition('month', 2)),
    M: datePartGetterFactory(digitCondition('month', 1)),
    LLLL: datePartGetterFactory(nameCondition('month', 4)),
    dd: datePartGetterFactory(digitCondition('day', 2)),
    d: datePartGetterFactory(digitCondition('day', 1)),
    HH: digitModifier(hourExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 2), false)))),
    H: hourExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), false))),
    hh: digitModifier(hourExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 2), true)))),
    h: hourExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), true))),
    jj: datePartGetterFactory(digitCondition('hour', 2)),
    j: datePartGetterFactory(digitCondition('hour', 1)),
    mm: digitModifier(datePartGetterFactory(digitCondition('minute', 2))),
    m: datePartGetterFactory(digitCondition('minute', 1)),
    ss: digitModifier(datePartGetterFactory(digitCondition('second', 2))),
    s: datePartGetterFactory(digitCondition('second', 1)),
    // while ISO 8601 requires fractions to be prefixed with `.` or `,`
    // we can be just safely rely on using `sss` since we currently don't support single or two digit
    // fractions
    sss: datePartGetterFactory(digitCondition('second', 3)),
    EEEE: datePartGetterFactory(nameCondition('weekday', 4)),
    EEE: datePartGetterFactory(nameCondition('weekday', 3)),
    EE: datePartGetterFactory(nameCondition('weekday', 2)),
    E: datePartGetterFactory(nameCondition('weekday', 1)),
    a: hourClockExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), true))),
    Z: timeZoneGetter('short'),
    z: timeZoneGetter('long'),
    ww: datePartGetterFactory({}),
    // first Thursday of the year. not support ?
    w: datePartGetterFactory({}),
    // of the year not support ?
    G: datePartGetterFactory(nameCondition('era', 1)),
    GG: datePartGetterFactory(nameCondition('era', 2)),
    GGG: datePartGetterFactory(nameCondition('era', 3)),
    GGGG: datePartGetterFactory(nameCondition('era', 4))
};
function digitModifier(inner) {
    return function (date, locale) {
        var result = inner(date, locale);
        return result.length == 1 ? '0' + result : result;
    };
}
function hourClockExtracter(inner) {
    return function (date, locale) {
        var result = inner(date, locale);
        return result.split(' ')[1];
    };
}
function hourExtracter(inner) {
    return function (date, locale) {
        var result = inner(date, locale);
        return result.split(' ')[0];
    };
}
function intlDateFormat(date, locale, options) {
    return new Intl.DateTimeFormat(locale, options).format(date).replace(/[\u200e\u200f]/g, '');
}
function timeZoneGetter(timezone) {
    // To workaround `Intl` API restriction for single timezone let format with 24 hours
    var options = { hour: '2-digit', hour12: false, timeZoneName: timezone };
    return function (date, locale) {
        var result = intlDateFormat(date, locale, options);
        // Then extract first 3 letters that related to hours
        return result ? result.substring(3) : '';
    };
}
function hour12Modify(options, value) {
    options.hour12 = value;
    return options;
}
function digitCondition(prop, len) {
    var result = {};
    result[prop] = len == 2 ? '2-digit' : 'numeric';
    return result;
}
function nameCondition(prop, len) {
    var result = {};
    result[prop] = len < 4 ? 'short' : 'long';
    return result;
}
function combine(options) {
    var result = {};
    options.forEach(function (option) { Object.assign(result, option); });
    return result;
}
function datePartGetterFactory(ret) {
    return function (date, locale) { return intlDateFormat(date, locale, ret); };
}
var datePartsFormatterCache = new Map();
function dateFormatter(format, date, locale) {
    var text = '';
    var match;
    var fn;
    var parts = [];
    if (PATTERN_ALIASES[format]) {
        return PATTERN_ALIASES[format](date, locale);
    }
    if (datePartsFormatterCache.has(format)) {
        parts = datePartsFormatterCache.get(format);
    }
    else {
        var matches = DATE_FORMATS_SPLIT.exec(format);
        while (format) {
            match = DATE_FORMATS_SPLIT.exec(format);
            if (match) {
                parts = concat(parts, match, 1);
                format = parts.pop();
            }
            else {
                parts.push(format);
                format = null;
            }
        }
        datePartsFormatterCache.set(format, parts);
    }
    parts.forEach(function (part) {
        fn = DATE_FORMATS[part];
        text += fn ? fn(date, locale) :
            part === '\'\'' ? '\'' : part.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
    });
    return text;
}
var slice = [].slice;
function concat(array1 /** TODO #9100 */, array2 /** TODO #9100 */, index /** TODO #9100 */) {
    return array1.concat(slice.call(array2, index));
}

var DateFormatter = (function () {
    function DateFormatter(locale) {
        this.format = function (date, pattern) {
            return dateFormatter(pattern, date, locale);
        };
    }
    return DateFormatter;
}());
