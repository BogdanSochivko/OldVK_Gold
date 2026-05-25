var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === "childList") {
            var element = document.querySelector("li#l_vid.LeftMenuItem-module__container--vaT3i");
            if (element) {
                element.addEventListener("click", function() {
                    window.location.href = "/videos";
                });
                observer.disconnect(); // Отключаем observer, когда находим нужный элемент
            }
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });