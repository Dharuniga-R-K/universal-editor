/*!
 * jQuery UI Labels 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!(function (t) {
  typeof define === 'function' && define.amd ? define(['jquery', './version'], t) : t(jQuery);
}(((t) => t.fn.labels = function () { let t; let s; let e; let i; let n; return this.length ? this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (i = this.eq(0).parents('label'), (e = this.attr('id')) && (n = (t = this.eq(0).parents().last()).add(t.length ? t.siblings() : this.siblings()), s = `label[for='${CSS.escape(e)}']`, i = i.add(n.find(s).addBack(s))), this.pushStack(i)) : this.pushStack([]); })));
// # sourceMappingURL=labels-min.js.map
