javascript: (function () {
    var bmVersion = "1";
    var script = document.getElementById("eduquick");
    if (!script) {
        script = document.createElement("script");
        script.src = "http://localhost:5173/eduquick.min.js";
        script.id = "eduquick";
        script.setAttribute("eduquick-bm-version", bmVersion);
        script.setAttribute("eduquick-visible", "true");
        document.body.appendChild(script);
    } else {
        var visibility = script.getAttribute("eduquick-visible") === "true";
        script.setAttribute("eduquick-visible", visibility ? "false" : "true");
    }
})();
