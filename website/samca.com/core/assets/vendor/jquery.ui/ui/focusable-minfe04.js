/*!
 * jQuery UI Focusable 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!(function (e) {
  typeof define === 'function' && define.amd ? define(['jquery', './version'], e) : e(jQuery);
}(((e) => (e.ui.focusable = function (t, i) { let s; let n; let u; let a; let o; const r = t.nodeName.toLowerCase(); return r === 'area' ? (n = (s = t.parentNode).name, !(!t.href || !n || s.nodeName.toLowerCase() !== 'map') && ((u = e(`img[usemap='#${n}']`)).length > 0 && u.is(':visible'))) : (/^(input|select|textarea|button|object)$/.test(r) ? (a = !t.disabled) && (o = e(t).closest('fieldset')[0]) && (a = !o.disabled) : a = r === 'a' && t.href || i, a && e(t).is(':visible') && e(t).css('visibility') === 'visible'); }, e.extend(e.expr.pseudos, { focusable(t) { return e.ui.focusable(t, e.attr(t, 'tabindex') != null); } }), e.ui.focusable))));
// # sourceMappingURL=focusable-min.js.map
