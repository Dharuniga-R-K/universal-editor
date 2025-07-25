/*!
 * jQuery UI Widget 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!(function (t) {
  typeof define === 'function' && define.amd ? define(['jquery', './version'], t) : t(jQuery);
}(((t) => {
  let e; let i = 0; const s = Array.prototype.hasOwnProperty; const n = Array.prototype.slice; return t.cleanData = (e = t.cleanData, function (i) { let s; let n; let o; for (o = 0; (n = i[o]) != null; o++)(s = t._data(n, 'events')) && s.remove && t(n).triggerHandler('remove'); e(i); }), t.widget = function (e, i, s) {
    let n; let o; let a; const r = {}; const l = e.split('.')[0]; if ((e = e.split('.')[1]) === '__proto__' || e === 'constructor') return t.error(`Invalid widget name: ${e}`); const u = `${l}-${e}`; return s || (s = i, i = t.Widget), Array.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))), t.expr.pseudos[u.toLowerCase()] = function (e) { return !!t.data(e, u); }, t[l] = t[l] || {}, n = t[l][e], o = t[l][e] = function (t, e) { if (!this || !this._createWidget) return new o(t, e); arguments.length && this._createWidget(t, e); }, t.extend(o, n, { version: s.version, _proto: t.extend({}, s), _childConstructors: [] }), (a = new i()).options = t.widget.extend({}, a.options), t.each(s, ((t, e) => { r[t] = typeof e === 'function' ? (function () { function s() { return i.prototype[t].apply(this, arguments); } function n(e) { return i.prototype[t].apply(this, e); } return function () { let t; const i = this._super; const o = this._superApply; return this._super = s, this._superApply = n, t = e.apply(this, arguments), this._super = i, this._superApply = o, t; }; }()) : e; })), o.prototype = t.widget.extend(a, { widgetEventPrefix: n && a.widgetEventPrefix || e }, r, {
      constructor: o, namespace: l, widgetName: e, widgetFullName: u,
    }), n ? (t.each(n._childConstructors, ((e, i) => { const s = i.prototype; t.widget(`${s.namespace}.${s.widgetName}`, o, i._proto); })), delete n._childConstructors) : i._childConstructors.push(o), t.widget.bridge(e, o), o;
  }, t.widget.extend = function (e) { for (var i, o, a = n.call(arguments, 1), r = 0, l = a.length; r < l; r++) for (i in a[r])o = a[r][i], s.call(a[r], i) && void 0 !== o && (t.isPlainObject(o) ? e[i] = t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], o) : t.widget.extend({}, o) : e[i] = o); return e; }, t.widget.bridge = function (e, i) { const s = i.prototype.widgetFullName || e; t.fn[e] = function (o) { const a = typeof o === 'string'; const r = n.call(arguments, 1); let l = this; return a ? this.length || o !== 'instance' ? this.each((function () { let i; const n = t.data(this, s); return o === 'instance' ? (l = n, !1) : n ? typeof n[o] !== 'function' || o.charAt(0) === '_' ? t.error(`no such method '${o}' for ${e} widget instance`) : (i = n[o].apply(n, r)) !== n && void 0 !== i ? (l = i && i.jquery ? l.pushStack(i.get()) : i, !1) : void 0 : t.error(`cannot call methods on ${e} prior to initialization; attempted to call method '${o}'`); })) : l = void 0 : (r.length && (o = t.widget.extend.apply(null, [o].concat(r))), this.each((function () { const e = t.data(this, s); e ? (e.option(o || {}), e._init && e._init()) : t.data(this, s, new i(o, this)); }))), l; }; }, t.Widget = function () {}, t.Widget._childConstructors = [], t.Widget.prototype = {
    widgetName: 'widget',
    widgetEventPrefix: '',
    defaultElement: '<div>',
    options: { classes: {}, disabled: !1, create: null },
    _createWidget(e, s) { s = t(s || this.defaultElement || this)[0], this.element = t(s), this.uuid = i++, this.eventNamespace = `.${this.widgetName}${this.uuid}`, this.bindings = t(), this.hoverable = t(), this.focusable = t(), this.classesElementLookup = {}, s !== this && (t.data(s, this.widgetFullName, this), this._on(!0, this.element, { remove(t) { t.target === s && this.destroy(); } }), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger('create', null, this._getCreateEventData()), this._init(); },
    _getCreateOptions() { return {}; },
    _getCreateEventData: t.noop,
    _create: t.noop,
    _init: t.noop,
    destroy() { const e = this; this._destroy(), t.each(this.classesElementLookup, ((t, i) => { e._removeClass(i, t); })), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr('aria-disabled'), this.bindings.off(this.eventNamespace); },
    _destroy: t.noop,
    widget() { return this.element; },
    option(e, i) { let s; let n; let o; let a = e; if (arguments.length === 0) return t.widget.extend({}, this.options); if (typeof e === 'string') if (a = {}, s = e.split('.'), e = s.shift(), s.length) { for (n = a[e] = t.widget.extend({}, this.options[e]), o = 0; o < s.length - 1; o++)n[s[o]] = n[s[o]] || {}, n = n[s[o]]; if (e = s.pop(), arguments.length === 1) return void 0 === n[e] ? null : n[e]; n[e] = i; } else { if (arguments.length === 1) return void 0 === this.options[e] ? null : this.options[e]; a[e] = i; } return this._setOptions(a), this; },
    _setOptions(t) { let e; for (e in t) this._setOption(e, t[e]); return this; },
    _setOption(t, e) { return t === 'classes' && this._setOptionClasses(e), this.options[t] = e, t === 'disabled' && this._setOptionDisabled(e), this; },
    _setOptionClasses(e) {
      let i; let s; let n; for (i in e) {
        n = this.classesElementLookup[i], e[i] !== this.options.classes[i] && n && n.length && (s = t(n.get()), this._removeClass(n, i), s.addClass(this._classes({
          element: s, keys: i, classes: e, add: !0,
        })));
      }
    },
    _setOptionDisabled(t) { this._toggleClass(this.widget(), `${this.widgetFullName}-disabled`, null, !!t), t && (this._removeClass(this.hoverable, null, 'ui-state-hover'), this._removeClass(this.focusable, null, 'ui-state-focus')); },
    enable() { return this._setOptions({ disabled: !1 }); },
    disable() { return this._setOptions({ disabled: !0 }); },
    _classes(e) { const i = []; const s = this; function n() { const i = []; e.element.each(((e, n) => { t.map(s.classesElementLookup, ((t) => t)).some(((t) => t.is(n))) || i.push(n); })), s._on(t(i), { remove: '_untrackClassesElement' }); } function o(o, a) { let r; let l; for (l = 0; l < o.length; l++)r = s.classesElementLookup[o[l]] || t(), e.add ? (n(), r = t(t.uniqueSort(r.get().concat(e.element.get())))) : r = t(r.not(e.element).get()), s.classesElementLookup[o[l]] = r, i.push(o[l]), a && e.classes[o[l]] && i.push(e.classes[o[l]]); } return (e = t.extend({ element: this.element, classes: this.options.classes || {} }, e)).keys && o(e.keys.match(/\S+/g) || [], !0), e.extra && o(e.extra.match(/\S+/g) || []), i.join(' '); },
    _untrackClassesElement(e) { const i = this; t.each(i.classesElementLookup, ((s, n) => { t.inArray(e.target, n) !== -1 && (i.classesElementLookup[s] = t(n.not(e.target).get())); })), this._off(t(e.target)); },
    _removeClass(t, e, i) { return this._toggleClass(t, e, i, !1); },
    _addClass(t, e, i) { return this._toggleClass(t, e, i, !0); },
    _toggleClass(t, e, i, s) {
      s = typeof s === 'boolean' ? s : i; const n = typeof t === 'string' || t === null; const o = {
        extra: n ? e : i, keys: n ? t : e, element: n ? this.element : t, add: s,
      }; return o.element.toggleClass(this._classes(o), s), this;
    },
    _on(e, i, s) { let n; const o = this; typeof e !== 'boolean' && (s = i, i = e, e = !1), s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), t.each(s, ((s, a) => { function r() { if (e || !0 !== o.options.disabled && !t(this).hasClass('ui-state-disabled')) return (typeof a === 'string' ? o[a] : a).apply(o, arguments); } typeof a !== 'string' && (r.guid = a.guid = a.guid || r.guid || t.guid++); const l = s.match(/^([\w:-]*)\s*(.*)$/); const u = l[1] + o.eventNamespace; const h = l[2]; h ? n.on(u, h, r) : i.on(u, r); })); },
    _off(e, i) { i = (i || '').split(' ').join(`${this.eventNamespace} `) + this.eventNamespace, e.off(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get()); },
    _delay(t, e) { const i = this; return setTimeout((function () { return (typeof t === 'string' ? i[t] : t).apply(i, arguments); }), e || 0); },
    _hoverable(e) { this.hoverable = this.hoverable.add(e), this._on(e, { mouseenter(e) { this._addClass(t(e.currentTarget), null, 'ui-state-hover'); }, mouseleave(e) { this._removeClass(t(e.currentTarget), null, 'ui-state-hover'); } }); },
    _focusable(e) { this.focusable = this.focusable.add(e), this._on(e, { focusin(e) { this._addClass(t(e.currentTarget), null, 'ui-state-focus'); }, focusout(e) { this._removeClass(t(e.currentTarget), null, 'ui-state-focus'); } }); },
    _trigger(e, i, s) { let n; let o; const a = this.options[e]; if (s = s || {}, (i = t.Event(i)).type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (n in o)n in i || (i[n] = o[n]); return this.element.trigger(i, s), !(typeof a === 'function' && !1 === a.apply(this.element[0], [i].concat(s)) || i.isDefaultPrevented()); },
  }, t.each({ show: 'fadeIn', hide: 'fadeOut' }, ((e, i) => { t.Widget.prototype[`_${e}`] = function (s, n, o) { let a; typeof n === 'string' && (n = { effect: n }); const r = n ? !0 === n || typeof n === 'number' ? i : n.effect || i : e; typeof (n = n || {}) === 'number' ? n = { duration: n } : !0 === n && (n = {}), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue((function (i) { t(this)[e](), o && o.call(s[0]), i(); })); }; })), t.widget;
})));
// # sourceMappingURL=widget-min.js.map
