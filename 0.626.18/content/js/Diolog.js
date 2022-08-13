(function() {
  "use strict";
  new MutationObserver(function() {
    if(document.title == "Мессенджер") document.title = "Диалоги";
  }).observe(document.head, {childList:true, subtree: true});
})();

(function() {
$(".im-page--dialogs-settings._im_dialogs_cog_settings").prepend('<a tabindex="0" role="link" class="im_classic_back1" href="/al_im.php?type=classic" data-action="im_classic_back"</a>');
})();


KPP.add('.im-right-menu', function (irm) {
        const ian = irm.getElementsByClassName('im-aside-notice');
        const ipd = document.getElementsByClassName('im-page--dialogs')[0];
        const id = document.getElementById('im_dialogs');
        if (ian.length > 0)
            for (let i = 0, l = ian.length; i < l; i++)
                ipd.insertBefore(ian[i], id);
            const igodn = document.getElementById('im-group-online-disabled-notice');
            if (igodn)
                ipd.insertBefore(igodn, id)
    });
	
