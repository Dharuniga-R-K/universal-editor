/*!
 * jQuery UI Checkboxradio 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!(function (e) {
  typeof define === 'function' && define.amd ? define(['jquery', '../form-reset-mixin', '../labels', '../widget'], e) : e(jQuery);
}(((e) => (e.widget('ui.checkboxradio', [e.ui.formResetMixin, {
  version: '1.14.1',
  options: {
    disabled: null, label: null, icon: !0, classes: { 'ui-checkboxradio-label': 'ui-corner-all', 'ui-checkboxradio-icon': 'ui-corner-all' },
  },
  _getCreateOptions() { let i; let t; let s; const n = this._super() || {}; return this._readType(), t = this.element.labels(), this.label = e(t[t.length - 1]), this.label.length || e.error('No label found for checkboxradio widget'), this.originalLabel = '', (s = this.label.contents().not(this.element[0])).length && (this.originalLabel += s.clone().wrapAll('<div></div>').parent().html()), this.originalLabel && (n.label = this.originalLabel), (i = this.element[0].disabled) != null && (n.disabled = i), n; },
  _create() { const e = this.element[0].checked; this._bindFormResetHandler(), this.options.disabled == null && (this.options.disabled = this.element[0].disabled), this._setOption('disabled', this.options.disabled), this._addClass('ui-checkboxradio', 'ui-helper-hidden-accessible'), this._addClass(this.label, 'ui-checkboxradio-label', 'ui-button ui-widget'), this.type === 'radio' && this._addClass(this.label, 'ui-checkboxradio-radio-label'), this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel), this._enhance(), e && this._addClass(this.label, 'ui-checkboxradio-checked', 'ui-state-active'), this._on({ change: '_toggleClasses', focus() { this._addClass(this.label, null, 'ui-state-focus ui-visual-focus'); }, blur() { this._removeClass(this.label, null, 'ui-state-focus ui-visual-focus'); } }); },
  _readType() { const i = this.element[0].nodeName.toLowerCase(); this.type = this.element[0].type, i === 'input' && /radio|checkbox/.test(this.type) || e.error(`Can't create checkboxradio on element.nodeName=${i} and element.type=${this.type}`); },
  _enhance() { this._updateIcon(this.element[0].checked); },
  widget() { return this.label; },
  _getRadioGroup() { const i = this.element[0].name; const t = `input[name='${CSS.escape(i)}']`; return i ? (this.form.length ? e(this.form[0].elements).filter(t) : e(t).filter((function () { return e(e(this).prop('form')).length === 0; }))).not(this.element) : e([]); },
  _toggleClasses() { const i = this.element[0].checked; this._toggleClass(this.label, 'ui-checkboxradio-checked', 'ui-state-active', i), this.options.icon && this.type === 'checkbox' && this._toggleClass(this.icon, null, 'ui-icon-check ui-state-checked', i)._toggleClass(this.icon, null, 'ui-icon-blank', !i), this.type === 'radio' && this._getRadioGroup().each((function () { const i = e(this).checkboxradio('instance'); i && i._removeClass(i.label, 'ui-checkboxradio-checked', 'ui-state-active'); })); },
  _destroy() { this._unbindFormResetHandler(), this.icon && (this.icon.remove(), this.iconSpace.remove()); },
  _setOption(e, i) { if (e !== 'label' || i) { if (this._super(e, i), e === 'disabled') return this._toggleClass(this.label, null, 'ui-state-disabled', i), void (this.element[0].disabled = i); this.refresh(); } },
  _updateIcon(i) { let t = 'ui-icon ui-icon-background '; this.options.icon ? (this.icon || (this.icon = e('<span>'), this.iconSpace = e('<span> </span>'), this._addClass(this.iconSpace, 'ui-checkboxradio-icon-space')), this.type === 'checkbox' ? (t += i ? 'ui-icon-check ui-state-checked' : 'ui-icon-blank', this._removeClass(this.icon, null, i ? 'ui-icon-blank' : 'ui-icon-check')) : t += 'ui-icon-blank', this._addClass(this.icon, 'ui-checkboxradio-icon', t), i || this._removeClass(this.icon, null, 'ui-icon-check ui-state-checked'), this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(), this.iconSpace.remove(), delete this.icon); },
  _updateLabel() { let e = this.label.contents().not(this.element[0]); this.icon && (e = e.not(this.icon[0])), this.iconSpace && (e = e.not(this.iconSpace[0])), e.remove(), this.label.append(this.options.label); },
  refresh() { const e = this.element[0].checked; const i = this.element[0].disabled; this._updateIcon(e), this._toggleClass(this.label, 'ui-checkboxradio-checked', 'ui-state-active', e), this.options.label !== null && this._updateLabel(), i !== this.options.disabled && this._setOptions({ disabled: i }); },
}]), e.ui.checkboxradio))));
// # sourceMappingURL=checkboxradio-min.js.map
