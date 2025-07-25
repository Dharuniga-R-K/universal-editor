/*!
 * jQuery UI Scroll Parent 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!(function (t) {
  typeof define === 'function' && define.amd ? define(['jquery', './version'], t) : t(jQuery);
}(((t) => t.fn.scrollParent = function (e) { const s = this.css('position'); const n = s === 'absolute'; const o = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/; const i = this.parents().filter((function () { const e = t(this); return (!n || e.css('position') !== 'static') && o.test(e.css('overflow') + e.css('overflow-y') + e.css('overflow-x')); })).eq(0); return s !== 'fixed' && i.length ? i : t(this[0].ownerDocument || document); })));
// # sourceMappingURL=scroll-parent-min.js.map
