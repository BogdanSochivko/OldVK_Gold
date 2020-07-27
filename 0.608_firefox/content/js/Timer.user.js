(function() {
    'use strict';
    var callback = function() {
        var a = document.getElementsByClassName('ms_items_more')[0],
            b = document.getElementsByClassName('post_action_btn')[0];
        if (b.id === 'post_visibility_btn') {
            b = document.getElementsByClassName('post_action_btn')[1];
        }
        if (a && b && !b.classList.contains('ms_item')) {
            a.append(b);
            b.classList.add('ms_item');
        }
    },
    element = document.querySelector('body'),
    mo = new MutationObserver(callback),
    options = {
        subtree: true,
        childList: true
    };
    mo.observe(element, options);
})();