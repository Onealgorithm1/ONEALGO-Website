(function () {
  try {
    function reportError(payload) {
      try {
        var body = JSON.stringify(payload || {});
        try {
          if (navigator.sendBeacon) {
            var blob = new Blob([body], { type: "application/json" });
            navigator.sendBeacon("/.netlify/functions/api", blob);
          }
        } catch (e) {}
        fetch("/.netlify/functions/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body,
        }).catch(function () {
          try {
            fetch("/api/log-js-error", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: body,
            }).catch(function () {});
          } catch (e) {}
        });
      } catch (e) {
        try {
          console.error("Error reporting failure", e);
        } catch (e) {}
      }
    }

    window.addEventListener("error", function (evt) {
      try {
        if (evt.message === "Script error." && !evt.filename) {
          return;
        }
        var isResourceError = evt.target && (evt.target.src || evt.target.href);
        var payload = {
          type: isResourceError ? "resource_error" : "error",
          message:
            evt.message ||
            (isResourceError ? "Resource load error" : "Script error"),
          filename:
            evt.filename ||
            (evt.target && (evt.target.src || evt.target.href)) ||
            null,
          lineno: evt.lineno || null,
          colno: evt.colno || null,
          stack: (evt.error && evt.error.stack) || null,
          href: location.href,
          userAgent: navigator.userAgent,
          time: Date.now(),
        };
        setTimeout(function () {
          reportError(payload);
        }, 0);
      } catch (e) {
        try {
          console.error("Error in error handler", e);
        } catch (e) {}
      }
    });

    window.addEventListener("unhandledrejection", function (evt) {
      try {
        var reason = evt.reason;
        var message =
          (reason && reason.message) || String(reason) || "unhandledrejection";
        var stack = (reason && reason.stack) || null;
        var payload = {
          type: "unhandledrejection",
          message: message,
          stack: stack,
          href: location.href,
          userAgent: navigator.userAgent,
          time: Date.now(),
        };
        setTimeout(function () {
          reportError(payload);
        }, 0);
      } catch (e) {
        try {
          console.error("Error in unhandledrejection handler", e);
        } catch (e) {}
      }
    });

    var LOADER_ID = "sa-dynamic-optimization-loader";
    var LEGACY_ID = "sa-dynamic-optimization";
    var LOADER_UUID = "ca1f4c7667df2c4769bff7338a598f2a";
    var LOADER_SRC =
      "https://dashboard.searchatlas.com/scripts/dynamic_optimization.js";

    function loadSearchAtlasScript() {
      if (window.saScriptLoaded || document.getElementById(LOADER_ID)) {
        try {
          console.log("SearchAtlas already loaded, skipping...");
        } catch (e) {}
        window.saScriptLoaded = true;
        return;
      }

      var legacyScript = document.getElementById(LEGACY_ID);
      if (legacyScript && legacyScript.parentNode) {
        legacyScript.parentNode.removeChild(legacyScript);
      }

      window.saScriptLoaded = true;
      try {
        console.log("\ud83d\udd0d SearchAtlas: Initializing with new UUID...");
      } catch (e) {}

      var script = document.createElement("script");
      script.id = LOADER_ID;
      script.type = "text/javascript";
      script.async = true;
      script.setAttribute("data-uuid", LOADER_UUID);
      script.setAttribute("nowprocket", "");
      script.setAttribute("nitro-exclude", "");
      script.src = LOADER_SRC;

      script.onload = function () {
        window.__saDynamicOptimizationLoaded = true;
        try {
          console.log(
            "\u2705 SearchAtlas: Script loaded successfully with new credentials!",
          );
        } catch (e) {}
      };

      script.onerror = function (event) {
        window.saScriptLoaded = false;
        try {
          console.error("\u274c SearchAtlas: Failed to load script", event);
        } catch (e) {}
        reportError({
          type: "searchatlas_script_load_error",
          message: "SearchAtlas dynamic optimization script failed to load",
          filename: LOADER_SRC,
          href: location.href,
          userAgent: navigator.userAgent,
          time: Date.now(),
          detail:
            event && event.message
              ? event.message
              : event && event.type
                ? event.type
                : null,
        });
      };

      document.head.appendChild(script);
    }

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      loadSearchAtlasScript();
    } else {
      document.addEventListener("DOMContentLoaded", loadSearchAtlasScript, {
        once: true,
      });
    }
  } catch (err) {
    console.error("Error inserting SearchAtlas script", err);
  }
})();
