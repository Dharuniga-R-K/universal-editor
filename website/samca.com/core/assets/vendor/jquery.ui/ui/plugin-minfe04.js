!(function (e) {
  typeof define === 'function' && define.amd ? define(['jquery', './version'], e) : e(jQuery);
}(((e) => e.ui.plugin = { add(n, i, t) { let u; const o = e.ui[n].prototype; for (u in t)o.plugins[u] = o.plugins[u] || [], o.plugins[u].push([i, t[u]]); }, call(e, n, i, t) { let u; const o = e.plugins[n]; if (o && (t || e.element[0].parentNode && e.element[0].parentNode.nodeType !== 11)) for (u = 0; u < o.length; u++)e.options[o[u][0]] && o[u][1].apply(e.element, i); } })));
// # sourceMappingURL=plugin-min.js.map
