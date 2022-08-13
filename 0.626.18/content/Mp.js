(function() {
  "use strict";
new MutationObserver(function() {
   $("[dir] .audio_page_layout2 .ui_tabs_header").prepend('<li class="_audio_section_tab _audio_section_tab_own_playlists_section_tab__playlists2"><a href="/audio?section=playlists" class="ui_tab" onclick="return uiTabs.goTab(this, event, 0);" data-section-id="PUldVA8WChMiAgYpWVUSAzRJRVQAFlFEKRwHKUVYCh8qAhoCRhZHRH9JU0cZFlNEfFhaQgAFWlN3XxQ">Мои плейлисты</a></li>');
   }).observe(document.head, {childList:true, subtree: true});
})();