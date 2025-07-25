/*!
 * jQuery UI Resizable 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!(function (t) {
  typeof define === 'function' && define.amd ? define(['jquery', './mouse', '../disable-selection', '../plugin', '../version', '../widget'], t) : t(jQuery);
}(((t) => (t.widget('ui.resizable', t.ui.mouse, {
  version: '1.14.1',
  widgetEventPrefix: 'resize',
  options: {
    alsoResize: !1, animate: !1, animateDuration: 'slow', animateEasing: 'swing', aspectRatio: !1, autoHide: !1, classes: { 'ui-resizable-se': 'ui-icon ui-icon-gripsmall-diagonal-se' }, containment: !1, ghost: !1, grid: !1, handles: 'e,s,se', helper: !1, maxHeight: null, maxWidth: null, minHeight: 10, minWidth: 10, zIndex: 90, resize: null, start: null, stop: null,
  },
  _num(t) { return parseFloat(t) || 0; },
  _isNumber(t) { return !isNaN(parseFloat(t)); },
  _hasScroll(e, i) { let s; let h = !1; const n = t(e).css('overflow'); if (n === 'hidden') return !1; if (n === 'scroll') return !0; if (e[s = i && i === 'left' ? 'scrollLeft' : 'scrollTop'] > 0) return !0; try { e[s] = 1, h = e[s] > 0, e[s] = 0; } catch (t) {} return h; },
  _create() {
    let e; const i = this.options; const s = this; this._addClass('ui-resizable'), t.extend(this, {
      _aspectRatio: !!i.aspectRatio, aspectRatio: i.aspectRatio, originalElement: this.element, _proportionallyResizeElements: [], _helper: i.helper || i.ghost || i.animate ? i.helper || 'ui-resizable-helper' : null,
    }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(t("<div class='ui-wrapper'></div>").css({
      overflow: 'hidden', position: this.element.css('position'), width: this.element.outerWidth(), height: this.element.outerHeight(), top: this.element.css('top'), left: this.element.css('left'),
    })), this.element = this.element.parent().data('ui-resizable', this.element.resizable('instance')), this.elementIsWrapper = !0, e = {
      marginTop: this.originalElement.css('marginTop'), marginRight: this.originalElement.css('marginRight'), marginBottom: this.originalElement.css('marginBottom'), marginLeft: this.originalElement.css('marginLeft'),
    }, this.element.css(e), this.originalResizeStyle = this.originalElement.css('resize'), this.originalElement.css('resize', 'none'), this._proportionallyResizeElements.push(this.originalElement.css({ position: 'static', zoom: 1, display: 'block' })), this._proportionallyResize()), this._setupHandles(), i.autoHide && t(this.element).on('mouseenter', (() => { i.disabled || (s._removeClass('ui-resizable-autohide'), s._handles.show()); })).on('mouseleave', (() => { i.disabled || s.resizing || (s._addClass('ui-resizable-autohide'), s._handles.hide()); })), this._mouseInit();
  },
  _destroy() {
    this._mouseDestroy(), this._addedHandles.remove(); let e; const i = function (e) { t(e).removeData('resizable').removeData('ui-resizable').off('.resizable'); }; return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
      position: e.css('position'), width: e.outerWidth(), height: e.outerHeight(), top: e.css('top'), left: e.css('left'),
    }).insertAfter(e), e.remove()), this.originalElement.css('resize', this.originalResizeStyle), i(this.originalElement), this;
  },
  _setOption(t, e) { switch (this._super(t, e), t) { case 'handles': this._removeHandles(), this._setupHandles(); break; case 'aspectRatio': this._aspectRatio = !!e; } },
  _setupHandles() {
    let e; let i; let s; let h; let n; const o = this.options; const a = this; if (this.handles = o.handles || (t('.ui-resizable-handle', this.element).length ? {
      n: '.ui-resizable-n', e: '.ui-resizable-e', s: '.ui-resizable-s', w: '.ui-resizable-w', se: '.ui-resizable-se', sw: '.ui-resizable-sw', ne: '.ui-resizable-ne', nw: '.ui-resizable-nw',
    } : 'e,s,se'), this._handles = t(), this._addedHandles = t(), this.handles.constructor === String) for (this.handles === 'all' && (this.handles = 'n,e,s,w,se,sw,ne,nw'), s = this.handles.split(','), this.handles = {}, i = 0; i < s.length; i++)h = `ui-resizable-${e = String.prototype.trim.call(s[i])}`, n = t('<div>'), this._addClass(n, `ui-resizable-handle ${h}`), n.css({ zIndex: o.zIndex }), this.handles[e] = `.ui-resizable-${e}`, this.element.children(this.handles[e]).length || (this.element.append(n), this._addedHandles = this._addedHandles.add(n)); this._renderAxis = function (e) { let i; let s; let h; let n; for (i in e = e || this.element, this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = t(this.handles[i]), this._on(this.handles[i], { mousedown: a._mouseDown })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = t(this.handles[i], this.element), n = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), h = ['padding', /ne|nw|n/.test(i) ? 'Top' : /se|sw|s/.test(i) ? 'Bottom' : /^e$/.test(i) ? 'Right' : 'Left'].join(''), e.css(h, n), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i]); }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find('.ui-resizable-handle')), this._handles.disableSelection(), this._handles.on('mouseover', (function () { a.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = n && n[1] ? n[1] : 'se'); })), o.autoHide && (this._handles.hide(), this._addClass('ui-resizable-autohide'));
  },
  _removeHandles() { this._addedHandles.remove(); },
  _mouseCapture(e) { let i; let s; let h = !1; for (i in this.handles)((s = t(this.handles[i])[0]) === e.target || t.contains(s, e.target)) && (h = !0); return !this.options.disabled && h; },
  _mouseStart(e) { let i; let s; let h; let n; const o = this.options; const a = this.element; return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css('left')), s = this._num(this.helper.css('top')), o.containment && (i += t(o.containment).scrollLeft() || 0, s += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = { left: i, top: s }, this._helper || (n = this._calculateAdjustedElementDimensions(a)), this.size = this._helper ? { width: this.helper.width(), height: this.helper.height() } : { width: n.width, height: n.height }, this.originalSize = this._helper ? { width: a.outerWidth(), height: a.outerHeight() } : { width: n.width, height: n.height }, this.sizeDiff = { width: a.outerWidth() - a.width(), height: a.outerHeight() - a.height() }, this.originalPosition = { left: i, top: s }, this.originalMousePosition = { left: e.pageX, top: e.pageY }, this.aspectRatio = typeof o.aspectRatio === 'number' ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, h = t(`.ui-resizable-${this.axis}`).css('cursor'), t('body').css('cursor', h === 'auto' ? `${this.axis}-resize` : h), this._addClass('ui-resizable-resizing'), this._propagate('start', e), !0; },
  _mouseDrag(e) { let i; let s; const h = this.originalMousePosition; const n = this.axis; const o = e.pageX - h.left || 0; const a = e.pageY - h.top || 0; const l = this._change[n]; return this._updatePrevProperties(), !!l && (i = l.apply(this, [e, o, a]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate('resize', e), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger('resize', e, this.ui()), this._applyChanges()), !1); },
  _mouseStop(e) { this.resizing = !1; let i; let s; let h; let n; let o; let a; let l; const r = this.options; const p = this; return this._helper && (h = (s = (i = this._proportionallyResizeElements).length && /textarea/i.test(i[0].nodeName)) && this._hasScroll(i[0], 'left') ? 0 : p.sizeDiff.height, n = s ? 0 : p.sizeDiff.width, o = { width: p.helper.width() - n, height: p.helper.height() - h }, a = parseFloat(p.element.css('left')) + (p.position.left - p.originalPosition.left) || null, l = parseFloat(p.element.css('top')) + (p.position.top - p.originalPosition.top) || null, r.animate || this.element.css(t.extend(o, { top: l, left: a })), p.helper.height(p.size.height), p.helper.width(p.size.width), this._helper && !r.animate && this._proportionallyResize()), t('body').css('cursor', 'auto'), this._removeClass('ui-resizable-resizing'), this._propagate('stop', e), this._helper && this.helper.remove(), !1; },
  _updatePrevProperties() { this.prevPosition = { top: this.position.top, left: this.position.left }, this.prevSize = { width: this.size.width, height: this.size.height }; },
  _applyChanges() { const t = {}; return this.position.top !== this.prevPosition.top && (t.top = `${this.position.top}px`), this.position.left !== this.prevPosition.left && (t.left = `${this.position.left}px`), this.helper.css(t), this.size.width !== this.prevSize.width && (t.width = `${this.size.width}px`, this.helper.width(t.width)), this.size.height !== this.prevSize.height && (t.height = `${this.size.height}px`, this.helper.height(t.height)), t; },
  _updateVirtualBoundaries(t) {
    let e; let i; let s; let h; let n; const o = this.options; n = {
      minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0, maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : 1 / 0, minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0, maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : 1 / 0,
    }, (this._aspectRatio || t) && (e = n.minHeight * this.aspectRatio, s = n.minWidth / this.aspectRatio, i = n.maxHeight * this.aspectRatio, h = n.maxWidth / this.aspectRatio, e > n.minWidth && (n.minWidth = e), s > n.minHeight && (n.minHeight = s), i < n.maxWidth && (n.maxWidth = i), h < n.maxHeight && (n.maxHeight = h)), this._vBoundaries = n;
  },
  _updateCache(t) { this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width); },
  _updateRatio(t) { const e = this.position; const i = this.size; const s = this.axis; return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), s === 'sw' && (t.left = e.left + (i.width - t.width), t.top = null), s === 'nw' && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t; },
  _respectSize(t) { const e = this._vBoundaries; const i = this.axis; const s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width; const h = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height; const n = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width; const o = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height; const a = this.originalPosition.left + this.originalSize.width; const l = this.originalPosition.top + this.originalSize.height; const r = /sw|nw|w/.test(i); const p = /nw|ne|n/.test(i); return n && (t.width = e.minWidth), o && (t.height = e.minHeight), s && (t.width = e.maxWidth), h && (t.height = e.maxHeight), n && r && (t.left = a - e.minWidth), s && r && (t.left = a - e.maxWidth), o && p && (t.top = l - e.minHeight), h && p && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t; },
  _getPaddingPlusBorderDimensions(t) { for (var e = 0, i = [], s = [t.css('borderTopWidth'), t.css('borderRightWidth'), t.css('borderBottomWidth'), t.css('borderLeftWidth')], h = [t.css('paddingTop'), t.css('paddingRight'), t.css('paddingBottom'), t.css('paddingLeft')]; e < 4; e++)i[e] = parseFloat(s[e]) || 0, i[e] += parseFloat(h[e]) || 0; return { height: i[0] + i[2], width: i[1] + i[3] }; },
  _calculateAdjustedElementDimensions(t) { let e; let i; let s; const h = t.get(0); return t.css('box-sizing') !== 'content-box' || !this._hasScroll(h) && !this._hasScroll(h, 'left') ? { height: parseFloat(t.css('height')), width: parseFloat(t.css('width')) } : (e = parseFloat(h.style.width), i = parseFloat(h.style.height), s = this._getPaddingPlusBorderDimensions(t), e = isNaN(e) ? this._getElementTheoreticalSize(t, s, 'width') : e, { height: i = isNaN(i) ? this._getElementTheoreticalSize(t, s, 'height') : i, width: e }); },
  _getElementTheoreticalSize(t, e, i) { return Math.max(0, Math.ceil(t.get(0)[`offset${i[0].toUpperCase()}${i.slice(1)}`] - e[i] - 0.5)) || 0; },
  _proportionallyResize() { if (this._proportionallyResizeElements.length) for (var t, e = 0, i = this.helper || this.element; e < this._proportionallyResizeElements.length; e++)t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({ height: i.height() - this.outerDimensions.height || 0, width: i.width() - this.outerDimensions.width || 0 }); },
  _renderProxy() {
    const e = this.element; const i = this.options; this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t('<div></div>').css({ overflow: 'hidden' }), this._addClass(this.helper, this._helper), this.helper.css({
      width: this.element.outerWidth(), height: this.element.outerHeight(), position: 'absolute', left: `${this.elementOffset.left}px`, top: `${this.elementOffset.top}px`, zIndex: ++i.zIndex,
    }), this.helper.appendTo('body').disableSelection()) : this.helper = this.element;
  },
  _change: {
    e(t, e) { return { width: this.originalSize.width + e }; }, w(t, e) { const i = this.originalSize; return { left: this.originalPosition.left + e, width: i.width - e }; }, n(t, e, i) { const s = this.originalSize; return { top: this.originalPosition.top + i, height: s.height - i }; }, s(t, e, i) { return { height: this.originalSize.height + i }; }, se(e, i, s) { return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s])); }, sw(e, i, s) { return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s])); }, ne(e, i, s) { return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s])); }, nw(e, i, s) { return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s])); },
  },
  _propagate(e, i) { t.ui.plugin.call(this, e, [i, this.ui()]), e !== 'resize' && this._trigger(e, i, this.ui()); },
  plugins: {},
  ui() {
    return {
      originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition,
    };
  },
}), t.ui.plugin.add('resizable', 'animate', {
  stop(e) {
    const i = t(this).resizable('instance'); const s = i.options; const h = i._proportionallyResizeElements; const n = h.length && /textarea/i.test(h[0].nodeName); const o = n && i._hasScroll(h[0], 'left') ? 0 : i.sizeDiff.height; const a = n ? 0 : i.sizeDiff.width; const l = { width: i.size.width - a, height: i.size.height - o }; const r = parseFloat(i.element.css('left')) + (i.position.left - i.originalPosition.left) || null; const p = parseFloat(i.element.css('top')) + (i.position.top - i.originalPosition.top) || null; i.element.animate(t.extend(l, p && r ? { top: p, left: r } : {}), {
      duration: s.animateDuration,
      easing: s.animateEasing,
      step() {
        const s = {
          width: parseFloat(i.element.css('width')), height: parseFloat(i.element.css('height')), top: parseFloat(i.element.css('top')), left: parseFloat(i.element.css('left')),
        }; h && h.length && t(h[0]).css({ width: s.width, height: s.height }), i._updateCache(s), i._propagate('resize', e);
      },
    });
  },
}), t.ui.plugin.add('resizable', 'containment', {
  start() {
    let e; let i; let s; let h; let n; let o; let a; const l = t(this).resizable('instance'); const r = l.options; const p = l.element; const d = r.containment; const g = d instanceof t ? d.get(0) : /parent/.test(d) ? p.parent().get(0) : d; g && (l.containerElement = t(g), /document/.test(d) || d === document ? (l.containerOffset = { left: 0, top: 0 }, l.containerPosition = { left: 0, top: 0 }, l.parentData = {
      element: t(document), left: 0, top: 0, width: t(document).width(), height: t(document).height() || document.body.parentNode.scrollHeight,
    }) : (e = t(g), i = [], t(['Top', 'Right', 'Left', 'Bottom']).each(((t, s) => { i[t] = l._num(e.css(`padding${s}`)); })), l.containerOffset = e.offset(), l.containerPosition = e.position(), l.containerSize = { height: e.innerHeight() - i[3], width: e.innerWidth() - i[1] }, s = l.containerOffset, h = l.containerSize.height, n = l.containerSize.width, o = l._hasScroll(g, 'left') ? g.scrollWidth : n, a = l._hasScroll(g) ? g.scrollHeight : h, l.parentData = {
      element: g, left: s.left, top: s.top, width: o, height: a,
    }));
  },
  resize(e) { let i; let s; let h; let n; const o = t(this).resizable('instance'); const a = o.options; const l = o.containerOffset; const r = o.position; const p = o._aspectRatio || e.shiftKey; let d = { top: 0, left: 0 }; const g = o.containerElement; let u = !0; g[0] !== document && /static/.test(g.css('position')) && (d = l), r.left < (o._helper ? l.left : 0) && (o.size.width = o.size.width + (o._helper ? o.position.left - l.left : o.position.left - d.left), p && (o.size.height = o.size.width / o.aspectRatio, u = !1), o.position.left = a.helper ? l.left : 0), r.top < (o._helper ? l.top : 0) && (o.size.height = o.size.height + (o._helper ? o.position.top - l.top : o.position.top), p && (o.size.width = o.size.height * o.aspectRatio, u = !1), o.position.top = o._helper ? l.top : 0), h = o.containerElement.get(0) === o.element.parent().get(0), n = /relative|absolute/.test(o.containerElement.css('position')), h && n ? (o.offset.left = o.parentData.left + o.position.left, o.offset.top = o.parentData.top + o.position.top) : (o.offset.left = o.element.offset().left, o.offset.top = o.element.offset().top), i = Math.abs(o.sizeDiff.width + (o._helper ? o.offset.left - d.left : o.offset.left - l.left)), s = Math.abs(o.sizeDiff.height + (o._helper ? o.offset.top - d.top : o.offset.top - l.top)), i + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - i, p && (o.size.height = o.size.width / o.aspectRatio, u = !1)), s + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - s, p && (o.size.width = o.size.height * o.aspectRatio, u = !1)), u || (o.position.left = o.prevPosition.left, o.position.top = o.prevPosition.top, o.size.width = o.prevSize.width, o.size.height = o.prevSize.height); },
  stop() { const e = t(this).resizable('instance'); const i = e.options; const s = e.containerOffset; const h = e.containerPosition; const n = e.containerElement; const o = t(e.helper); const a = o.offset(); const l = o.outerWidth() - e.sizeDiff.width; const r = o.outerHeight() - e.sizeDiff.height; e._helper && !i.animate && /relative/.test(n.css('position')) && t(this).css({ left: a.left - h.left - s.left, width: l, height: r }), e._helper && !i.animate && /static/.test(n.css('position')) && t(this).css({ left: a.left - h.left - s.left, width: l, height: r }); },
}), t.ui.plugin.add('resizable', 'alsoResize', {
  start() {
    const e = t(this).resizable('instance'); const i = e.options; t(i.alsoResize).each((function () {
      const i = t(this); const s = e._calculateAdjustedElementDimensions(i); i.data('ui-resizable-alsoresize', {
        width: s.width, height: s.height, left: parseFloat(i.css('left')), top: parseFloat(i.css('top')),
      });
    }));
  },
  resize(e, i) {
    const s = t(this).resizable('instance'); const h = s.options; const n = s.originalSize; const o = s.originalPosition; const a = {
      height: s.size.height - n.height || 0, width: s.size.width - n.width || 0, top: s.position.top - o.top || 0, left: s.position.left - o.left || 0,
    }; t(h.alsoResize).each((function () { const e = t(this); const s = t(this).data('ui-resizable-alsoresize'); const h = {}; const n = e.parents(i.originalElement[0]).length ? ['width', 'height'] : ['width', 'height', 'top', 'left']; t.each(n, ((t, e) => { const i = (s[e] || 0) + (a[e] || 0); i && i >= 0 && (h[e] = i || null); })), e.css(h); }));
  },
  stop() { t(this).removeData('ui-resizable-alsoresize'); },
}), t.ui.plugin.add('resizable', 'ghost', {
  start() {
    const e = t(this).resizable('instance'); const i = e.size; e.ghost = e.originalElement.clone(), e.ghost.css({
      opacity: 0.25, display: 'block', position: 'relative', height: i.height, width: i.width, margin: 0, left: 0, top: 0,
    }), e._addClass(e.ghost, 'ui-resizable-ghost'), !0 === t.uiBackCompat && typeof e.options.ghost === 'string' && e.ghost.addClass(this.options.ghost), e.ghost.appendTo(e.helper);
  },
  resize() { const e = t(this).resizable('instance'); e.ghost && e.ghost.css({ position: 'relative', height: e.size.height, width: e.size.width }); },
  stop() { const e = t(this).resizable('instance'); e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0)); },
}), t.ui.plugin.add('resizable', 'grid', { resize() { let e; const i = t(this).resizable('instance'); const s = i.options; const h = i.size; const n = i.originalSize; const o = i.originalPosition; const a = i.axis; const l = typeof s.grid === 'number' ? [s.grid, s.grid] : s.grid; const r = l[0] || 1; const p = l[1] || 1; const d = Math.round((h.width - n.width) / r) * r; const g = Math.round((h.height - n.height) / p) * p; let u = n.width + d; let c = n.height + g; const f = s.maxWidth && s.maxWidth < u; const m = s.maxHeight && s.maxHeight < c; const z = s.minWidth && s.minWidth > u; const _ = s.minHeight && s.minHeight > c; s.grid = l, z && (u += r), _ && (c += p), f && (u -= r), m && (c -= p), /^(se|s|e)$/.test(a) ? (i.size.width = u, i.size.height = c) : /^(ne)$/.test(a) ? (i.size.width = u, i.size.height = c, i.position.top = o.top - g) : /^(sw)$/.test(a) ? (i.size.width = u, i.size.height = c, i.position.left = o.left - d) : ((c - p <= 0 || u - r <= 0) && (e = i._getPaddingPlusBorderDimensions(this)), c - p > 0 ? (i.size.height = c, i.position.top = o.top - g) : (c = p - e.height, i.size.height = c, i.position.top = o.top + n.height - c), u - r > 0 ? (i.size.width = u, i.position.left = o.left - d) : (u = r - e.width, i.size.width = u, i.position.left = o.left + n.width - u)); } }), t.ui.resizable))));
// # sourceMappingURL=resizable-min.js.map
