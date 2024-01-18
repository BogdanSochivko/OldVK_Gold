var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === "childList") {
            var element = document.querySelector("li#l_aud.LeftMenuItem-module__container--vaT3i");
            if (element) {
                element.addEventListener("click", function() {
                    window.location.href = "/audio?section=all";
                });
                observer.disconnect(); // Отключаем observer, когда находим нужный элемент
            }
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });
