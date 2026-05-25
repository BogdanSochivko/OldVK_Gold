//Функция для автарки разделе мои друзья и поиск.
(function() {
    'use strict';

    var callback = function() {

        var a = document.querySelector(".friends_field_act");

        if (a) {
            var x = document.querySelector(".AvatarRich__badge");
            if (x.textContent.length > 6) {
                x.textContent = "";
            }
    },
    element = document.querySelector('friends?section=online'),
    mo = new MutationObserver(callback),
    options = {
    subtree: true,
    childList: true
	};
	mo.observe(element, options);
}) (); 