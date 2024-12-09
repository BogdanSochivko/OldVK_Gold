var lang, emoji;

var injectStart = document.createElement('script');
injectStart.type = 'text/javascript';
injectStart.src = isWebExt ? browser.runtime.getURL('content/injectStart.js') : options.inject;

var injectOptions = document.createElement('script');
injectOptions.type = 'text/javascript';


document.addEventListener('DOMContentLoaded', () => logTime('DOM'));
function logTime() {
  console.log(new Date().toLocaleTimeString());
}

document.addEventListener('DOMContentLoaded', function() {
  logTime();
});

function setLayoutWidth(width) {
    document.documentElement.style.setProperty('--layout-width', width + 'px', 'important');
}

var getOptions = new Promise(function (resolve) {
    if (isWebExt) {
        browser.storage.local.get(function (items) {
            Object.assign(options, items);
            resolve();
        });
    } else {
        self.port.on('options', function (o) {
            Object.assign(options, o);
            resolve();
        })
    }
});



function init() {
    injectOptions.text = 'var oldvk={};oldvk.options=' + JSON.stringify(options) + ';' + (!isWebExt ? 'oldvk.fox=true;' : '');
    document.head.appendChild(injectOptions);
    document.head.appendChild(injectStart);
    headOptions();
    checkCSS(styles);
    if (isWebExt) {
        insertCSS('local');
        insertCSS('main');
        //insertCSS('ny');
		//insertCSS('XB');
		//insertCSS('8_martha');
		//insertCSS('9_may_Victory_Day');
		//insertCSS('birth_day_vk');
		if (isFirefox)
            insertCSS('fox');
        browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            if (request.action === 'updating') {
                updateCSS(request.css);
                updating(request.path)
            }
        });
    }
    initArrives();
}


var getOptions = new Promise(function (resolve) {
    if (isWebExt) {
        browser.storage.local.get(function (items) {
            Object.assign(options, items);
            resolve();
        });
    } else {
        self.port.on('options', function (o) {
            Object.assign(options, o);
            resolve();
        })
    }
});

// Определение объекта Template
const Template = {
    l_ntf: document.createElement('li'),
    l_edit: document.createElement('a'),
    l_set: document.createElement('li'),
    l_srv: document.createElement('li'),
	
    ntf: `<a href="/feed?section=notifications" class="left_row" onclick="return nav.go(this, event, {noback: true, params: {_ref: 'left_nav'}});" onmouseover="TopNotifier.preload();"><span class="left_label inl_bl" data-oldvk-i18n="answers"></span><span class="left_count_wrap fl_r" id="oldvk-notify-wrap" onmouseover="TopNotifier.preload()" onmousedown="return TopNotifier.onBellMouseDown(event)" onclick="event.stopPropagation();TopNotifier.setCount('',true);return TopNotifier.onBellClick(event)"><span class="inl_bl left_count" id="oldvk-notify"></span></span></a>`,
    sett: `<a href="/settings" class="left_row"><span class="left_label inl_bl" id="oldvk-settings" data-oldvk-i18n="settings"></span></a>`,
    top_menu: `<div class="head_nav_item fl_r"><a id="oldvk_top_exit" class="top_nav_link" href="" onclick="if (checkEvent(event) === false) { window.Notifier && Notifier.lcSend('logged_off'); location.href = this.href; return cancelEvent(event); }" onmousedown="tnActive(this)"><div class="top_profile_name"></div></a></div><div class="head_nav_item fl_r"><a id="oldvk_top_help" class="top_nav_link" href="/support?act=home" onclick="return TopMenu.select(this, event);"><div class="top_profile_name"></div></a></div><div class="head_nav_item fl_r"><a id="oldvk_top_music" class="top_nav_link" href="" onclick="return (checkKeyboardEvent(event) ? AudioUtils.getLayer().toggle() : false);" onmouseover="AudioLayer.prepare()" onmousedown="return (checkKeyboardEvent(event) ? false : AudioUtils.getLayer().toggle(),cancelEvent(event))"><div class="top_profile_name" data-oldvk-i18n="music"></div><div id="oldvk_top_play" class="oldvk-hide" onclick="cancelEvent(event); if (getAudioPlayer().isPlaying()) {getAudioPlayer().pause(); removeClass(this,'active')} else {getAudioPlayer().play(); addClass(this,'active')}" onmousedown="cancelEvent(event);"></div></a></div><div class="head_nav_item fl_r"><a id="oldvk_top_apps" class="top_nav_link" href="/apps" onclick="return TopMenu.select(this, event);"><div class="top_profile_name" data-oldvk-i18n="games"></div></a></div><div class="head_nav_item fl_r"><a id="oldvk_top_communities" class="top_nav_link" href="/search?c[section]=communities" onclick="return TopMenu.select(this, event);"><div class="top_profile_name" data-oldvk-i18n="communities"></div></a></div><div class="head_nav_item fl_r"><a id="oldvk_top_peoples" class="top_nav_link" href="/search?c[section]=people" onclick="return TopMenu.select(this, event);"><div class="top_profile_name" data-oldvk-i18n="people"></div></a></div>`
};

document.addEventListener('DOMContentLoaded', function() {
    function setTitle(element) {
        element.title = element.textContent || element.innerText;
    }

    var player = document.getElementById('top_audio_player');
    if (player) {
        player.parentNode.removeChild(player);
        document.body.appendChild(player);
    }

    // Находим и обрабатываем элементы с классом "top_audio_player_title"
    var titleElements = document.querySelectorAll('.top_audio_player_title');
    titleElements.forEach(function(title) {
        setTitle(title);
    });

    // Находим и обрабатываем элементы с классом "top_audio_player_title_next"
    var nextTitleElements = document.querySelectorAll('.top_audio_player_title_next');
    nextTitleElements.forEach(function(title) {
        setTitle(title);
    });

    // Находим и обрабатываем элемент с классом "top_audio_player_artist"
    var artist = document.querySelector('.top_audio_player_artist a');
    if (artist) {
        setTitle(artist);
    }
});




