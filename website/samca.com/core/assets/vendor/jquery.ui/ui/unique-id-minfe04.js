/*!
 * jQuery UI Unique ID 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!(function (i) {
  typeof define === 'function' && define.amd ? define(['jquery', './version'], i) : i(jQuery);
}(((i) => {
  return i.fn.extend({ uniqueId: (e = 0, function () { return this.each((function () { this.id || (this.id = `ui-id-${++e}`); })); }), removeUniqueId() { return this.each((function () { /^ui-id-\d+$/.test(this.id) && i(this).removeAttr('id'); })); } }); let e;
})));
// # sourceMappingURL=unique-id-min.js.map
