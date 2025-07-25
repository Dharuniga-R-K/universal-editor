/*!
 * jQuery UI Legacy jQuery Core patches 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 *
 */
!(function (e) {
  typeof define === 'function' && define.amd ? define(['jquery', './version'], e) : e(jQuery);
}(((e) => {
  e.escapeSelector || (e.escapeSelector = function (e) { return CSS.escape(`${e}`); }), e.fn.even && e.fn.odd || e.fn.extend({ even() { return this.filter(((e) => e % 2 == 0)); }, odd() { return this.filter(((e) => e % 2 == 1)); } });
})));
// # sourceMappingURL=jquery-patch-min.js.map
