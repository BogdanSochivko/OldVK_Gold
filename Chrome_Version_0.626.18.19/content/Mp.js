(function() {
  "use strict";
new MutationObserver(function() {
   $("[dir] .audio_page_layout2 .ui_tabs_header").prepend('<li class="_audio_section_tab _audio_section_tab_own_playlists_section_tab__playlists2"><a href="/audio?section=playlists" class="ui_tab" onclick="return uiTabs.goTab(this, event, 0);" data-section-id="PUldVA8WChMiAgYpWVUSAzRJRVQAFlFEKRwHKUVYCh8qAhoCRhZHRH9JU0cZFlNEfFhaQgAFWlN3XxQ">Мои плейлисты</a></li>');
   }).observe(document.head, {childList:true, subtree: true});
})();
//Код работает над мини-проигрователем во всём сайте vk.com
new MutationObserver(function() {
_updateTitle(e, t) {
                if (t = (0,
                d.intval)(t),
                e = o.AudioUtils.audioTupleToAudioObject(e),
                (0,
                n.toggleClass)(this._el, "audio_player_podcast", o.AudioUtils.isPodcast(e)),
                (0,
                n.toggleClass)(this._el, "audio_player_article_tts", o.AudioUtils.isArticleTts(e)),
                e) {
                    void 0 !== this._currTitleReTO && clearTimeout(this._currTitleReTO);
                    var i = (0,
                    n.geByClass1)("top_audio_player_title_out", this._el);
                    (0,
                    n.re)(i);
                    var a = (0,
                    n.geByClass1)("top_audio_player_title", this._el);
                    if (0 !== t) {
                        var s = t < 0 ? -10 : 10
                          , l = `opacity: 0; top: ${s}px; left: ${a.offsetLeft}px`
                          , _ = this.getTitleText(e)
                          , r = (0,
                        n.se)('<div class="top_audio_player_title top_audio_player_title_next" style="' + l + '">' + _ + "</div>");
                        r.setAttribute("onmouseover", "setTitle(this)"),
                        t > 0 ? (0,
                        n.domInsertAfter)(r, a) : (0,
                        n.domInsertBefore)(r, a),
                        (0,
                        n.addClass)(a, "top_audio_player_title_out"),
                        (0,
                        n.setStyle)(a, {
                            top: -s,
                            opacity: 0
                        }),
                        setTimeout((function() {
                            (0,
                            n.setStyle)(r, {
                                top: 0,
                                opacity: 1
                            })
                        }
                        ), 10),
                        clearTimeout(this._currTitleReTO),
                        this._currTitleReTO = setTimeout((function() {
                            (0,
                            n.re)(a),
                            (0,
                            n.removeClass)(r, "top_audio_player_title_next")
                        }
                        ), g.TITLE_CHANGE_ANIM_SPEED)
                    } else
                        a && (a.innerHTML = this.getTitleText(e),
                        a.titleSet = 0,
                        a.setAttribute("onmouseover", "setTitle(this)"))
                }
            }
            getTitleText(e) {
                return e.performer + " &mdash; " + e.title
            }
    }).observe(document.head, {childList:true, subtree: true});
})();