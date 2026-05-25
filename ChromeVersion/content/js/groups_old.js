//Функция для автарки а точнее настройки сообщество.
(function() {
   $(".redesigned-group-avatar ").append($(".page_block.page_photo"));
})();
//img_avatar_groups дабавляет.
(function() {
$(".redesigned-group-avatar .AvatarRich").prependTo($("img.page_avatar_img"));
})();

(function() {
  function getLanguageFromCookie() {
    const match = document.cookie.match(new RegExp('(^| )remixlang=([^;]+)'));
    console.log("Cookie match:", match); // Проверяем совпадение
    return match ? (match[2] === '3' ? 'en' : 'ru') : 'en';
  }

  function applyLanguageSettings() {
    const lang = getLanguageFromCookie();
    console.log("Detected language from cookie:", lang); // Проверяем язык в консоли
    document.documentElement.setAttribute('lang', lang); // Устанавливаем атрибут на <html>
    document.body.setAttribute('lang', lang); // Устанавливаем атрибут на <body>
  }

  document.addEventListener("DOMContentLoaded", function() {
    if (window.location.href.includes("id.vk.com/account")) {
      applyLanguageSettings();
    }
  });
})();


(function() {
  "use strict";
  document.addEventListener('DOMContentLoaded', function() {
    // Находим элемент, который нужно открепить
    const postDateBlock = document.querySelector('.PostDateBlock__root');
    if (postDateBlock) {
      // Удаляем его из текущего родителя
      const parent = postDateBlock.closest('.like_cont.PostBottomActionLikeBtns.PostBottomActionLikeBtns--withTransparentButtons');
      if (parent) {
        parent.removeChild(postDateBlock);
      }

      // Закрепляем элемент в левой части страницы
      postDateBlock.style.position = 'fixed';
      postDateBlock.style.left = '0px';
      postDateBlock.style.top = '0px';
      
      // Добавляем элемент в body для закрепления в левой части страницы
      document.body.appendChild(postDateBlock);
    }
  });
})();



