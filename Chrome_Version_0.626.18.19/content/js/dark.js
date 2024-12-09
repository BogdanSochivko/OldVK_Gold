(function() {
  "use strict";

  let lastTime = 0;

  function setLightTheme() {
    const lightScheme = "vkcom_light";
    if (document.body.getAttribute("scheme") !== lightScheme) {
      document.body.setAttribute("scheme", lightScheme);
      document.body.classList.remove("vkui--vkBase--dark", "vkui--vkAccessibility--dark");
      document.body.classList.add("vkui--vkBase--light", "vkui--vkAccessibility--light");

      const metaThemeColor = document.querySelector("meta[name=theme-color]");
      const metaColorScheme = document.querySelector("meta[name=color-scheme]");
    
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", "#ffffff");
      }
      
      if (metaColorScheme) {
        metaColorScheme.setAttribute("content", "light");
      }
    }
  }

  function checkTheme(timestamp) {
    if (timestamp - lastTime > 7000) { // 5 seconds
      setLightTheme();
      lastTime = timestamp;
    }
    requestAnimationFrame(checkTheme);
  }

  // Set light theme on page load
  setLightTheme();

  // Disable automatic theme switching
  const darkSchemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
  const lightSchemeMedia = window.matchMedia("(prefers-color-scheme: light)");

  darkSchemeMedia.removeEventListener("change", setLightTheme);
  lightSchemeMedia.removeEventListener("change", setLightTheme);

  requestAnimationFrame(checkTheme);
})();




