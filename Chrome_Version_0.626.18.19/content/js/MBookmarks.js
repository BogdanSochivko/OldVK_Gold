(function() {
  "use strict";
  new MutationObserver(function() {
    if(document.title == "Закладки") document.title = "Мои закладки";
  }).observe(document.head, {childList:true, subtree: true});
})();
(function() {
  "use strict";
  new MutationObserver(function() {
    if(document.title == "Лента новостей") document.title = "Новости";
  }).observe(document.head, {childList:true, subtree: true});
})();
(function() {
  "use strict";
  new MutationObserver(function() {
    const elements = document.querySelectorAll(':lang(kk) #l_ntf .LeftMenuItem-module__label--itYtZ');
    elements.forEach(function(element) {
      if (element.textContent === "Жауаптарым") {
        element.textContent = "Менің жауаптарым";
      }
    });
  }).observe(document.body, {childList: true, subtree: true});
})();
(function() {
  "use strict";
  new MutationObserver(function() {
    if (document.title == "Моя музыка") {
      document.title = "Мои аудиозаписи";
    } else if (document.title == "My music") {
      document.title = "My audios";
    } else if (document.title == "Музыкам") {
      document.title = "Менің аудиожазбаларым";
    }
  }).observe(document.head, {childList: true, subtree: true});
})();

(function() {
  "use strict";
  new MutationObserver(function() {
    const enUsPlaylists = document.querySelector(':lang(en-us) .own-playlists-text');
    const enUsSettings = document.querySelectorAll(':lang(en-us) .LeftMenuItem-module__label--itYtZ');
    const kkPlaylists = document.querySelector(':lang(kk) .own-playlists-text');
    const kkSettings = document.querySelectorAll(':lang(kk) .LeftMenuItem-module__label--itYtZ');

    if (enUsPlaylists && enUsPlaylists.textContent === "Мои плейлисты") {
      enUsPlaylists.textContent = "My playlist";
    }

    enUsSettings.forEach(function(element) {
      if (element.textContent === "Мои Настройки") {
        element.textContent = "My Settings";
      }
    });

    if (kkPlaylists && kkPlaylists.textContent === "Мои плейлисты") {
      kkPlaylists.textContent = "Менің плейлисттерім";
    }

    kkSettings.forEach(function(element) {
      if (element.textContent === "Мои Настройки") {
        element.textContent = "Менің параметрлерім";
      }
    });
  }).observe(document.body, {childList: true, subtree: true});
})();
