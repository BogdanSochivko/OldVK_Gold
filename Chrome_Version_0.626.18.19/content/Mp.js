(function() {
  "use strict";

  function addPlaylistTab() {
    if (!document.querySelector('._audio_section_tab_own_playlists_section_tab__playlists2')) {
      const tab = $('<li class="_audio_section_tab _audio_section_tab_own_playlists_section_tab__playlists2"><a href="/audio?section=playlists" class="ui_tab own-playlists-tab" onclick="return uiTabs.goTab(this, event, 0);" data-section-id="PUldVA8WChMiAgYpWVUSAzRJRVQAFlFEKRwHKUVYCh8qAhoCRhZHRH9JU0cZFlNEfFhaQgAFWlN3XxQ"><span class="own-playlists-text">Мои плейлисты</span></a></li>');
      $("[dir] .audio_page_layout2 .ui_tabs_header").prepend(tab);

      // Добавляем обработчик событий на клик
      tab.find('.own-playlists-tab').on('click', function(event) {
        event.preventDefault(); // Предотвращаем переход по ссылке
        selectTab(this);
      });
    }
  }

  function selectTab(element) {
    // Убираем класс "ui_tab_sel" со всех вкладок
    document.querySelectorAll('.ui_tab').forEach(tab => {
      tab.classList.remove('ui_tab_sel');
    });
    // Добавляем класс "ui_tab_sel" к нажатой вкладке
    element.classList.add('ui_tab_sel');
  }

  new MutationObserver(function() {
    addPlaylistTab();
  }).observe(document.head, {childList: true, subtree: true});

  addPlaylistTab();
})();


