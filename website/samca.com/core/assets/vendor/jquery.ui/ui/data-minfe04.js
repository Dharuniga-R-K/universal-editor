/*!
 * jQuery UI :data 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!(function (e) {
  typeof define === 'function' && define.amd ? define(['jquery', './version'], e) : e(jQuery);
}(((e) => e.extend(e.expr.pseudos, { data: e.expr.createPseudo(((n) => function (t) { return !!e.data(t, n); })) }))));
// # sourceMappingURL=data-min.js.map
