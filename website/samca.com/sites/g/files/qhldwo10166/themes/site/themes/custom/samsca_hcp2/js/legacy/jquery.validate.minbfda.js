/**
 * jQuery Validation Plugin 1.9.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Licensed under MIT: http://www.opensource.org/licenses/mit-license.php
 */
(function (c) {
  c.extend(c.fn, {
    validate(a) {
      if (this.length) {
        let b = c.data(this[0], 'validator'); if (b) return b; this.attr('novalidate', 'novalidate'); b = new c.validator(a, this[0]); c.data(this[0], 'validator', b); if (b.settings.onsubmit) {
          a = this.find('input, button'); a.filter('.cancel').click(() => { b.cancelSubmit = true; }); b.settings.submitHandler && a.filter(':submit').click(function () { b.submitButton = this; }); this.submit((d) => {
            function e() {
              if (b.settings.submitHandler) {
                if (b.submitButton) {
                  var f = c("<input type='hidden'/>").attr(
                    'name',
                    b.submitButton.name,
                  ).val(b.submitButton.value).appendTo(b.currentForm);
                } b.settings.submitHandler.call(b, b.currentForm); b.submitButton && f.remove(); return false;
              } return true;
            }b.settings.debug && d.preventDefault(); if (b.cancelSubmit) { b.cancelSubmit = false; return e(); } if (b.form()) { if (b.pendingRequest) { b.formSubmitted = true; return false; } return e(); } b.focusInvalid(); return false;
          });
        } return b;
      } a && a.debug && window.console && console.warn("nothing selected, can't validate, returning nothing");
    },
    valid() {
      if (c(this[0]).is('form')) return this.validate().form();
      let a = true; const b = c(this[0].form).validate(); this.each(function () { a &= b.element(this); }); return a;
    },
    removeAttrs(a) { const b = {}; const d = this; c.each(a.split(/\s/), (e, f) => { b[f] = d.attr(f); d.removeAttr(f); }); return b; },
    rules(a, b) {
      let d = this[0]; if (a) {
        var e = c.data(d.form, 'validator').settings; const f = e.rules; const g = c.validator.staticRules(d); switch (a) {
          case 'add': c.extend(g, c.validator.normalizeRule(b)); f[d.name] = g; if (b.messages)e.messages[d.name] = c.extend(e.messages[d.name], b.messages); break; case 'remove': if (!b) {
            delete f[d.name];
            return g;
          } var h = {}; c.each(b.split(/\s/), (j, i) => { h[i] = g[i]; delete g[i]; }); return h;
        }
      }d = c.validator.normalizeRules(c.extend({}, c.validator.metadataRules(d), c.validator.classRules(d), c.validator.attributeRules(d), c.validator.staticRules(d)), d); if (d.required) { e = d.required; delete d.required; d = c.extend({ required: e }, d); } return d;
    },
  }); c.extend(c.expr[':'], { blank(a) { return !c.trim(`${a.value}`); }, filled(a) { return !!c.trim(`${a.value}`); }, unchecked(a) { return !a.checked; } }); c.validator = function (
    a,
    b,
  ) { this.settings = c.extend(true, {}, c.validator.defaults, a); this.currentForm = b; this.init(); }; c.validator.format = function (a, b) { if (arguments.length == 1) return function () { const d = c.makeArray(arguments); d.unshift(a); return c.validator.format.apply(this, d); }; if (arguments.length > 2 && b.constructor != Array)b = c.makeArray(arguments).slice(1); if (b.constructor != Array)b = [b]; c.each(b, (d, e) => { a = a.replace(RegExp(`\\{${d}\\}`, 'g'), e); }); return a; }; c.extend(c.validator, {
    defaults: {
      messages: {},
      groups: {},
      rules: {},
      errorClass: 'error',
      validClass: 'valid',
      errorElement: 'label',
      focusInvalid: true,
      errorContainer: c([]),
      errorLabelContainer: c([]),
      onsubmit: true,
      ignore: ':hidden',
      ignoreTitle: false,
      onfocusin(a) { this.lastActive = a; if (this.settings.focusCleanup && !this.blockFocusCleanup) { this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass); this.addWrapper(this.errorsFor(a)).hide(); } },
      onfocusout(a) { if (!this.checkable(a) && (a.name in this.submitted || !this.optional(a))) this.element(a); },
      onkeyup(a) { if (a.name in this.submitted || a == this.lastElement) this.element(a); },
      onclick(a) { if (a.name in this.submitted) this.element(a); else a.parentNode.name in this.submitted && this.element(a.parentNode); },
      highlight(a, b, d) { a.type === 'radio' ? this.findByName(a.name).addClass(b).removeClass(d) : c(a).addClass(b).removeClass(d); },
      unhighlight(a, b, d) { a.type === 'radio' ? this.findByName(a.name).removeClass(b).addClass(d) : c(a).removeClass(b).addClass(d); },
    },
    setDefaults(a) {
      c.extend(
        c.validator.defaults,
        a,
      );
    },
    messages: {
      required: 'This field is required.',
      remote: 'Please fix this field.',
      email: 'Please enter a valid email address.',
      url: 'Please enter a valid URL.',
      date: 'Please enter a valid date.',
      dateISO: 'Please enter a valid date (ISO).',
      number: 'Please enter a valid number.',
      digits: 'Please enter only digits.',
      creditcard: 'Please enter a valid credit card number.',
      equalTo: 'Please enter the same value again.',
      accept: 'Please enter a value with a valid extension.',
      maxlength: c.validator.format('Please enter no more than {0} characters.'),
      minlength: c.validator.format('Please enter at least {0} characters.'),
      rangelength: c.validator.format('Please enter a value between {0} and {1} characters long.'),
      range: c.validator.format('Please enter a value between {0} and {1}.'),
      max: c.validator.format('Please enter a value less than or equal to {0}.'),
      min: c.validator.format('Please enter a value greater than or equal to {0}.'),
    },
    autoCreateRanges: false,
    prototype: {
      init() {
        function a(e) {
          const f = c.data(this[0].form, 'validator'); const g = `on${e.type.replace(
            /^validate/,
            '',
          )}`; f.settings[g] && f.settings[g].call(f, this[0], e);
        } this.labelContainer = c(this.settings.errorLabelContainer); this.errorContext = this.labelContainer.length && this.labelContainer || c(this.currentForm); this.containers = c(this.settings.errorContainer).add(this.settings.errorLabelContainer); this.submitted = {}; this.valueCache = {}; this.pendingRequest = 0; this.pending = {}; this.invalid = {}; this.reset(); const b = this.groups = {}; c.each(this.settings.groups, (e, f) => { c.each(f.split(/\s/), (g, h) => { b[h] = e; }); }); const d = this.settings.rules; c.each(d, (e, f) => { d[e] = c.validator.normalizeRule(f); }); c(this.currentForm).validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", 'focusin focusout keyup', a).validateDelegate(
          "[type='radio'], [type='checkbox'], select, option",
          'click',
          a,
        ); this.settings.invalidHandler && c(this.currentForm).bind('invalid-form.validate', this.settings.invalidHandler);
      },
      form() { this.checkForm(); c.extend(this.submitted, this.errorMap); this.invalid = c.extend({}, this.errorMap); this.valid() || c(this.currentForm).triggerHandler('invalid-form', [this]); this.showErrors(); return this.valid(); },
      checkForm() { this.prepareForm(); for (let a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]); return this.valid(); },
      element(a) {
        this.lastElement = a = this.validationTargetFor(this.clean(a)); this.prepareElement(a); this.currentElements = c(a); const b = this.check(a); if (b) delete this.invalid[a.name]; else this.invalid[a.name] = true; if (!this.numberOfInvalids()) this.toHide = this.toHide.add(this.containers); this.showErrors(); return b;
      },
      showErrors(a) {
        if (a) { c.extend(this.errorMap, a); this.errorList = []; for (const b in a) this.errorList.push({ message: a[b], element: this.findByName(b)[0] }); this.successList = c.grep(this.successList, (d) => !(d.name in a)); } this.settings.showErrors
          ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
      },
      resetForm() { c.fn.resetForm && c(this.currentForm).resetForm(); this.submitted = {}; this.lastElement = null; this.prepareForm(); this.hideErrors(); this.elements().removeClass(this.settings.errorClass); },
      numberOfInvalids() { return this.objectLength(this.invalid); },
      objectLength(a) { let b = 0; let d; for (d in a)b++; return b; },
      hideErrors() { this.addWrapper(this.toHide).hide(); },
      valid() {
        return this.size()
== 0;
      },
      size() { return this.errorList.length; },
      focusInvalid() { if (this.settings.focusInvalid) try { c(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(':visible').focus().trigger('focusin'); } catch (a) {} },
      findLastActive() { const a = this.lastActive; return a && c.grep(this.errorList, (b) => b.element.name == a.name).length == 1 && a; },
      elements() {
        const a = this; const b = {}; return c(this.currentForm).find('input, select, textarea').not(':submit, :reset, :image, [disabled]').not(this.settings.ignore)
          .filter(function () {
            !this.name
&& a.settings.debug && window.console && console.error('%o has no name assigned', this); if (this.name in b || !a.objectLength(c(this).rules())) return false; return b[this.name] = true;
          });
      },
      clean(a) { return c(a)[0]; },
      errors() { return c(`${this.settings.errorElement}.${this.settings.errorClass}`, this.errorContext); },
      reset() { this.successList = []; this.errorList = []; this.errorMap = {}; this.toShow = c([]); this.toHide = c([]); this.currentElements = c([]); },
      prepareForm() { this.reset(); this.toHide = this.errors().add(this.containers); },
      prepareElement(a) { this.reset(); this.toHide = this.errorsFor(a); },
      check(a) {
        a = this.validationTargetFor(this.clean(a)); const b = c(a).rules(); let d = false; let e; for (e in b) {
          const f = { method: e, parameters: b[e] }; try { const g = c.validator.methods[e].call(this, a.value.replace(/\r/g, ''), a, f.parameters); if (g == 'dependency-mismatch')d = true; else { d = false; if (g == 'pending') { this.toHide = this.toHide.not(this.errorsFor(a)); return; } if (!g) { this.formatAndAdd(a, f); return false; } } } catch (h) {
            this.settings.debug && window.console && console.log(`exception occured when checking element ${
              a.id}, check the '${f.method}' method`, h); throw h;
          }
        } if (!d) { this.objectLength(b) && this.successList.push(a); return true; }
      },
      customMetaMessage(a, b) { if (c.metadata) { const d = this.settings.meta ? c(a).metadata()[this.settings.meta] : c(a).metadata(); return d && d.messages && d.messages[b]; } },
      customMessage(a, b) { const d = this.settings.messages[a]; return d && (d.constructor == String ? d : d[b]); },
      findDefined() { for (let a = 0; a < arguments.length; a++) if (arguments[a] !== undefined) return arguments[a]; },
      defaultMessage(
        a,
        b,
      ) { return this.findDefined(this.customMessage(a.name, b), this.customMetaMessage(a, b), !this.settings.ignoreTitle && a.title || undefined, c.validator.messages[b], `<strong>Warning: No message defined for ${a.name}</strong>`); },
      formatAndAdd(a, b) {
        let d = this.defaultMessage(a, b.method); const e = /\$?\{(\d+)\}/g; if (typeof d === 'function')d = d.call(this, b.parameters, a); else if (e.test(d))d = jQuery.format(d.replace(e, '{$1}'), b.parameters); this.errorList.push({ message: d, element: a }); this.errorMap[a.name] = d; this.submitted[a.name] = d;
      },
      addWrapper(a) { if (this.settings.wrapper)a = a.add(a.parent(this.settings.wrapper)); return a; },
      defaultShowErrors() {
        for (var a = 0; this.errorList[a]; a++) { var b = this.errorList[a]; this.settings.highlight && this.settings.highlight.call(this, b.element, this.settings.errorClass, this.settings.validClass); this.showLabel(b.element, b.message); } if (this.errorList.length) this.toShow = this.toShow.add(this.containers); if (this.settings.success) for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
        if (this.settings.unhighlight) { a = 0; for (b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass); } this.toHide = this.toHide.not(this.toShow); this.hideErrors(); this.addWrapper(this.toShow).show();
      },
      validElements() { return this.currentElements.not(this.invalidElements()); },
      invalidElements() { return c(this.errorList).map(function () { return this.element; }); },
      showLabel(a, b) {
        let d = this.errorsFor(a); if (d.length) {
          d.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
          d.attr('generated') && d.html(b);
        } else { d = c(`<${this.settings.errorElement}/>`).attr({ for: this.idOrName(a), generated: true }).addClass(this.settings.errorClass).html(b || ''); if (this.settings.wrapper)d = d.hide().show().wrap(`<${this.settings.wrapper}/>`).parent(); this.labelContainer.append(d).length || (this.settings.errorPlacement ? this.settings.errorPlacement(d, c(a)) : d.insertAfter(a)); } if (!b && this.settings.success) { d.text(''); typeof this.settings.success === 'string' ? d.addClass(this.settings.success) : this.settings.success(d); } this.toShow = this.toShow.add(d);
      },
      errorsFor(a) { const b = this.idOrName(a); return this.errors().filter(function () { return c(this).attr('for') == b; }); },
      idOrName(a) { return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name); },
      validationTargetFor(a) { if (this.checkable(a))a = this.findByName(a.name).not(this.settings.ignore)[0]; return a; },
      checkable(a) { return /radio|checkbox/i.test(a.type); },
      findByName(a) {
        const b = this.currentForm; return c(document.getElementsByName(a)).map((
          d,
          e,
        ) => e.form == b && e.name == a && e || null);
      },
      getLength(a, b) { switch (b.nodeName.toLowerCase()) { case 'select': return c('option:selected', b).length; case 'input': if (this.checkable(b)) return this.findByName(b.name).filter(':checked').length; } return a.length; },
      depend(a, b) { return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : true; },
      dependTypes: { boolean(a) { return a; }, string(a, b) { return !!c(a, b.form).length; }, function(a, b) { return a(b); } },
      optional(a) {
        return !c.validator.methods.required.call(
          this,
          c.trim(a.value),
          a,
        ) && 'dependency-mismatch';
      },
      startRequest(a) { if (!this.pending[a.name]) { this.pendingRequest++; this.pending[a.name] = true; } },
      stopRequest(a, b) {
        this.pendingRequest--; if (this.pendingRequest < 0) this.pendingRequest = 0; delete this.pending[a.name]; if (b && this.pendingRequest == 0 && this.formSubmitted && this.form()) { c(this.currentForm).submit(); this.formSubmitted = false; } else if (!b && this.pendingRequest == 0 && this.formSubmitted) {
          c(this.currentForm).triggerHandler('invalid-form', [this]); this.formSubmitted = false;
        }
      },
      previousValue(a) { return c.data(a, 'previousValue') || c.data(a, 'previousValue', { old: null, valid: true, message: this.defaultMessage(a, 'remote') }); },
    },
    classRuleSettings: {
      required: { required: true }, email: { email: true }, url: { url: true }, date: { date: true }, dateISO: { dateISO: true }, dateDE: { dateDE: true }, number: { number: true }, numberDE: { numberDE: true }, digits: { digits: true }, creditcard: { creditcard: true },
    },
    addClassRules(a, b) {
      a.constructor == String ? this.classRuleSettings[a] = b : c.extend(
        this.classRuleSettings,
        a,
      );
    },
    classRules(a) { const b = {}; (a = c(a).attr('class')) && c.each(a.split(' '), function () { this in c.validator.classRuleSettings && c.extend(b, c.validator.classRuleSettings[this]); }); return b; },
    attributeRules(a) { const b = {}; a = c(a); for (const d in c.validator.methods) { var e; if (e = d === 'required' && typeof c.fn.prop === 'function' ? a.prop(d) : a.attr(d))b[d] = e; else if (a[0].getAttribute('type') === d)b[d] = true; }b.maxlength && /-1|2147483647|524288/.test(b.maxlength) && delete b.maxlength; return b; },
    metadataRules(a) {
      if (!c.metadata) return {};
      const b = c.data(a.form, 'validator').settings.meta; return b ? c(a).metadata()[b] : c(a).metadata();
    },
    staticRules(a) { let b = {}; const d = c.data(a.form, 'validator'); if (d.settings.rules)b = c.validator.normalizeRule(d.settings.rules[a.name]) || {}; return b; },
    normalizeRules(a, b) {
      c.each(a, (d, e) => {
        if (e === false) delete a[d]; else if (e.param || e.depends) {
          let f = true; switch (typeof e.depends) { case 'string': f = !!c(e.depends, b.form).length; break; case 'function': f = e.depends.call(b, b); } if (f) {
            a[d] = e.param !== undefined
              ? e.param : true;
          } else delete a[d];
        }
      }); c.each(a, (d, e) => { a[d] = c.isFunction(e) ? e(b) : e; }); c.each(['minlength', 'maxlength', 'min', 'max'], function () { if (a[this])a[this] = Number(a[this]); }); c.each(['rangelength', 'range'], function () { if (a[this])a[this] = [Number(a[this][0]), Number(a[this][1])]; }); if (c.validator.autoCreateRanges) { if (a.min && a.max) { a.range = [a.min, a.max]; delete a.min; delete a.max; } if (a.minlength && a.maxlength) { a.rangelength = [a.minlength, a.maxlength]; delete a.minlength; delete a.maxlength; } }a.messages && delete a.messages;
      return a;
    },
    normalizeRule(a) { if (typeof a === 'string') { const b = {}; c.each(a.split(/\s/), function () { b[this] = true; }); a = b; } return a; },
    addMethod(a, b, d) { c.validator.methods[a] = b; c.validator.messages[a] = d != undefined ? d : c.validator.messages[a]; b.length < 3 && c.validator.addClassRules(a, c.validator.normalizeRule(a)); },
    methods: {
      required(a, b, d) {
        if (!this.depend(d, b)) return 'dependency-mismatch'; switch (b.nodeName.toLowerCase()) {
          case 'select': return (a = c(b).val()) && a.length > 0; case 'input': if (this.checkable(b)) {
            return this.getLength(
              a,
              b,
            ) > 0;
          } default: return c.trim(a).length > 0;
        }
      },
      remote(a, b, d) {
        if (this.optional(b)) return 'dependency-mismatch'; const e = this.previousValue(b); this.settings.messages[b.name] || (this.settings.messages[b.name] = {}); e.originalMessage = this.settings.messages[b.name].remote; this.settings.messages[b.name].remote = e.message; d = typeof d === 'string' && { url: d } || d; if (this.pending[b.name]) return 'pending'; if (e.old === a) return e.valid; e.old = a; const f = this; this.startRequest(b); const g = {}; g[b.name] = a; c.ajax(c.extend(true, {
          url: d,
          mode: 'abort',
          port: `validate${b.name}`,
          dataType: 'json',
          data: g,
          success(h) { f.settings.messages[b.name].remote = e.originalMessage; const j = h === true; if (j) { var i = f.formSubmitted; f.prepareElement(b); f.formSubmitted = i; f.successList.push(b); f.showErrors(); } else { i = {}; h = h || f.defaultMessage(b, 'remote'); i[b.name] = e.message = c.isFunction(h) ? h(a) : h; f.showErrors(i); }e.valid = j; f.stopRequest(b, j); },
        }, d)); return 'pending';
      },
      minlength(a, b, d) { return this.optional(b) || this.getLength(c.trim(a), b) >= d; },
      maxlength(
        a,
        b,
        d,
      ) { return this.optional(b) || this.getLength(c.trim(a), b) <= d; },
      rangelength(a, b, d) { a = this.getLength(c.trim(a), b); return this.optional(b) || a >= d[0] && a <= d[1]; },
      min(a, b, d) { return this.optional(b) || a >= d; },
      max(a, b, d) { return this.optional(b) || a <= d; },
      range(a, b, d) { return this.optional(b) || a >= d[0] && a <= d[1]; },
      email(a, b) { return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a); },
      url(a, b) { return this.optional(b) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a); },
      date(a, b) { return this.optional(b) || !/Invalid|NaN/.test(new Date(a)); },
      dateISO(a, b) { return this.optional(b) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a); },
      number(a, b) { return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a); },
      digits(a, b) { return this.optional(b) || /^\d+$/.test(a); },
      creditcard(a, b) {
        if (this.optional(b)) return 'dependency-mismatch'; if (/[^0-9 -]+/.test(a)) return false; let d = 0; let e = 0; let f = false; a = a.replace(/\D/g, ''); for (let g = a.length - 1; g
>= 0; g--) { e = a.charAt(g); e = parseInt(e, 10); if (f) if ((e *= 2) > 9)e -= 9; d += e; f = !f; } return d % 10 == 0;
      },
      accept(a, b, d) { d = typeof d === 'string' ? d.replace(/,/g, '|') : 'png|jpe?g|gif'; return this.optional(b) || a.match(RegExp(`.(${d})$`, 'i')); },
      equalTo(a, b, d) { d = c(d).unbind('.validate-equalTo').bind('blur.validate-equalTo', () => { c(b).valid(); }); return a == d.val(); },
    },
  }); c.format = c.validator.format;
}(jQuery));
(function (c) { const a = {}; if (c.ajaxPrefilter)c.ajaxPrefilter((d, e, f) => { e = d.port; if (d.mode == 'abort') { a[e] && a[e].abort(); a[e] = f; } }); else { const b = c.ajax; c.ajax = function (d) { const e = ('port' in d ? d : c.ajaxSettings).port; if (('mode' in d ? d : c.ajaxSettings).mode == 'abort') { a[e] && a[e].abort(); return a[e] = b.apply(this, arguments); } return b.apply(this, arguments); }; } }(jQuery));
(function (c) {
  !jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener && c.each({ focus: 'focusin', blur: 'focusout' }, (a, b) => { function d(e) { e = c.event.fix(e); e.type = b; return c.event.handle.call(this, e); }c.event.special[b] = { setup() { this.addEventListener(a, d, true); }, teardown() { this.removeEventListener(a, d, true); }, handler(e) { arguments[0] = c.event.fix(e); arguments[0].type = b; return c.event.handle.apply(this, arguments); } }; }); c.extend(c.fn, {
    validateDelegate(
      a,
      b,
      d,
    ) { return this.bind(b, function (e) { const f = c(e.target); if (f.is(a)) return d.apply(f, arguments); }); },
  });
}(jQuery));
