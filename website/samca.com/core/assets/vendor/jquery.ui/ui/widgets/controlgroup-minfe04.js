/*!
 * jQuery UI Controlgroup 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!(function (t) {
  typeof define === 'function' && define.amd ? define(['jquery', '../widget'], t) : t(jQuery);
}(((t) => {
  const e = /ui-corner-([a-z]){2,6}/g; return t.widget('ui.controlgroup', {
    version: '1.14.1',
    defaultElement: '<div>',
    options: {
      direction: 'horizontal',
      disabled: null,
      onlyVisible: !0,
      items: {
        button: 'input[type=button], input[type=submit], input[type=reset], button, a', controlgroupLabel: '.ui-controlgroup-label', checkboxradio: "input[type='checkbox'], input[type='radio']", selectmenu: 'select', spinner: '.ui-spinner-input',
      },
    },
    _create() { this._enhance(); },
    _enhance() { this.element.attr('role', 'toolbar'), this.refresh(); },
    _destroy() { this._callChildMethod('destroy'), this.childWidgets.removeData('ui-controlgroup-data'), this.element.removeAttr('role'), this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find('.ui-controlgroup-label-contents').contents().unwrap(); },
    _initWidgets() { const e = this; let i = []; t.each(this.options.items, ((n, o) => { let s; let l = {}; if (o) return n === 'controlgroupLabel' ? ((s = e.element.find(o)).each((function () { const e = t(this); e.children('.ui-controlgroup-label-contents').length || e.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>"); })), e._addClass(s, null, 'ui-widget ui-widget-content ui-state-default'), void (i = i.concat(s.get()))) : void (t.fn[n] && (l = e[`_${n}Options`] ? e[`_${n}Options`]('middle') : { classes: {} }, e.element.find(o).each((function () { const o = t(this); let s = o[n]('instance'); const r = t.widget.extend({}, l); if (n !== 'button' || !o.parent('.ui-spinner').length) { s || (s = o[n]()[n]('instance')), s && (r.classes = e._resolveClassesValues(r.classes, s)), o[n](r); const u = o[n]('widget'); t.data(u[0], 'ui-controlgroup-data', s || o[n]('instance')), i.push(u[0]); } })))); })), this.childWidgets = t(t.uniqueSort(i)), this._addClass(this.childWidgets, 'ui-controlgroup-item'); },
    _callChildMethod(e) { this.childWidgets.each((function () { const i = t(this).data('ui-controlgroup-data'); i && i[e] && i[e](); })); },
    _updateCornerClass(t, e) { const i = this._buildSimpleOptions(e, 'label').classes.label; this._removeClass(t, null, 'ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all'), this._addClass(t, null, i); },
    _buildSimpleOptions(t, e) {
      const i = this.options.direction === 'vertical'; const n = { classes: {} }; return n.classes[e] = {
        middle: '', first: `ui-corner-${i ? 'top' : 'left'}`, last: `ui-corner-${i ? 'bottom' : 'right'}`, only: 'ui-corner-all',
      }[t], n;
    },
    _spinnerOptions(t) { const e = this._buildSimpleOptions(t, 'ui-spinner'); return e.classes['ui-spinner-up'] = '', e.classes['ui-spinner-down'] = '', e; },
    _buttonOptions(t) { return this._buildSimpleOptions(t, 'ui-button'); },
    _checkboxradioOptions(t) { return this._buildSimpleOptions(t, 'ui-checkboxradio-label'); },
    _selectmenuOptions(t) {
      const e = this.options.direction === 'vertical'; return {
        width: !!e && 'auto',
        classes: {
          middle: { 'ui-selectmenu-button-open': '', 'ui-selectmenu-button-closed': '' }, first: { 'ui-selectmenu-button-open': `ui-corner-${e ? 'top' : 'tl'}`, 'ui-selectmenu-button-closed': `ui-corner-${e ? 'top' : 'left'}` }, last: { 'ui-selectmenu-button-open': e ? '' : 'ui-corner-tr', 'ui-selectmenu-button-closed': `ui-corner-${e ? 'bottom' : 'right'}` }, only: { 'ui-selectmenu-button-open': 'ui-corner-top', 'ui-selectmenu-button-closed': 'ui-corner-all' },
        }[t],
      };
    },
    _resolveClassesValues(i, n) { const o = {}; return t.each(i, ((t) => { let s = n.options.classes[t] || ''; s = String.prototype.trim.call(s.replace(e, '')), o[t] = (`${s} ${i[t]}`).replace(/\s+/g, ' '); })), o; },
    _setOption(t, e) { t === 'direction' && this._removeClass(`ui-controlgroup-${this.options.direction}`), this._super(t, e), t !== 'disabled' ? this.refresh() : this._callChildMethod(e ? 'disable' : 'enable'); },
    refresh() { let e; const i = this; this._addClass(`ui-controlgroup ui-controlgroup-${this.options.direction}`), this.options.direction === 'horizontal' && this._addClass(null, 'ui-helper-clearfix'), this._initWidgets(), e = this.childWidgets, this.options.onlyVisible && (e = e.filter(':visible')), e.length && (t.each(['first', 'last'], ((t, n) => { const o = e[n]().data('ui-controlgroup-data'); if (o && i[`_${o.widgetName}Options`]) { const s = i[`_${o.widgetName}Options`](e.length === 1 ? 'only' : n); s.classes = i._resolveClassesValues(s.classes, o), o.element[o.widgetName](s); } else i._updateCornerClass(e[n](), n); })), this._callChildMethod('refresh')); },
  });
})));
// # sourceMappingURL=controlgroup-min.js.map
