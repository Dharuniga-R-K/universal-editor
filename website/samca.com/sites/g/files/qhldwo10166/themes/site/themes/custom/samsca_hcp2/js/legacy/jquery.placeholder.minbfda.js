/* HTML5 Placeholder jQuery Plugin - v2.1.0
 * Copyright ©2014 Mathias Bynens
 * 2014-12-29
 */
!(function (a) { typeof define === 'function' && define.amd ? define(['jquery'], a) : a(jQuery); }((a) => {
  function b(b) {
    const c = {};
    const d = /^jQuery\d+$/; return a.each(b.attributes, (a, b) => { b.specified && !d.test(b.name) && (c[b.name] = b.value); }), c;
  }

  function c(b, c) {
    const d = this;
    let f = a(d); if (d.value == f.attr('placeholder') && f.hasClass(m.customClass)) {
      if (f.data('placeholder-password')) {
        if (f = f.hide().nextAll('input[type="password"]:first').show().attr('id', f.removeAttr('id').data('placeholder-id')), b === !0) return f[0].value = c;
        f.focus();
      } else d.value = '', f.removeClass(m.customClass), d == e() && d.select();
    }
  }

  function d() {
    let d; const e = this;
    let f = a(e);
    const g = this.id; if (e.value === '') {
      if (e.type === 'password') {
        if (!f.data('placeholder-textinput')) {
          try { d = f.clone().attr({ type: 'text' }); } catch (h) { d = a('<input>').attr(a.extend(b(this), { type: 'text' })); }
          d.removeAttr('name').data({ 'placeholder-password': f, 'placeholder-id': g }).bind('focus.placeholder', c), f.data({ 'placeholder-textinput': d, 'placeholder-id': g }).before(d);
        }
        f = f.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', g)
          .show();
      }
      f.addClass(m.customClass), f[0].value = f.attr('placeholder');
    } else f.removeClass(m.customClass);
  }

  function e() { try { return document.activeElement; } catch (a) {} } let f; let g; const h = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
  const i = 'placeholder' in document.createElement('input') && !h;
  const j = 'placeholder' in document.createElement('textarea') && !h;
  const k = a.valHooks;
  const l = a.propHooks; if (i && j) g = a.fn.placeholder = function () { return this; }, g.input = g.textarea = !0;
  else {
    var m = {};
    g = a.fn.placeholder = function (b) {
      const e = { customClass: 'placeholder' };
      m = a.extend({}, e, b); const f = this; return f.filter(`${i ? 'textarea' : ':input'}[placeholder]`).not(`.${m.customClass}`).bind({ 'focus.placeholder': c, 'blur.placeholder': d }).data('placeholder-enabled', !0)
        .trigger('blur.placeholder'), f;
    }, g.input = i, g.textarea = j, f = {
      get(b) {
        const c = a(b);
        const d = c.data('placeholder-password'); return d ? d[0].value : c.data('placeholder-enabled') && c.hasClass('placeholder') ? '' : b.value;
      },
      set(b, f) {
        const g = a(b);
        const h = g.data('placeholder-password'); return h ? h[0].value = f : g.data('placeholder-enabled') ? (f === '' ? (b.value = f, b != e() && d.call(b)) : g.hasClass(m.customClass) ? c.call(b, !0, f) || (b.value = f) : b.value = f, g) : b.value = f;
      },
    }, i || (k.input = f, l.value = f), j || (k.textarea = f, l.value = f), a(() => {
      a(document).delegate('form', 'submit.placeholder', function () {
        const b = a(`.${m.customClass}`, this).each(c);
        setTimeout(() => { b.each(d); }, 10);
      });
    }), a(window).bind('beforeunload.placeholder', () => { a(`.${m.customClass}`).each(function () { this.value = ''; }); });
  }
}));