var getHead = new Promise(function (resolve) {
    KPP.head(function () {
        resolve();
    })
});

Promise.all([getOptions, getHead]).then(function () {
        if (options.enabled)
            init()
    }
);

window.addEventListener('message', function (event) {
    switch (event.data.type) {
        case 'VK_INFO':
            lang = event.data.text.lang;
            if (!langMap.hasOwnProperty(lang))
                lang = 3;
            document.documentElement.setAttribute('lang', langMap[lang]);
            LocalizedContent.init();
            break;
        case 'VK_EMOJI':
            emoji = event.data.text;
            break;
        case 'PUSH_URL':
            checkCSS(styles, event.data.text);
            initWide();
            break;
        case 'RELOAD_VK_TOP':
            LocalizedContent.init();
            break;
        case 'SAVE_OPTION':
            if (isWebExt)
                browser.storage.local.set(event.data.opt);
            else
                self.port.emit('local', event.data.opt);
            break;
    }
});

function insertCSS(style) {
    var css = browser.runtime.getURL('content/' + style + '.css');
    if (!document.getElementById('oldvk-style-' + style)) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = css;
        link.id = 'oldvk-style-' + style;
        insertAfter(document.head, link);
    }
}

function updateCSS(Styles) {
    for (var style in Styles) {
        if (Styles.hasOwnProperty(style) && Styles[style]) document.head.classList.add('oldvk-' + style);
        else document.head.classList.remove('oldvk-' + style);
    }
}

function checkCSS(styles) {
    var Styles = {};
    var url = document.createElement('a');
    url.href = window.location.href;
    var path = url.pathname.slice(1);
    styles.forEach(function (style) {
        var apply = path.startsWith(style.match);
        Styles[style.css] = Styles[style.css] || apply
    });
    updateCSS(Styles)
}

