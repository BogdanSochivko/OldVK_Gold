// ==UserScript==
// @name VK OLD 2.0 | PAGE FRIENDS (2026)
// @author Tolya
// @version 6.0.1
// @match *://vk.com/friends*
// @match *://vk.com/*
// @require https://code.jquery.com/jquery-3.6.4.min.js
// @grant none
// ==/UserScript==
(function ($) {
    'use strict';
    if (window.vkFriendsOld20Running) return;
    window.vkFriendsOld20Running = true;
    let cleanupTimeout = null;
    let targetUserId = null;
    let isOwnProfile = false;
    let ownerName = '';
    let itemsPerLoad = 15;
    let currentList = [];
    let filteredList = [];
    let displayedCount = 0;
    let isLoading = false;
    let currentSection = 'all';
    let currentRequestType = 'in';
    // ---------- очистка ----------
    function cleanup() {
        $('#friends_content, #my_custom_topnav, #under_nav').remove();
        $(window).off('scroll.vk_old_friends');
        $('#friends_tabs a').off('.vk_old_friends');
        $('#under_nav a').off('.vk_old_friends');
        $('#search_query').off('.vk_old_friends');
        $('#search_query_reset').off('.vk_old_friends');
        clearTimeout(cleanupTimeout);
    }
    // ---------- ожидание контейнера (как waitForElm) ----------
    function waitForElm(selector, timeoutMs = 10000) {
        return new Promise((resolve, reject) => {
            const el = document.querySelector(selector);
            if (el) return resolve(el);
            if (!document.body) {
                reject(new Error('document.body не готов'));
                return;
            }
            const observer = new MutationObserver(() => {
                const el = document.querySelector(selector);
                if (el) {
                    observer.disconnect();
                    resolve(el);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
            setTimeout(() => {
                observer.disconnect();
                reject(new Error('Timeout waiting for ' + selector));
            }, timeoutMs);
        });
    }
    // ---------- инициализация страницы друзей ----------
    async function initFriendsPage() {
        cleanup();
        // ждём основной контейнер (аналогично #layout_sidebar / #old_side_bar)
        let $layout;
        try {
            const el = await waitForElm('#page_old', 15000);
            $layout = $(el);
        } catch (e) {
            console.warn('[VK OLD FRIENDS] основной контейнер не найден, выходим', e);
            return;
        }
        // создаём DOM
        const $topNav = $(`
            <div class="tabs t_bar clear_fix" id="my_custom_topnav">
                <ul id="friends_tabs" class="t0">
                    <li id="tab_all" class="active_link">
                        <a href="/friends?section=all">
                            <b class="tl1"><b></b></b><b class="tl2"></b>
                            <b class="tab_word">Все друзья</b>
                        </a>
                    </li>
                    <li id="tab_online" style="display:none;">
                        <a href="/friends?section=online">
                            <b class="tl1"><b></b></b><b class="tl2"></b>
                            <b class="tab_word">Друзья онлайн<span class="count"></span></b>
                        </a>
                    </li>
                    <li id="tab_requests" style="display:none;">
                        <a href="/friends?section=requests">
                            <b class="tl1"><b></b></b><b class="tl2"></b>
                            <b class="tab_word">Заявки в друзья<span class="count"></span></b>
                        </a>
                    </li>
                </ul>
            </div>
        `);
        const $requestsSubNav = $(`
            <div id="under_nav" class="clear_fix">
                <a href="#" class="nav_lnk sel" data-type="in">Входящие заявки</a>
                <a href="#" class="nav_lnk" data-type="out">Исходящие заявки</a>
            </div>
        `);
        const $searchBlock = $(`
            <div id="search_content">
                <div id="search_query_wrap" class="wide clear_fix">
                    <div class="clear_fix">
                        <div class="search_isearch fl_l">
                            <div class="search_input_cont">
                                <div class="input_back_wrap no_select">
                                    <label class="input_back" for="search_query" style="margin:1px;padding:3px 7px 5px 20px;font-weight:normal;"></label>
                                </div>
                                <input class="text" id="search_query"
                                       placeholder="Введите имя или фамилию друга"
                                       autocomplete="off" type="text" style="width:450px;">
                            </div>
                        </div>
                        <div id="search_query_reset" class="fl_l" style="opacity:0.5;"></div>
                        <div id="search_query_progress" class="fl_l"></div>
                        <div class="fl_r search_submit">
                            <div class="button_blue button_wide">
                                <a href="/search/people"><button id="search_submit">Добавить друзей</button></a>
                            </div>
                        </div>
                    </div>
                    <div id="filters"></div>
                </div>
            </div>
        `);
        const $summary = $(`
            <div class="summary_wrap clear_fix">
                <div id="total_search" class="summary">загрузка...</div>
            </div>
        `);
        const $resultsBlock = $(`
            <div id="friends_results_container">
                <div id="results_wrap">
                    <table id="search_table" class="search_table">
                        <tbody>
                            <tr>
                                <td id="results" class="results highlight people_results"></td>
                            </tr>
                        </tbody>
                    </table>
                    <a id="show_more_link" class="clear" style="display:block;">
                        <div id="show_more_progress" class="progress"></div>
                        <div id="show_more">Показать ещё</div>
                    </a>
                </div>
            </div>
        `);
        const $container = $('<div id="friends_content" class="page_block"></div>')
            .append($topNav, $requestsSubNav.hide(), $searchBlock, $summary, $resultsBlock);
        // вставляем, как и фото — рядом с основным контентом
        $container.appendTo($layout);
        // ────────────────────────────────────────────────
        // Определение владельца
        // ────────────────────────────────────────────────
        async function detectProfileOwner() {
            let myId = null;
            try {
                const [me] = await vkApi.api('users.get', {});
                myId = me?.id;
            } catch (e) {
                console.warn('users.get error', e);
            }
            let targetId = myId;
            const url = new URL(location.href);
            const paramId = url.searchParams.get('id');
            if (paramId) targetId = +paramId;
            else if (/^\/id\d+$/.test(location.pathname)) {
                targetId = +location.pathname.slice(3);
            }
            targetUserId = targetId;
            isOwnProfile = (targetId === myId);
            if (!isOwnProfile && targetId) {
                try {
                    const [owner] = await vkApi.api('users.get', { user_ids: targetId });
                    if (owner) ownerName = `${owner.first_name} ${owner.last_name}`;
                } catch (e) {
                    console.warn('owner users.get error', e);
                }
            }
            if (isOwnProfile) {
                $('#tab_requests').show();
            }
            $('#tab_online').show();
        }
        await detectProfileOwner();
        // ────────────────────────────────────────────────
        // Рендер друга
        // ────────────────────────────────────────────────
        function renderItem(user) {
            const onlineClass = user.online ? (user.online_mobile ? 'online mobile' : 'online') : '';
            let actionText = '';
            let actionClass = '';
            if (currentSection === 'requests') {
                const isOutgoing = currentRequestType === 'out';
                actionText = isOutgoing ? 'Отменить заявку' : 'Принять заявку';
                actionClass = isOutgoing ? 'cancel_request' : 'accept_request';
            } else {
                const isFriend = user.is_friend === 1;
                actionText = isFriend ? 'Убрать из друзей' : 'Добавить в друзья';
                actionClass = isFriend ? 'remove_friend' : 'add_friend';
            }
            const div = document.createElement('div');
            div.className = 'people_row three_col_row clear_fix';
            div.innerHTML = `
                <div class="img search_bigph_wrap fl_l">
                    <a href="/id${user.id}">
                        <img class="search_item_img"
                             src="${user.photo_200_orig || 'https://vk.com/images/camera_200.png'}" alt="">
                    </a>
                </div>
                <div class="info fl_l">
                    <div class="labeled name">
                        <a href="/id${user.id}">${user.first_name} ${user.last_name}</a>
                    </div>
                    <div class="online ${onlineClass}"></div>
                </div>
                <div class="actions">
                    <a href="#" onclick="return showWriteMessageBox(event, ${user.id})">Написать сообщение</a>
                    <a class="${actionClass}" data-id="${user.id}">${actionText}</a>
                    <a href="/friends?id=${user.id}">Посмотреть друзей</a>
                </div>
            `;
            return div;
        }
        // ────────────────────────────────────────────────
        // Подгрузка
        // ────────────────────────────────────────────────
        async function loadMoreItems() {
            if (isLoading) return;
            isLoading = true;
            const $res = $('#results');
            const query = $('#search_query').val().trim();
            const listToShow = query ? filteredList : currentList;
            const slice = listToShow.slice(displayedCount, displayedCount + itemsPerLoad);
            if (!slice.length) {
                $('#show_more_link').hide();
                isLoading = false;
                return;
            }
            const fragment = document.createDocumentFragment();
            slice.forEach(u => fragment.appendChild(renderItem(u)));
            if ($res[0]) $res[0].appendChild(fragment);
            displayedCount += slice.length;
            if (displayedCount >= listToShow.length) {
                $('#show_more_link').hide();
            }
            isLoading = false;
        }
        function plural(n, f1, f2, f5) {
            n = Math.abs(n) % 100;
            const n10 = n % 10;
            if (n > 10 && n < 20) return f5;
            if (n10 > 1 && n10 < 5) return f2;
            if (n10 === 1) return f1;
            return f5;
        }
        function updateSummary() {
            const query = $('#search_query').val().trim();
            const list = query ? filteredList : currentList;
            const count = list.length;
            let prefix = isOwnProfile ? 'У Вас' : (ownerName ? `У ${ownerName}` : 'У пользователя');
            let text = '';
            if (currentSection === 'all') {
                text = `${prefix} ${count} ${plural(count, 'друг', 'друга', 'друзей')}`;
            } else if (currentSection === 'online') {
                text = `${prefix} ${count} ${plural(count, 'друг онлайн', 'друга онлайн', 'друзей онлайн')}`;
            } else if (currentSection === 'requests') {
                text = currentRequestType === 'in'
                    ? `Входящие заявки: ${count}`
                    : `Исходящие заявки: ${count}`;
            }
            if (query && count) text += ` (по запросу «${query}»)`;
            $('#total_search').text(text || 'загрузка...');
        }
        function applySearch() {
            const query = $('#search_query').val().trim().toLowerCase();
            if (!query) {
                filteredList = [];
                $('#search_query_reset').css('opacity', '0.5');
                updateSummary();
                displayedCount = 0;
                $('#results').empty();
                loadMoreItems();
                $('#show_more_link').show();
                return;
            }
            $('#search_query_reset').css('opacity', '1');
            filteredList = currentList.filter(u => {
                const name = `${u.first_name || ''} ${u.last_name || ''}`.toLowerCase();
                return name.includes(query);
            });
            updateSummary();
            displayedCount = 0;
            $('#results').empty();
            loadMoreItems();
            $('#show_more_link').toggle(filteredList.length > displayedCount);
        }
        // ────────────────────────────────────────────────
        // Загрузка списков
        // ────────────────────────────────────────────────
        async function loadAllFriends() {
            $('#total_search').text('Загрузка списка друзей...');
            try {
                const params = {
                    fields: 'photo_200_orig,online',
                    order: 'name'
                };
                if (targetUserId) params.user_id = targetUserId;
                const res = await vkApi.api('friends.get', params);
                if (!res?.items?.length) {
                    $('#total_search').text(isOwnProfile ? 'Нет друзей' : 'Список друзей пуст');
                    $('#results').html('<div>Список пуст</div>');
                    $('#show_more_link').hide();
                    currentList = [];
                    return;
                }
                let list = res.items;
                if (!isOwnProfile && list.length) {
                    const ids = list.map(u => u.id).join(',');
                    try {
                        const status = await vkApi.api('friends.areFriends', { user_ids: ids });
                        const statusMap = {};
                        status.forEach(s => statusMap[s.user_id] = s.friend_status);
                        list = list.map(u => ({
                            ...u,
                            is_friend: statusMap[u.id] === 3 ? 1 : 0
                        }));
                    } catch (e) {
                        console.warn('areFriends failed', e);
                    }
                } else if (isOwnProfile) {
                    list = list.map(u => ({ ...u, is_friend: 1 }));
                }
                currentList = list;
                updateSummary();
                displayedCount = 0;
                $('#results').empty();
                await loadMoreItems();
                $('#show_more_link').toggle(currentList.length > displayedCount);
            } catch (err) {
                console.error(err);
                $('#total_search').text('Ошибка загрузки друзей');
                $('#show_more_link').hide();
            }
        }
        async function loadOnlineFriends() {
            $('#total_search').text('Загрузка друзей онлайн...');
            try {
                const params = { online_mobile: 1 };
                if (targetUserId && !isOwnProfile) {
                    params.user_id = targetUserId;
                }
                const onlineRes = await vkApi.api('friends.getOnline', params);
                const ids = [
                    ...(onlineRes.online || []),
                    ...(onlineRes.online_mobile || [])
                ];
                if (!ids.length) {
                    if (!isOwnProfile) {
                        $('#total_search').text('Онлайн-статус друзей чужого профиля недоступен');
                        $('#results').html('<div>Информация об онлайн-статусе друзей недоступна для чужих профилей</div>');
                    } else {
                        $('#total_search').text('Нет друзей онлайн');
                        $('#results').html('<div>Никто не в сети</div>');
                    }
                    $('#show_more_link').hide();
                    currentList = [];
                    return;
                }
                const users = await vkApi.api('users.get', {
                    user_ids: ids.join(','),
                    fields: 'photo_200_orig,online'
                });
                let statusMap = {};
                if (!isOwnProfile && ids.length) {
                    try {
                        const statusRes = await vkApi.api('friends.areFriends', { user_ids: ids.join(',') });
                        statusRes.forEach(s => statusMap[s.user_id] = s.friend_status);
                    } catch (e) {
                        console.warn('areFriends online failed', e);
                    }
                }
                currentList = users.map(u => ({
                    ...u,
                    is_friend: isOwnProfile ? 1 : (statusMap[u.id] === 3 ? 1 : 0)
                }));
                updateSummary();
                displayedCount = 0;
                $('#results').empty();
                await loadMoreItems();
                $('#show_more_link').toggle(currentList.length > displayedCount);
            } catch (err) {
                console.error('online error:', err);
                if (!isOwnProfile) {
                    $('#total_search').text('Онлайн друзей недоступен');
                    $('#results').html('<div>Метод недоступен для чужих профилей</div>');
                } else {
                    $('#total_search').text('Ошибка загрузки');
                }
                $('#show_more_link').hide();
            }
        }
        async function loadRequests(type = 'in') {
            if (!isOwnProfile) return;
            $('#total_search').text('Загрузка заявок...');
            try {
                const res = await vkApi.api('friends.getRequests', {
                    out: type === 'out' ? 1 : 0,
                    count: 1000,
                    fields: 'photo_200_orig,online'
                });
                if (!res?.items?.length) {
                    const text = type === 'in' ? 'Нет входящих заявок' : 'Нет исходящих заявок';
                    $('#total_search').text(text);
                    $('#results').html(`<div>${text}</div>`);
                    $('#show_more_link').hide();
                    currentList = [];
                    return;
                }
                currentList = res.items;
                updateSummary();
                displayedCount = 0;
                $('#results').empty();
                await loadMoreItems();
                $('#show_more_link').toggle(currentList.length > displayedCount);
            } catch (err) {
                console.error(err);
                $('#total_search').text('Ошибка загрузки заявок');
                $('#show_more_link').hide();
            }
        }
        // ────────────────────────────────────────────────
        // Вкладки / состояние
        // ────────────────────────────────────────────────
        function setActiveTab(section) {
            currentSection = section;
            $('#friends_tabs li').removeClass('active_link');
            $('#tab_' + section).addClass('active_link');
            if (section === 'requests' && isOwnProfile) {
                $('#under_nav').show();
                $('#under_nav a').removeClass('sel');
                $('#under_nav a[data-type="' + currentRequestType + '"]').addClass('sel');
            } else {
                $('#under_nav').hide();
            }
            $('#search_query').val('');
            filteredList = [];
        }
        // ────────────────────────────────────────────────
        // Обработчики
        // ────────────────────────────────────────────────
        $('#friends_tabs a').on('click.vk_old_friends', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const section = new URL(href, location.origin).searchParams.get('section') || 'all';
            setActiveTab(section);
            history.pushState({}, '', href);
            if (section === 'all') loadAllFriends();
            else if (section === 'online') loadOnlineFriends();
            else if (section === 'requests' && isOwnProfile) loadRequests(currentRequestType);
        });
        $('#under_nav a').on('click.vk_old_friends', function (e) {
            e.preventDefault();
            const type = this.dataset.type;
            currentRequestType = type;
            $('#under_nav a').removeClass('sel');
            $(this).addClass('sel');
            loadRequests(type);
        });
        $('#search_query').on('input.vk_old_friends', applySearch);
        $('#search_query_reset').on('click.vk_old_friends', function () {
            $('#search_query').val('').trigger('input').focus();
        });
        $(window).on('scroll.vk_old_friends', () => {
            const link = $('#show_more_link')[0];
            if (!link || link.style.display === 'none') return;
            const rect = link.getBoundingClientRect();
            if (rect.top <= window.innerHeight + 300) loadMoreItems();
        });
        $('#show_more_link').on('click.vk_old_friends', function (e) {
            e.preventDefault();
            loadMoreItems();
        });
        // ────────────────────────────────────────────────
        // Старт (как в скрипте фото — сразу загрузка)
        // ────────────────────────────────────────────────
        const urlParams = new URLSearchParams(location.search);
        const initialSection = urlParams.get('section') || 'all';
        setActiveTab(initialSection);
        if (initialSection === 'all') loadAllFriends();
        else if (initialSection === 'online') loadOnlineFriends();
        else if (initialSection === 'requests' && isOwnProfile) loadRequests('in');
    }
    // ────────────────────────────────────────────────
    // Отслеживание смены страницы (как в скрипте фото)
    // ────────────────────────────────────────────────
    function onPageChange() {
        const url = new URL(location.href);
        const path = url.pathname;
        const section = url.searchParams.get('section');
        // Запускать только на /friends* или на /id\d+?section=friends
        const isFriendsPage = path.includes('/friends') || (/^\/id\d+$/.test(path) && section === 'friends');
        if (!isFriendsPage) {
            cleanup();
            window.vkFriendsOld20Running = false;
            return;
        }
        clearTimeout(cleanupTimeout);
        cleanupTimeout = setTimeout(initFriendsPage, 100);
    }
    const originalPushState = history.pushState;
    history.pushState = function () {
        originalPushState.apply(this, arguments);
        onPageChange();
    };
    const originalReplaceState = history.replaceState;
    history.replaceState = function () {
        originalReplaceState.apply(this, arguments);
        onPageChange();
    };
    window.addEventListener('popstate', onPageChange);
    // Первый запуск
    onPageChange();
})(jQuery);