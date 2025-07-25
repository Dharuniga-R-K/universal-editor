/*!
 * jQuery Once v2.2.0 - http://github.com/robloach/jquery-once
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */
(function (e) {
  if (typeof exports === 'object') { e(require('jquery')); } else if (typeof define === 'function' && define.amd) { define(['jquery'], e); } else { e(jQuery); }
}((e) => {
  const n = function (e) { e = e || 'once'; if (typeof e !== 'string') { throw new TypeError('The jQuery Once id parameter must be a string'); } return e; }; e.fn.once = function (t) { const r = `jquery-once-${n(t)}`; return this.filter(function () { return e(this).data(r) !== true; }).data(r, true); }; e.fn.removeOnce = function (e) { return this.findOnce(e).removeData(`jquery-once-${n(e)}`); }; e.fn.findOnce = function (t) { const r = `jquery-once-${n(t)}`; return this.filter(function () { return e(this).data(r) === true; }); };
}));