function headOptions() {
    if (options.optionAudio)
        document.head.classList.add('oldvk-option-audio');

    if (options.optionDate)
        document.head.classList.add('oldvk-option-date');

    if (options.optionFont)
        document.head.classList.add('oldvk-largefont');

    //if (options.optionIm)
       // document.head.classList.add('oldvk-im');
    // NY
    //document.head.classList.add('oldvk-ny-' + getRandomInt(1, 19).toString())
	// NY-martha
    //document.head.classList.add('oldvk-8_martha-' + getRandomInt(1, 8).toString());
	// NY-XB
    //document.head.classList.add('oldvk-XB-' + getRandomInt(1, 6).toString());
	// NY-birth_day_vk
    //document.head.classList.add('oldvk-birth_day_vk-' + getRandomInt(1, 5).toString());
	// NY1
    document.head.classList.add('oldvk-ny-' + getRandomInt(20, 21).toString());
    if (options.optionDark) {
        insertCSS('dark')
    }
	// NY2
    document.head.classList.add('oldvk-ny-' + getRandomInt(20, 21).toString());
    if (options.optionPoster) {
        insertCSS('poster')
    }
	// NY3
    document.head.classList.add('oldvk-ny-' + getRandomInt(20, 21).toString());
    if (options.optionStories) {
        insertCSS('stories')
    }
	// NY4
    document.head.classList.add('oldvk-ny-' + getRandomInt(20, 21).toString());
    if (options.optionViews) {
        insertCSS('views')
    }
	// NY5
	document.head.classList.add('oldvk-ny-' + getRandomInt(20, 21).toString());
    if (options.optionWall) {
        insertCSS('wall')
    }
	// NY6
	document.head.classList.add('oldvk-ny-' + getRandomInt(20, 21).toString());
    if (options.optionAudio_page__shuffle_all) {
        insertCSS('audio_page__shuffle_all')
    }
	// NY7
	document.head.classList.add('oldvk-ny-' + getRandomInt(20, 21).toString());
    if (options.optionUi_rmenu_unread) {
        insertCSS('ui_rmenu_unread')
    }
	// NY8
	document.head.classList.add('oldvk-ny-' + getRandomInt(20, 21).toString());
    if (options.optionPost_replies_reorder_wrap) {
        insertCSS('post_replies_reorder_wrap')
    }
	// NY9
	document.head.classList.add('oldvk-ny-' + getRandomInt(20, 21).toString());
    if (options.optionUi_tab_search_wrap) {
        insertCSS('ui_tab_search_wrap')
    }
	// NY10
	document.head.classList.add('oldvk-ny-' + getRandomInt(20, 21).toString());
    if (options.optionRed_sovets_classic) {
        insertCSS('red_sovets_classic')
    }
	// NY11
	document.head.classList.add('oldvk-ny-' + getRandomInt(20, 21).toString());
    if (options.optionNy_gerland) {
        insertCSS('ny_gerland')
    }
	// NY12
	document.head.classList.add('oldvk-ny-' + getRandomInt(20, 21).toString());
    if (options.optionSnowflakes) {
        insertCSS('Snowflakes')
    }
}
var LocalizedContent = {
    l_ntf: document.createElement('li'),
    l_edit: document.createElement('a'),
    l_set: document.createElement('li'),

    init: function () {
        this.l_ntf.id = 'l_ntf';
        this.l_ntf.innerHTML = '<a href="/feed?section=notifications" class="LeftMenuItem-module__item--dDdjm" onclick="return nav.go(this, event, {noback: true, params: {_ref: \'left_nav\'}});" onmouseover="TopNotifier.preload();"><span class="LeftMenuItem-module__label--itYtZ">' + i18n.answers[lang] + '</span><span class="left_count_wrap fl_r" id="oldvk-notify-wrap" onmouseover="TopNotifier.preload()" onmousedown="return TopNotifier.onBellMouseDown(event)" onclick="event.stopPropagation();TopNotifier.setCount(\'\',true);return TopNotifier.onBellClick(event)"><span class="inl_bl left_count" id="oldvk-notify"></span></span></a>';

        this.l_edit.id = 'l_edit';
        this.l_edit.classList.add('fl_r');
        this.l_edit.href = '/edit';
        this.l_edit.textContent = i18n.edit[lang];

        this.l_set.id = 'l_sett';
        this.l_set.innerHTML = '<a href="/settings" class="left_row"><span class="left_label inl_bl" id="oldvk-settings">' + i18n.settings[lang] + '</span></a>';

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired');

    function addTopMenu() {
        var top_nav = document.getElementById('top_nav');
        if (top_nav && !document.getElementById('oldvk_top_menu')) {
            var top_menu = `
                <div class="head_nav_item fl_r"><a id="oldvk_top_exit" class="top_nav_link" href="" onclick="if (checkEvent(event) === false) { window.Notifier && Notifier.lcSend('logged_off'); location.href = this.href; return cancelEvent(event); }" onmousedown="tnActive(this)"><div class="top_profile_name"></div></a></div>
                <div class="head_nav_item fl_r"><a id="oldvk_top_help" class="top_nav_link" href="/support?act=home" onclick="return TopMenu.select(this, event);"><div class="top_profile_name"></div></a></div>
                <div class="head_nav_item fl_r"><a id="oldvk_top_music" class="top_nav_link" href="" onclick="return (checkKeyboardEvent(event) ? AudioUtils.getLayer().toggle() : false);" onmouseover="AudioLayer.prepare()" onmousedown="return (checkKeyboardEvent(event) ? false : AudioUtils.getLayer().toggle(),cancelEvent(event))"><div class="top_profile_name">${i18n.music[lang]}</div><div id="oldvk_top_play" class="oldvk-hide" onclick="cancelEvent(event); if (getAudioPlayer().isPlaying()) {getAudioPlayer().pause(); removeClass(this,'active')} else {getAudioPlayer().play(); addClass(this,'active')}" onmousedown="cancelEvent(event);"></div></a></div>
                <div class="head_nav_item fl_r"><a id="oldvk_top_apps" class="top_nav_link" href="/apps" onclick="return TopMenu.select(this, event);"><div class="top_profile_name">${i18n.games[lang]}</div></a></div>
                <div class="head_nav_item fl_r"><a id="oldvk_top_communities" class="top_nav_link" href="/search?c[section]=communities" onclick="return TopMenu.select(this, event);"><div class="top_profile_name">${i18n.communities[lang]}</div></a></div>
                <div class="head_nav_item fl_r"><a id="oldvk_top_peoples" class="top_nav_link" href="/search?c[section]=people" onclick="return TopMenu.select(this, event);"><div class="top_profile_name">${i18n.people[lang]}</div></a></div>
            `;

            var oldvk_top_menu = document.createElement('div');
            oldvk_top_menu.id = "oldvk_top_menu";
            oldvk_top_menu.innerHTML = top_menu;
            console.log('Top menu created');
            top_nav.appendChild(oldvk_top_menu);

            var oldvk_top_exit = document.getElementById('oldvk_top_exit');
            var top_logout_link = document.getElementById('top_logout_link');
            if (oldvk_top_exit && top_logout_link) {
                oldvk_top_exit.firstElementChild.textContent = top_logout_link.textContent.toLowerCase();
                oldvk_top_exit.href = top_logout_link.href;
            }

            var oldvk_top_help = document.getElementById('oldvk_top_help');
            var top_support_link = document.getElementById('top_support_link');
            if (oldvk_top_help && top_support_link) {
                oldvk_top_help.firstElementChild.textContent = top_support_link.textContent.toLowerCase();
            }

            var oldvk_top_music = document.getElementById('oldvk_top_music');
            var top_audio_layer_place = document.getElementById('top_audio_layer_place');
            if (oldvk_top_music && top_audio_layer_place) {
                insertAfter(oldvk_top_music, top_audio_layer_place);
            }
        }
    }

    setInterval(addTopMenu, 500); // Regular check every half second to re-add the menu if it’s missing

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    KPP.add('#top_profile_menu', function () {
        KPP.remove('#top_profile_menu');
        setTimeout(addTopMenu, 1000); // Add a delay to ensure elements are loaded
    });

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                setTimeout(addTopMenu, 500); // Add a delay to ensure elements are loaded
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});



    },
    updateMenu: function () {
        console.log('updateMenu');
        if (!document.getElementById('l_ntf'))
            insertAfter(document.getElementById('l_nwsf'), this.l_ntf);
        if (!document.getElementById('l_edit')) {
            var l_edit_parent = document.querySelector('#l_pr a.left_row');
            l_edit_parent.appendChild(this.l_edit)
        }
        if (!document.getElementById('l_sett')) {
            if (document.getElementById('l_fav'))
                insertAfter(document.getElementById('l_fav'), this.l_set);
            else
                insertAfter(document.getElementById('l_ntf'), this.l_set);
        }


        var ap = document.querySelector('#l_ap .vkitLeftMenuItem__label--lndW2')
        var aud = document.querySelector('#l_aud .vkitLeftMenuItem__label--lndW2')
        var vid = document.querySelector('#l_vid .vkitLeftMenuItem__label--lndW2')
        var gr = document.querySelector('#l_gr .vkitLeftMenuItem__label--lndW2')
        var msg = document.querySelector('#l_msg .vkitLeftMenuItem__label--lndW2')
        var vid_row = document.querySelector('#l_vid .left_row')

        if (ap) ap.textContent = i18n.apps[lang];
        if (aud) aud.textContent = i18n.audios[lang];
        if (vid) vid.textContent = i18n.videos[lang];
        if (gr) gr.textContent = i18n.groups[lang];
        if (msg) msg.textContent = i18n.messages[lang];
        if (vid_row) vid_row.setAttribute('href', '/videos');
        LocalizedContent.updateNotify()
    },
    updateNotify: function () {
        var notifyCount = parseInt(document.getElementById('top_notify_count').textContent, 10);
        if (notifyCount > 0) {
            document.getElementById('oldvk-notify-wrap').classList.add('has_notify');
            document.getElementById('oldvk-notify').textContent = notifyCount.toString()
        }
    },
    l10n: function (key, callback) {
        if (typeof lang !== 'undefined') {
            callback(i18n[key][lang])
        } else {
            setTimeout(function () {
                LocalizedContent.l10n(key, callback)
            }, 0);
        }
    }
};

