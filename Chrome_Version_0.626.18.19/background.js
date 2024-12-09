chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    if (details.url.startsWith("https://stats.vk-portal.net/web-stats/p")) {
      details.requestHeaders.push({ name: "Origin", value: "0.626.18.24" });
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["https://stats.vk-portal.net/*"] },
  ["blocking", "requestHeaders"]
);