(function() {
    'use strict';
    function countDownToBirthday() {
        var now = new Date();
        var currentYear = now.getFullYear();
        var nextBirthday = new Date("January 21, " + currentYear);

        // Если день рождения уже прошел в этом году, то отсчитываем до следующего года
        if (now > nextBirthday) {
            nextBirthday.setFullYear(currentYear + 1);
        }

        var diff = nextBirthday - now;

        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `До дня рождения <a href="https://vk.com/beleday">Богдана Сочивко</a> осталось: ${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд.`;
    }

    // Проверяем, существует ли элемент
    var element = document.querySelector(".LegalRecommendationsLinkLeftMenuAuthorized__link");
    if (element) {
        // Добавляем текст в элемент
        // Получаем текущую дату
        var today = new Date();
        // Получаем месяц и день месяца
        var month = today.getMonth();
        var day = today.getDate();
        // Проверяем, является ли сегодня днем рождения Богдана Сочивко
        if (month === 0 && day === 21) {
          // Показываем поздравление
          element.innerHTML = "<a href='https://vk.com/beleday'>С днем рождения!</a>";
        } else {
          // Показываем оставшееся время до дня рождения
          element.innerHTML = countDownToBirthday();
        }
    } else {
        console.log("Элемент с классом 'side_bar_inner' не найден");
    }

    setInterval(() => {
        if (element) {
            element.innerHTML = '';
            // Получаем текущую дату
            var today = new Date();
            // Получаем месяц и день месяца
            var month = today.getMonth();
            var day = today.getDate();
            // Проверяем, является ли сегодня днем рождения Богдана Сочивко
            if (month === 0 && day === 21) {
              // Показываем поздравление
              element.innerHTML = "<a href='https://vk.com/beleday'>С днем рождения!</a>";
            } else {
              // Показываем оставшееся время до дня рождения
              element.innerHTML = countDownToBirthday();
            }
        }
    }, 1000);
})();