function initArrives() {

    // KPP.add('#top_nav', function (element) {

    KPP.add('.LeftMenuOld-module__container--G1UQ7', function () {
        LocalizedContent.updateMenu();
    });

    // Обложка страниц и аватарки

    KPP.add('.page_cover', function (element) {
        if (options.optionCover) {
            element.classList.add('adapted')
        } else {
            var page_actions = document.getElementsByClassName('group_actions_wrap')[0];
            var nc = document.getElementById('narrow_column');
            var page_block = document.createElement('div');
            page_block.className = 'page_block page_photo';
            page_block.innerHTML = '<div class="page_avatar_wrap"><div class="page_avatar" id="page_avatar"></div></div>';
            page_block.appendChild(page_actions);
            var page_avatar_a = document.getElementsByClassName('page_cover_image')[1];
            page_avatar_a.className = '';
            page_avatar_a.firstElementChild.className = 'page_avatar_img';
            if (page_avatar_a.hasAttribute('onclick')) {
                var temp = eval('(' + page_avatar_a.getAttribute('onclick').match(/{.*}/)[0] + ')').temp;
                page_avatar_a.firstElementChild.setAttribute('src', temp.base + temp.x_[0] + '.jpg');
            }
            nc.insertBefore(page_block, nc.firstChild);
            document.getElementById('page_avatar').appendChild(page_avatar_a)
        }
    });

    KPP.add('#friends', function (element) {
        var urr = document.getElementById('ui_rmenu_requests');
        if (urr) {
            urr.className = 'ui_tab';
            var ftr = document.createElement('li');
            ftr.id = 'friends_tab_requests';
            urr.setAttribute('onclick', urr.getAttribute('onclick').replace('Menu', 'Tab'));
            ftr.appendChild(urr);
            if (document.getElementById('friends_tab_online')) insertAfter(document.getElementById('friends_tab_online'), ftr);
            if (element.classList.contains('friends_requests')) {
                urr.classList.add('ui_tab_sel');
                document.getElementById('friends_tab_all').firstElementChild.classList.remove('ui_tab_sel')
            }
        }
        if (document.getElementsByClassName('ui_search_fltr')[0]) document.getElementsByClassName('ui_search_fltr')[0].appendChild(document.getElementsByClassName('ui_rmenu')[0]);
        else document.getElementsByClassName('ui_rmenu')[0].parentNode.removeChild(document.getElementsByClassName('ui_rmenu')[0]);
        if (document.getElementById('friends_tabs_wrap')) {
            document.getElementById('friends_tabs_wrap').appendChild(document.getElementById('friends_list_edit_btn'));
            document.getElementById('friends_tabs_wrap').appendChild(document.getElementById('friends_list_delete_btn'));
            var urs = document.createElement('div');
            urs.className = 'ui_rmenu_sep';
            if (document.getElementById('ui_rmenu_lists_list')) document.getElementById('ui_rmenu_lists_list').insertBefore(urs, document.getElementsByClassName('friends_create_list')[0])
        } else {
            insertAfter(element.firstElementChild, document.getElementById('friends_import_block'));
            var uhes = document.getElementsByClassName('ui_header_ext_search')[0];
            document.getElementById('friends_import_block').appendChild(uhes);
            uhes.className = 'friends_import_row clear_fix';
            var fie = document.createElement('div');
            fie.className = 'friends_import_icon friends_import_extended';
            var fic = document.createElement('div');
            fic.className = 'friends_import_cont';
            var fih = document.createElement('div');
            fih.className = 'friends_import_header';
            fih.textContent = uhes.textContent;
            fic.appendChild(fih);
            uhes.appendChild(fie);
            uhes.appendChild(fic);
            uhes.firstChild.textContent = '';
            var fta = document.createElement('div');
            fta.id = 'friends_tab_all';
            var fta_a = document.createElement('a');
            fta_a.className = 'ui_tab';
            fta_a.href = '/friends?section=all';
            LocalizedContent.l10n('all_friends', function (a) {
                fta_a.textContent = a
            });
            fta.appendChild(fta_a);
            var ft_w = document.createElement('div');
            ft_w.className = 'friends_tabs_wrap ui_tabs_header ui_tabs';
            element.insertBefore(ft_w, document.getElementById('friends_import_header'));
            ft_w.appendChild(fta);
            ft_w.appendChild(document.getElementById('friends_import_header'));
            element.insertBefore(document.getElementById('friends_filters_header'), document.getElementById('results'));
            var sqw = document.getElementById('search_query_wrap');
            if (sqw) var ffb_top = sqw.clientHeight + sqw.offsetTop;
            var ffb = document.getElementById('friends_filters_block');
            if (ffb && ffb_top) ffb.style.top = ffb_top + 'px';
        }
    });

    KPP.add('.im-chat-input--textarea', function (chat) {
        var emoji_div = document.createElement('div');
        emoji_div.id = 'oldvk-emoji';
        chat.appendChild(document.getElementsByClassName('im-chat-input--send')[0]);
        chat.appendChild(document.getElementsByClassName('im-chat-input--selector')[0]);
        wait(function () {
            return emoji
        }, function () {
            emoji_div.innerHTML = emoji.html.map(function (e, i) {
                return '<a class="emoji_smile_cont" onmousedown="Emoji.addEmoji(Emoji.last - 1,\'' + emoji.emoji[i] + '\', this); return cancelEvent(event);" onclick="return cancelEvent(event);" onmouseover="return Emoji.emojiOver(Emoji.last - 1, this, true);">' + e + '</a>'
            }).join('');
            chat.insertBefore(emoji_div, document.getElementsByClassName('im-chat-input--selector')[0]);
        });
        var avatar1 = document.createElement('img');
        avatar1.src = document.getElementsByClassName('TopNavBtn__profileImg')[0].src;
        avatar1.className = 'oldvk-chat-avatar';
        chat.parentNode.insertBefore(avatar1, chat);

        KPP.add('.im-page--aside-photo .nim-peer--photo', function (element) {
            var avatars = element.getElementsByTagName('img');
            var i;
            var tmp = chat.parentNode.getElementsByClassName('oldvk-chat-avatar-wrap');
            for (i = tmp.length; i--;) {
                tmp[i].remove();
            }
            tmp = chat.parentNode.getElementsByClassName('oldvk-chat-avatar-2');
            for (i = tmp.length; i--;) {
                tmp[i].remove();
            }

            var wrap = document.createElement('div');
            wrap.className = 'oldvk-chat-avatar-wrap';
            if (avatars.length === 2)
                wrap.classList.add('wide');

            for (i = avatars.length; i--;) {
                avatars[i].className = 'oldvk-chat-avatar-2' + ' oldvk-chat-avatar' + (avatars.length >= 3 ? '-small' : '');
                wrap.appendChild(avatars[i].cloneNode(false))
            }

            insertAfter(chat, wrap);

            if (avatars.length === 1 && document.getElementsByClassName('_im_page_peer_online')[0].textContent === 'online')
                wrap.classList.add('online');

            var iphm = document.getElementsByClassName('im-page--header-more');
            var iphc = document.getElementsByClassName('im-page--header-call');
            var ipchi = document.getElementsByClassName('im-page--chat-header-in');
            if (iphm.length > 0)
                document.getElementsByClassName('im-page--chat-header')[0].insertBefore(iphm[0], ipchi[0])
            if (iphc.length > 0)
                document.getElementsByClassName('im-page--chat-header')[0].insertBefore(iphc[0], ipchi[0])
        });

        if (!options.optionIm) {
            var ipma = document.querySelectorAll('.im-page--mess-actions .im-page-action');
            [].map.call(ipma, function (item) {
                item.classList.add('flat_button')
            });
            document.getElementsByClassName('im-page-action_delete')[0].textContent = i18n.delete[lang];
            document.getElementsByClassName('im-page-action_spam')[0].textContent = i18n.spam[lang];
        }
    });

    KPP.add('body:not(.blog_page) #ui_rmenu_news_list', function (element) {
        var ont = document.createElement('ul');
        ont.id = 'oldvk-news-tabs';
        ont.className = 'ui_tabs ui_tabs_header clear_fix';
        var urn = document.getElementById('ui_rmenu_news');
        var urc = document.getElementById('ui_rmenu_comments');
        var urs = document.getElementById('ui_rmenu_search');
        urn.classList.add('ui_tab');
        urc.classList.add('ui_tab');
        urs.classList.add('ui_tab');
        var tmp = element.parentNode.getElementsByClassName('ui_rmenu_item');
        for (var i = tmp.length; i--;) tmp[i].setAttribute('onclick', 'newsMenuTabs(this);' + tmp[i].getAttribute('onclick'));
        tmp = element.parentNode.getElementsByClassName('ui_rmenu_subitem');
        for (i = tmp.length; i--;) tmp[i].setAttribute('onclick', 'newsMenuTabs(this);' + tmp[i].getAttribute('onclick'));
        ont.appendChild(urn);
        ont.appendChild(urc);
        ont.appendChild(urs);
        element.parentNode.parentNode.insertBefore(ont, element.parentNode);
        var urnl = document.getElementById('ui_rmenu_news_list');
        urnl.appendChild(document.getElementById('ui_rmenu_recommended'));
        //urnl.appendChild(document.getElementById('ui_rmenu_articles'));
        if (!(urn.classList.contains('ui_rmenu_item_sel') || document.querySelector('#ui_rmenu_news_list .ui_rmenu_item_sel'))) element.parentNode.classList.add('unshown');
        var fali = document.getElementById('feed_add_list_icon');
        fali.classList.add('ui_rmenu_subitem');
        urnl.insertBefore(fali, urnl.firstChild);
        var spb = document.getElementById('submit_post_box');
        if (spb) document.getElementById('feed_filters').parentNode.insertBefore(spb, document.getElementById('feed_filters'));
    });

    KPP.add('#ui_rmenu_communities_list', function (element) {
        element.parentNode.appendChild(element);
        document.getElementById('ui_rmenu_communities').addEventListener('click', function () {
            setTimeout(function () { // TODO: Найти лучшее решение
                document.getElementById('ui_rmenu_communities_list').style.display = 'block'
            }, 200)
        })
    });

    KPP.add('#search_filters_block', function (element) {
        var fl = document.createElement('div');
        fl.id = 'oldvk-filter-label';
        element.parentNode.insertBefore(fl, document.getElementById('search_filters_block'))
    });

KPP.add('#wrap3', function (element) {
    console.log("KPP function executed");

    // Хранилище для последнего времени онлайн
    var lastOnlineTime = {};

    // Словарь переводов
    var translations = {
        "заходил": {
            "en": "last seen",
            "es": "última vez visto",
            "fr": "vu pour la dernière fois",
            "de": "zuletzt gesehen",
            // Добавьте другие языки здесь
        },
        "заходила": {
            "en": "last seen",
            "es": "última vez vista",
            "fr": "vue pour la dernière fois",
            "de": "zuletzt gesehen",
            // Добавьте другие языки здесь
        },
        "заходил(а)": {
            "en": "last seen",
            "es": "última vez visto(a)",
            "fr": "vu(e) pour la dernière fois",
            "de": "zuletzt gesehen",
            // Добавьте другие языки здесь
        },
        "назад": {
            "en": "ago",
            "es": "hace",
            "fr": "il y a",
            "de": "vor",
            // Добавьте другие языки здесь
        }
    };

    // Словарь преобразований сокращений
    var timeTranslations = {
        "д": {
            "ru": "день",
            "en": "day",
            "es": "día",
            "fr": "jour",
            "de": "Tag",
            // Добавьте другие языки здесь
        },
        "ч": {
            "ru": "час",
            "en": "hour",
            "es": "hora",
            "fr": "heure",
            "de": "Stunde",
            // Добавьте другие языки здесь
        },
        "мин": {
            "ru": "минута",
            "en": "minute",
            "es": "minuto",
            "fr": "minute",
            "de": "Minute",
            // Добавьте другие языки здесь
        },
        "с": {
            "ru": "секунда",
            "en": "second",
            "es": "segundo",
            "fr": "seconde",
            "de": "Sekunde",
            // Добавьте другие языки здесь
        }
    };

    function modifyPage() {
        var ownerPageName = $('#owner_page_name');
        if (ownerPageName.length > 0 && !ownerPageName.hasClass('processed')) {
            ownerPageName.addClass('processed'); // Помечаем элемент, чтобы избежать повторной обработки
            var ownerPageText = ownerPageName.text().replace("онлайн", "");
            $('#header_name').text(ownerPageText);
            // Обновляем информацию о времени последнего онлайн-посещения
            var lastOnlineDiv = $('#last_online_time');
            updateLastOnlineTime(lastOnlineDiv[0], ownerPageText);
        }
    }

    function insertProfileTitle() {
        // Проверяем, существует ли уже oldvk_profile_title, чтобы не добавлять повторно
        if (document.getElementById('oldvk_profile_title')) {
            console.log("oldvk_profile_title уже существует");
            return;
        }

        var ownerPageName = document.getElementById('owner_page_name');
        
        if (ownerPageName) {
            console.log("OwnerPageName элемент найден: ", ownerPageName.textContent);
            var firstName = ownerPageName.childNodes[0] ? ownerPageName.childNodes[0].textContent.trim() : "";
            var lastNameElement = ownerPageName.querySelector('.OwnerPageName__noWrapText');
            var lastName = lastNameElement ? lastNameElement.textContent.trim() : "";
            var cleanText = firstName + " " + lastName;

            // Создаем элемент oldvk_profile_title
            var title = document.createElement('div');
            title.id = 'oldvk_profile_title';
            title.textContent = cleanText;
            console.log("Title content: ", title.textContent);
            
            // Перемещаем элементы с классом ProfileIndicatorBadge__badge внутрь oldvk_profile_title
            var badges = document.querySelectorAll('.ProfileIndicatorBadge__badgeOnline, .ProfileIndicatorBadge__badgeOnlineMobile');
            badges.forEach(function(badge) {
                title.appendChild(badge.cloneNode(true));
                badge.remove(); // Удаляем элемент из исходного места
            });

            var wrapElement = document.getElementById('wrap3');
            if (wrapElement) {
                console.log("Wrap element найден");
                wrapElement.insertBefore(title, wrapElement.firstChild);
                console.log("Title element вставлен");
            } else {
                console.log("Wrap element не найден");
            }

            // Добавляем элемент для отображения времени последнего онлайн-посещения
            var lastOnlineDiv = document.createElement('div');
            lastOnlineDiv.id = 'last_online_time';
            updateLastOnlineTime(lastOnlineDiv, cleanText);
            title.appendChild(lastOnlineDiv);
        } else {
            console.log("OwnerPageName элемент не найден или уже обработан");
        }
    }

    function getGender(profileName) {
        var ownerPageName = document.getElementById('owner_page_name');
        if (ownerPageName) {
            var ownerPageText = ownerPageName.textContent.trim();
            if (ownerPageText.includes('заходила')) {
                return 'female';
            } else if (ownerPageText.includes('заходил')) {
                return 'male';
            }
        }
        return 'unknown';
    }

    function getLanguage() {
        // Возвращаем текущий язык страницы
        return document.documentElement.lang || "ru"; // По умолчанию русский
    }

    function translateWord(word, lang) {
        return translations[word] && translations[word][lang] ? translations[word][lang] : word;
    }

    function translateTimeUnit(unit, lang) {
        return timeTranslations[unit] && timeTranslations[unit][lang] ? timeTranslations[unit][lang] : unit;
    }

    function updateLastOnlineTime(element, profileName) {
        var lastSeenElement = document.querySelector('.ProfileIndicatorBadge__badgeLastSeenWrapper');
        var gender = getGender(profileName);
        var pronoun;

        if (gender === "female") {
            pronoun = "заходила";
        } else if (gender === "male") {
            pronoun = "заходил";
        } else {
            pronoun = "заходил(а)";
        }

        var onlineElement = document.querySelector('.ProfileIndicatorBadge__badgeOnline, .ProfileIndicatorBadge__badgeOnlineMobile');

        if (onlineElement) {
            element.textContent = ""; // Если человек онлайн, не отображаем сообщение о последнем посещении
        } else if (lastSeenElement) {
            var lastSeenTime = lastSeenElement.textContent.trim();
            // Перевод времени на полные слова
            var detailedTime = lastSeenTime
                .replace(/\b(\d+) д\b/g, function(match, p1) { return p1 + " " + translateTimeUnit("d", getLanguage()); })
                .replace(/\b(\d+) ч\b/g, function(match, p1) { return p1 + " " + translateTimeUnit("h", getLanguage()); })
                .replace(/\b(\д+) мин\b/g, function(match, p1) { return p1 + " " + translateTimeUnit("m", getLanguage()); })
                .replace(/\b(\д+) с\b/g, function(match, p1) { return p1 + " " + translateTimeUnit("s", getLanguage()); });

            var translatedPronoun = translateWord(pronoun, getLanguage());
            var translatedAgo = translateWord("назад", getLanguage());
            element.textContent = `${translatedPronoun} ${detailedTime} ${translatedAgo}`;
            // Обновляем запись времени в lastOnlineTime
            lastOnlineTime[profileName] = new Date().getTime();
        } else if (lastOnlineTime[profileName]) {
            var lastOnlineDate = new Date(lastOnlineTime[profileName]);
            var currentYear = new Date().getFullYear();
            var formattedDate;

            if (lastOnlineDate.getFullYear() === currentYear) {
                formattedDate = lastOnlineDate.toLocaleString(getLanguage(), {
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } else {
                formattedDate = lastOnlineDate.toLocaleString(getLanguage(), {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }

            element.textContent = `${translatedPronoun} ${formattedDate}`;
        } else {
            element.textContent = "был давно"; // Сообщение, если информации нет
        }
    }

    function observeMutations() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && (node.matches('.ProfileWrapper') || node.querySelector('.ProfileWrapper'))) {
                        console.log("Новый ProfileWrapper найден");
                        setTimeout(insertProfileTitle, 500); // Добавляем небольшой тайм-аут
                    }
                });

                mutation.removedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && (node.matches('.ProfileIndicatorBadge__badgeOnline') || node.matches('.ProfileIndicatorBadge__badgeOnlineMobile'))) {
                        console.log("Статус онлайн изменился на оффлайн");
                        // Сохраняем время последнего онлайн-посещения
                        var ownerPageName = document.getElementById('owner_page_name');
                        if (ownerPageName) {
                            var firstName = ownerPageName.childNodes[0] ? ownerPageName.childNodes[0].textContent.trim() : "";
                            var lastNameElement = ownerPageName.querySelector('.OwnerPageName__noWrapText');
                            var lastName = lastNameElement ? lastNameElement.textContent.trim() : "";
                            var cleanText = firstName + " " + lastName;
                            lastOnlineTime[cleanText] = Date.now();
                        }
                        updateLastOnlineTime(document.getElementById('last_online_time'));
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM полностью загружен и разобран");

        // Проверка начального наличия элемента
        insertProfileTitle();

        // Наблюдаем за изменениями в DOM
        observeMutations();
    });

    // Проверка каждые 500 мс до тех пор, пока не найдем элемент или не истечет время
    var checkInterval = setInterval(function() {
        var ownerPageName = document.getElementById('owner_page_name');
        if (ownerPageName) {
            clearInterval(checkInterval); // Останавливаем таймер после нахождения элемента
            insertProfileTitle();
        } else {
            console.log("OwnerPageName элемент не найден, пробуем снова...");
        }
    }, 500);

    // Прекращаем проверку через 10 секунд
    setTimeout(function() {
        clearInterval(checkInterval);
    }, 10000);
});



