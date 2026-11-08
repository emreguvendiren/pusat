// Local QA route only. This file is never copied to the production build.
const metrics = { lcpMs: null, cls: 0, scope: 'local-unthrottled' };
let sessionStart = 0;
let lastShift = 0;
let sessionValue = 0;
try {
  new PerformanceObserver(list => {
    metrics.lcpMs = Math.round(list.getEntries().at(-1).startTime);
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      if (entry.hadRecentInput) continue;
      if (sessionValue && entry.startTime - lastShift < 1000 && entry.startTime - sessionStart < 5000) {
        sessionValue += entry.value;
      } else {
        sessionStart = entry.startTime;
        sessionValue = entry.value;
      }
      lastShift = entry.startTime;
      metrics.cls = Math.max(metrics.cls, sessionValue);
    }
  }).observe({ type: 'layout-shift', buffered: true });
} catch { /* Performance observer types may not exist in every browser. */ }
const report = document.createElement('output');
report.id = 'qa-performance';
report.style.cssText = 'display:block;padding:24px;background:#f0eee8;color:#141719;font:12px/1.8 monospace;white-space:pre-wrap';
report.setAttribute('aria-label', 'Yerel performans ölçümü');
document.body.append(report);
function update() {
  const nav = performance.getEntriesByType('navigation')[0];
  const resources = performance.getEntriesByType('resource');
  const fcp = performance.getEntriesByName('first-contentful-paint')[0];
  Object.assign(metrics, {
    fcpMs: fcp ? Math.round(fcp.startTime) : null,
    domContentLoadedMs: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
    transferredBytes: resources.reduce((sum, resource) => sum + resource.transferSize, nav?.transferSize || 0),
    externalRequests: resources.filter(r => new URL(r.name).origin !== location.origin).length,
  });
  report.textContent = JSON.stringify({ ...metrics, cls: Number(metrics.cls.toFixed(4)) }, null, 2);
}
window.addEventListener('load', update, { once: true });
setTimeout(update, 2500);
setTimeout(update, 5000);
