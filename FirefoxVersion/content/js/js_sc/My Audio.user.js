(function() {
  "use strict";
  new MutationObserver(function() {
    if(document.title == "Моя музыка") document.title = "Мои аудиозаписи";
  }).observe(document.head, {childList:true, subtree: true});
})();
(function() {
  "use strict";
  new MutationObserver(function() {
    if(document.title == "Для Вас") document.title = "Рекомендации";
  }).observe(document.head, {childList:true, subtree: true});
})();
(function() {
  "use strict";
  new MutationObserver(function() {
    if(document.title == "Обзор") document.title = "Популярное";
  }).observe(document.head, {childList:true, subtree: true});
})();