KPP.add('#profile_wall, #public_wall, #group_wall', function (element) {
    var spb = document.getElementById('submit_post_box');
    if (spb) insertAfter(element.firstElementChild, spb);
});

KPP.add('#profile .page_extra_actions_wrap .page_actions_inner', function (element) {
    document.getElementsByClassName('page_actions_cont')[0].style.display = 'none';
    document.getElementsByClassName('narrow_column_wrap')[0].appendChild(element);
    var psgb = document.getElementById('profile_send_gift_btn');
    var pgsb = document.getElementById('profile_gift_send_btn');
    if (psgb && !pgsb) {
        psgb.className = 'page_actions_item';
        psgb.textContent = psgb.getElementsByClassName('profile_side_text')[0].textContent;
        element.insertBefore(psgb, element.firstChild);
    }
});

KPP.add('.people_cell_name a', function (element) {
    var br = document.createElement('br');
    var span = document.createElement('span');
    span.textContent = decodeHtml(element.parentNode.parentNode.querySelector('img').alt.split(' ').pop());
    element.appendChild(br);
    element.appendChild(span);
});

function getFirstPhotoRow(pr) {
    if (!pr.previousElementSibling || pr.previousElementSibling.classList.contains('photos_period_delimiter'))
        return pr;
    else return getFirstPhotoRow(pr.previousElementSibling);
}

