/*
 * jQuery UA plugin v0.9.2
 * https://github.com/terkel/jquery-ua
 *
 * Copyright (c) 2011 Takeru Suzuki
 * Dual licensed under the MIT and GPL licenses.
 *
 * Inspired by PPK's Browser Detect http://www.quirksmode.org/js/detect.html
 */
(function ($) {

    $.ua = $.ua || {};

    var ua = navigator.userAgent.toLowerCase(),
        platforms = [
            { name: 'win',        version: 'windows(?: nt)? ', versionNames: [
                //{ number: '6.2',  name: 'win8' },
                { number: '6.1',  name: 'win7' },
                { number: '6.0',  name: 'winVista' },
                { number: '5.2',  name: 'winXP' },
                { number: '5.1',  name: 'winXP' },
                { number: '5.01', name: 'win2000' },
                { number: '5.0',  name: 'win2000' }
            ]},
            { name: 'ipad',       version: 'cpu os ' }, // ipad and ipod must be tested before iphone
            { name: 'ipod',       version: 'iphone os ' },
            { name: 'iphone',     version: 'iphone os ' }, // iphone must be tested before mac
            { name: 'mac',        version: 'os x ' },
            { name: 'android',    version: 'android ' }, // android must be tested before linux
            { name: 'blackberry', version: '(?:blackberry\\d{4}[a-z]?|version)/' },
            { name: 'linux' }
        ],
        browsers = [
            { name: 'msie',    version: 'msie ' },
            { name: 'firefox', version: 'firefox/' },
            { name: 'chrome',  version: 'chrome/' }, // chrome must be tested before safari
            { name: 'safari',  version: 'version/' },
            { name: 'opera',   version: 'version/' }
        ],
        engines = [
            { name: 'trident', version: 'trident/' },
            { name: 'webkit',  version: 'webkit/' }, // webkit must be tested before gecko
            { name: 'gecko',   version: 'rv:' },
            { name: 'presto',  version: 'presto/' }
        ],
        p = $.ua.platform = detect(platforms),
        b = $.ua.browser = detect(browsers),
        e = $.ua.engine = detect(engines);

    $('html').addClass([
        p.name,
        p.versionName,
        b.name,
        b.name + b.versionMajor,
        e.name,
        e.name + e.versionMajor
    ].join(' '));

    function detect (data) {
        var item = {},
            c,
            i,
            is,
            j,
            js;
        for (i = 0, is = data.length; i < is; i++) {
            c = data[i];
            if (new RegExp(c.name).test(ua)) {
                item.name = c.name;
                item[item.name] = true;
                item.version = String((new RegExp(c.version + '(\\d+((\\.|_)\\d+)*)').exec(ua) || [, 0])[1]).replace(/_/g, '.');
                item.versionMajor = parseInt(item.version, 10);
                if (data === platforms) {
                    item.mobile = /mobile|phone/.test(ua) || item.blackberry;
                    item.tablet = /tablet/.test(ua) || item.ipad || (item.android && !/mobile/.test(ua));
                }
                if (c.versionNames) {
                    for (j = 0, js = c.versionNames.length; j < js; j++) {
                        if (item.version === c.versionNames[j].number) {
                            item.versionName = c.versionNames[j].name;
                            item[item.versionName] = true;
                            break;
                        }
                    }
                }
                break;
            }
        }
        if (!item.name) {
            item.name = 'unknown';
            item['unknown'] = true;
            item.version = '';
            item.versionMajor = '';
        }
        return item;
    }

})(jQuery);
