/*!
 * jQuery UI Form Reset Mixin 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!(function (e) {
  typeof define === 'function' && define.amd ? define(['jquery', './version'], e) : e(jQuery);
}(((e) => e.ui.formResetMixin = { _formResetHandler() { const t = e(this); setTimeout((() => { const r = t.data('ui-form-reset-instances'); e.each(r, (function () { this.refresh(); })); })); }, _bindFormResetHandler() { if (this.form = e(this.element.prop('form')), this.form.length) { const t = this.form.data('ui-form-reset-instances') || []; t.length || this.form.on('reset.ui-form-reset', this._formResetHandler), t.push(this), this.form.data('ui-form-reset-instances', t); } }, _unbindFormResetHandler() { if (this.form.length) { const t = this.form.data('ui-form-reset-instances'); t.splice(e.inArray(this, t), 1), t.length ? this.form.data('ui-form-reset-instances', t) : this.form.removeData('ui-form-reset-instances').off('reset.ui-form-reset'); } } })));
// # sourceMappingURL=form-reset-mixin-min.js.map