KPP.add('.photos_row', function (element) {
    if (document.getElementsByClassName('photos_period_delimiter').length > 0 || document.getElementsByClassName('photos_row_wrap').length > 0) {
        getFirstPhotoRow(element.parentElement).appendChild(element);
    }
});

if (!options.optionViewer) {
    KPP.add('.pe_canvas', function (element) {
        element.style.marginTop = element.parentNode.firstChild.offsetTop + 'px';
        element.style.marginLeft = element.parentNode.firstChild.offsetLeft + 'px';
        document.getElementsByClassName('pv_cont')[0].style.paddingLeft = '0';
    });
}

KPP.add('.im-page--members', function () {
    var ipch = document.querySelectorAll('.im-page--members');
    if (ipch.length > 0)
        for (var i = 1; i < ipch.length; i++)
            ipch[i].remove();
    document.getElementsByClassName('im-page--chat-header')[0].appendChild(ipch[0]);
});

KPP.add('#ui_rmenu_members_list', function (urml) {
    var urel = document.getElementById('ui_rmenu_edit_list');
    urel.parentNode.appendChild(urel);
    urml.parentNode.appendChild(urml);
});

KPP.add('#ui_rmenu_arhive', function (ura) {
    var urel = document.getElementById('ui_rmenu_news');
    insertAfter(urel, ura);
});

