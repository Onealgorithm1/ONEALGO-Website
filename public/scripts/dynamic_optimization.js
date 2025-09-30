(function () {
  // Vendorized safe stub of SearchAtlas dynamic_optimization.js
  // This file intentionally avoids throwing on network errors and exposes
  // a minimal interface used by the site. It attempts to fetch remote data
  // but swallows errors so the page doesn't break when external APIs fail.

  try {
    var UUID = "180b3689-4f9a-42e5-8fc5-f4b7c2217a7e";
    function log() {
      if (window.console && window.console.log) {
        console.log.apply(console, arguments);
      }
    }

    function fetchUrlDetails() {
      try {
        var url = encodeURIComponent(window.location.href.split('#')[0]);
        var endpoint = "https://sa.searchatlas.com/api/v2/otto-url-details/?url=" + url + "&uuid=" + UUID;
        return fetch(endpoint, { credentials: 'omit' })
          .then(function (res) {
            if (!res.ok) {
              log('SearchAtlas API returned non-OK:', res.status);
              return null;
            }
            return res.json().catch(function () { return null; });
          })
          .catch(function (err) {
            log('SearchAtlas fetch failed (ignored):', err && err.message);
            return null;
          });
      } catch (e) {
        return Promise.resolve(null);
      }
    }

    function initializeScript() {
      try {
        // Try to fetch data (best-effort). Do not throw on failure.
        fetchUrlDetails().then(function (data) {
          if (data) {
            log('SearchAtlas data loaded (vendor):', data);
            // Optionally expose to window if other code expects it
            window.__SEARCHATLAS_DATA__ = data;
          } else {
            log('SearchAtlas: no data (vendor)');
          }
        });
      } catch (e) {
        log('SearchAtlas initialize error (ignored)');
      }
    }

    // Auto initialize after load
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(initializeScript, 0);
    } else {
      window.addEventListener('DOMContentLoaded', initializeScript);
    }

    // Expose a small API in case other parts expect functions
    window.SearchAtlas = window.SearchAtlas || {};
    window.SearchAtlas.init = initializeScript;
    window.SearchAtlas.fetchUrlDetails = fetchUrlDetails;
  } catch (e) {
    try { console.error('Vendor SearchAtlas failed:', e); } catch (e) {}
  }
})();
