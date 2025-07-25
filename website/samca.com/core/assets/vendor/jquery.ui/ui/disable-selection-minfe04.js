/*!
 * jQuery UI Disable Selection 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!(function (e) {
  typeof define === 'function' && define.amd ? define(['jquery', './version'], e) : e(jQuery);
}(((e) => {
  return e.fn.extend({ disableSelection: (n = 'onselectstart' in document.createElement('div') ? 'selectstart' : 'mousedown', function () { return this.on(`${n}.ui-disableSelection`, ((e) => { e.preventDefault(); })); }), enableSelection() { return this.off('.ui-disableSelection'); } }); let n;
})));
// # sourceMappingURL=disable-selection-min.js.map
