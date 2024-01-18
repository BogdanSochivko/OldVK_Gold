(function() {
  "use strict";
  new MutationObserver(function() {
    if(document.title == "Закладки") document.title = "Мои закладки";
  }).observe(document.head, {childList:true, subtree: true});
})();