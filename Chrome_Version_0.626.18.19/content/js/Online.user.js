(function() {
    'use strict';

    var callback = function() {

        var a = document.querySelector(".im-chat-input.im-chat-input_classic._im_chat_input_parent");
        var b = document.querySelector(".im-page--title .im-page--title-meta._im_page_peer_online");
        var j = document.querySelector(".im-page--aside-photo ._im_header_link");
        var h = document.querySelector(".oldvk-chat-avatar.oldvk-chat-avatar-2");

        if (a && b) {
            var x = document.querySelector(".im-page--title .im-page--title-meta._im_page_peer_online");
            var y = document.querySelector(".im-chat-input.im-chat-input_classic._im_chat_input_parent .im-page--title-meta._im_page_peer_online");

            if (x.textContent.length > 6) {
                x.textContent = "";
            }

            if (j && h) {
                var k = document.createElement("a");
                k.className = "chat_img_2"
                k.href = j.getAttribute("href");
                k.target = "blank";
                a.appendChild(k);
                var l = document.querySelector(".chat_img_2");
                l.appendChild(h);
            }

            if (x && !y) {
                a.appendChild(b);
            } else if (x && y) {
                y.remove();
                a.appendChild(b);
            }

        }

    },
    element = document.querySelector('body'),
    mo = new MutationObserver(callback),
    options = {
    subtree: true,
    childList: true
	};
	mo.observe(element, options);
}) ();
