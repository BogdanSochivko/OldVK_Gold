(function() {
    'use strict';
    new MutationObserver(function() {
        $(function() {
            var Online = $(".profile_online_lv").html();
            if( Online && Online.match(/online<b.*b>/g) ) {
                $(".profile_online_lv").text("Online").append('<b class="mob_onl profile_mob_onl" onclick="mobilePromo();" onmouseover="mobileOnlineTip(this, {mid: cur.oid, right: 1, was: 1})"></b>')
            }
            else if( Online && Online.match(/online/g) ) {
                $(".profile_online_lv").text('Online');
            }
        });
    }).observe(document.body, { childList: true, subtree: true });
})();