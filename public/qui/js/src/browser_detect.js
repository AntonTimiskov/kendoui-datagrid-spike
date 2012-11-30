// Append a class to the body which specifies the browser, qui_ie_7, qui_chrome, etc.
// This allows QUI to target a specific browser rendering issue, such as menu alignment in IE7.
$(function () {
    "use strict";
    var klass = 'qui_';

    if ($.browser.msie) {
        klass += 'ie_';
        klass += _($.browser.version).strLeft('.');
    } else if ($.browser.webkit) {
        klass += 'webkit';
    } else if ($.browser.mozilla) {
        klass += 'mozilla';
    } else if ($.browser.opera) {
        klass += 'opera';
    }

    $('body').addClass(klass);
});