KPP.add('.im-right-menu', function (irm) {
    var ian = irm.getElementsByClassName('im-aside-notice');
    var ipd = document.getElementsByClassName('im-page--dialogs')[0];
    var id = document.getElementById('im_dialogs');
    if (ian.length > 0)
        for (var i = 0; i < ian.length; i++)
            ipd.insertBefore(ian[i], id);
    var igodn = document.getElementById('im-group-online-disabled-notice');
    if (igodn)
        ipd.insertBefore(igodn, id);
});





    // Перенос даты поста вниз

    if (!options.optionDate) {
        KPP.add('.post', function (post) {
            var pd = post.getElementsByClassName('post_date')[0];
            var wt = post.getElementsByClassName('wall_text')[0];
            var pfl = post.getElementsByClassName('post_full_like')[0];
            var lw = post.getElementsByClassName('like_wrap')[0];
            if (pd && pfl) {
                pfl.insertBefore(pd, pfl.firstElementChild);
                // pd.style.outline = '1px #F55 dashed'; // debug
            } else if (pd && wt) {
                if (lw)
                    lw.insertBefore(pd, lw.firstChild);
                else
                    wt.parentElement.appendChild(pd)
            }
        });

        KPP.add('.ShortVideoPost', function (post) {
            var pd = post.getElementsByClassName('ShortVideoPost__date')[0];
            var pw = post.getElementsByClassName('ShortVideoPost__widgets')[0];
            if (pd && pw) {
                pw.insertBefore(pd, pw.firstElementChild)
            }
        });
    }

    // Обработка изображений для расширения стены

    KPP.add('.wall_posts .page_post_sized_thumbs:not(.oldvk-thumb-narrow), .wall_posts .page_album_thumb_wrap:not(.oldvk-thumb-narrow)', function (thumb) {
        var top = thumb.getBoundingClientRect().top + document.documentElement.scrollTop;
        if (top < topStop) {
            var factor = thumb.matches('.wall_module:not(#profile_wall) .post_fixed .page_post_sized_thumbs, .wall_module:not(#profile_wall) .post_fixed .page_album_thumb_wrap') ? 0.77 : 0.66;
            if (thumb.matches('.replies_list_deep .page_post_sized_thumbs'))
                factor = 0.615;
            var narrow = thumb.cloneNode(true);
            narrow.classList.add('oldvk-thumb-narrow');
            insertAfter(thumb, narrow);
            resizeNarrow(narrow, factor + 0.01);
            thumb.classList.add('oldvk-thumb-wide');

            if (narrow.childElementCount > 0) {
                [].slice.call(narrow.children).forEach(function (child) {
                    if (child.tagName === 'A' || child.classList.contains('page_doc_photo'))
                        resizeNarrow(child, factor)
                })
            }
        }
    });

    KPP.add('.wall_posts .page_gif_large:not(.oldvk-thumb-narrow)', function (gif) {
        var top = gif.getBoundingClientRect().top + document.documentElement.scrollTop;
        if (top < topStop) {
            var factor = gif.matches('.wall_module:not(#profile_wall) .post_fixed .page_gif_large') ? 0.77 : 0.66;
            var narrow = gif.cloneNode(true);
            narrow.classList.add('oldvk-thumb-narrow');
            gif.parentElement.insertBefore(narrow, gif);
            resizeNarrow(narrow.getElementsByClassName('page_doc_photo')[0], factor);
            resizeNarrow(narrow.getElementsByClassName('page_doc_photo_href')[0], factor);
            gif.classList.add('oldvk-thumb-wide');
        }
    });

    // Пункт меню «Понравилось»

    KPP.add('#ui_rmenu_likes', function (likes) {
        var menu = document.getElementById('ui_rmenu_news_list');
        if (menu)
            menu.appendChild(likes)
    });
	
