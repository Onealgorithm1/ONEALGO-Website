(function () {
  // Vendorized safe stub of SearchAtlas dynamic_optimization.js
  // Modified to avoid network calls (prevents external 401 errors and noisy failures)
  try {
    var UUID = "180b3689-4f9a-42e5-8fc5-f4b7c2217a7e";
    var DIAGNOSTICS =
      typeof window !== "undefined" &&
      window.location &&
      window.location.search.indexOf("diagnostics") !== -1;

    function log() {
      if (DIAGNOSTICS && window.console && window.console.log) {
        console.log.apply(console, arguments);
      }
    }

    function fetchUrlDetails() {
      // Skip external fetch to sa.searchatlas.com to avoid 401/blocked requests.
      // Return a resolved promise with null so callers continue gracefully.
      log("SearchAtlas fetch disabled (inline).");
      return Promise.resolve(null);
    }

    function initializeScript() {
      try {
        fetchUrlDetails().then(function (data) {
          if (data) {
            log("SearchAtlas data loaded (vendor):", data);
            window.__SEARCHATLAS_DATA__ = data;
          } else {
            log("SearchAtlas: fetch disabled or no data (vendor)");
          }
        });
      } catch (e) {
        log("SearchAtlas initialize error (ignored)");
      }
    }

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      setTimeout(initializeScript, 0);
    } else {
      window.addEventListener("DOMContentLoaded", initializeScript);
    }

    window.SearchAtlas = window.SearchAtlas || {};
    window.SearchAtlas.init = initializeScript;
    window.SearchAtlas.fetchUrlDetails = fetchUrlDetails;
  } catch (e) {
    try {
      console.error("Vendor SearchAtlas failed:", e);
    } catch (e) {}
  }
})();
