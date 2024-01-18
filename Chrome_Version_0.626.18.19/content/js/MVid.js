(function() {
  "use strict";
  new MutationObserver(function() {
    if(document.title == "Мои видео") document.title = "Мои видеозаписи";
  }).observe(document.head, {childList:true, subtree: true});
})();