// Счетчик лайков для реакций

    KPP.add('.PostButtonReactions', function (reactions) {
        var count = reactions.dataset.reactionCounts;
        if (count && !(reactions.dataset.reactionButtonTextIsCounter)) {
            count = JSON.parse(count);
            if (!Array.isArray(count)) {
                count = Object.values(count)
            }
            var likes = count.reduce(function(previous, current) {
                return previous + current
            })
            reactions.getElementsByClassName('PostButtonReactions__title')[0].textContent = likes;
        }
        reactions.dataset.reactionButtonTextIsCounter = '1';

        var target = reactions.dataset.reactionTargetObject;
        if (target) {
            reactions.setAttribute('onmouseover','Likes.showLikes(this,\'' + target + '\')')
        }
    });
}
// Мои Аудизаписи

document.addEventListener('DOMContentLoaded', function() {
    function addClickListener() {
        var element = document.querySelector("li#l_aud");
        if (element && !element.dataset.listenerAdded) {
            console.log("Элемент найден, добавляем обработчик");
            element.addEventListener("click", function() {
                window.location.href = "/audio?section=all";
            });
            element.dataset.listenerAdded = "true"; // Помечаем, что обработчик добавлен
        } else {
            console.log("Элемент не найден или обработчик уже добавлен");
        }
    }

    // Используем MutationObserver для отслеживания изменений в DOM
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === "childList") {
                addClickListener();
            }
        });
    });

    // Начинаем наблюдение за изменениями в теле документа
    observer.observe(document.body, { childList: true, subtree: true });

    // Первоначальная попытка добавить обработчик
    addClickListener();

    // Периодическая проверка наличия элемента
    var intervalCheck = setInterval(function() {
        addClickListener();
        // Остановим интервал, если элемент найден и обработчик добавлен
        if (document.querySelector("li#l_aud") && document.querySelector("li#l_aud").dataset.listenerAdded) {
            clearInterval(intervalCheck);
        }
    }, 100);
});




function resizeNarrow(element, factor) {
    element.style.width = Math.floor(element.clientWidth * factor) + 'px';
    element.style.height = Math.floor(element.clientHeight * factor) + 'px';
    if (element.classList.contains('page_doc_photo_href')) {
        element.dataset.width = Math.floor(element.dataset.width * factor).toString();
        element.dataset.height = Math.floor(element.dataset.height * factor).toString();
    }
}

function updating(path) {
    switch (path) {
        case 'friends':
            window.postMessage({type: "UPD", text: path}, '*');
            break;
    }
}