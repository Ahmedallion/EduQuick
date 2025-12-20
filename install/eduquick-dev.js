javascript: (function () {
    var s = document.getElementById("eduquick");
    if (!s) {
        s = document.createElement("script");
        s.src = "http://localhost:3000/eduquick.min.js";
        s.id = "eduquick";
        s.setAttribute("eduquick-visible", "true");
        document.body.appendChild(s);
    } else {
        var v = s.getAttribute("eduquick-visible") === "true";
        s.setAttribute("eduquick-visible", v ? "false" : "true");
    }
})();
