(function() {
    'use strict';

    // Создаем кнопку
    function createDetailsButton() {
        const button = document.createElement('button');
        button.className = 'details-button';
        button.textContent = 'Показать подробную информацию';
        button.style.backgroundColor = 'rgb(255 255 255)';
        button.style.border = 'none';
        button.style.padding = '10px 98px';
        button.style.cursor = 'pointer';
        button.style.marginTop = '10px';
        button.style.marginLeft = 'auto';
        button.style.marginRight = 'auto';
        button.style.display = 'block'; // Центрируем кнопку
        button.style.color = '#2a5885'; // Цвет текста
        button.onmouseover = function() {
            button.style.backgroundColor = '#f1f1f1';
        };
        button.onmouseout = function() {
            button.style.backgroundColor = 'rgb(255 255 255)';
        };
        return button;
    }

    // Добавляем кнопку в элемент ProfileInfo__fullInfo
    function addButtonToProfileInfo(profileInfo) {
        const button = createDetailsButton();
        profileInfo.appendChild(button);
        button.addEventListener('click', function() {
            // Логика для управления дальнейшим содержимым после нажатия кнопки
        });
    }

    // Функции для извлечения данных
    function extractCity(profileContent) {
        const cityElement = profileContent.querySelector('.ProfileFullCommonInfo__caption a[href*="city"]');
        return cityElement ? cityElement.outerHTML : '';
    }

    function extractLanguages(profileContent) {
        const languageElement = profileContent.querySelector('.ProfileFullMainInfo__langs');
        return languageElement ? languageElement.outerHTML : '';
    }

    function extractBirthDate(profileContent) {
        const birthDateCaption = profileContent.querySelector('.ProfileFullCommonInfo__caption');
        let birthDate = '';
        if (birthDateCaption) {
            const birthDateDayMonth = birthDateCaption.querySelector('a[href*="birth_day"][href*="birth_month"]');
            const birthDateYear = birthDateCaption.querySelector('a[href*="birth_year"]');

            if (birthDateDayMonth) {
                birthDate += birthDateDayMonth.outerHTML;
            }

            if (birthDateYear) {
                birthDate += ` ${birthDateYear.outerHTML}`;
            }
        }
        return birthDate.trim();
    }

    function extractWork(profileContent) {
        const workElement = profileContent.querySelector('.ProfileFullCommonInfoCareer__caption a');
        return workElement ? workElement.outerHTML : '';
    }

    function extractWebsite(profileContent) {
        const websiteElement = profileContent.querySelector('.ProfileFullCommonInfo__caption a[href*="/away.php?utf=1&to="]');
        return websiteElement ? websiteElement.outerHTML : '';
    }

    // Вставка данных в ProfileInfo__fullInfo
    function insertProfileInfo(profileInfo, data) {
        const lang = document.documentElement.lang;
        const translations = {
            'en-us': { city: 'City:', languages: 'Languages:', birthDate: 'Birthdate:', work: 'Work:', website: 'Website:' },
            'ru': { city: 'Город:', languages: 'Языки:', birthDate: 'День рождения:', work: 'Место работы:', website: 'Сайт:' }
        };
        const labels = translations[lang] || translations['en-us'];
        profileInfo.innerHTML = `
            <div style="line-height:140%;">
                ${data.city ? `<div style="display:block;"><div style="float:left;width:120px;color:rgb(119, 119, 119);">${labels.city}</div><div style="float:left;width:265px;overflow-x:hidden;overflow-y:hidden;color:#2a5885;">${data.city}</div><span style="display:block;height:0px;clear:both;visibility:hidden;"></span></div>` : ''}
                ${data.languages ? `<div style="display:block;padding-top:3px;"><div style="float:left;width:120px;color:rgb(119, 119, 119);">${labels.languages}</div><div style="float:left;width:265px;overflow-x:hidden;overflow-y:hidden;color:#2a5885;">${data.languages}</div><span style="display:block;height:0px;clear:both;visibility:hidden;"></span></div>` : ''}
                ${data.birthDate ? `<div style="display:block;padding-top:3px;"><div style="float:left;width:120px;color:rgb(119, 119, 119);">${labels.birthDate}</div><div style="float:left;width:265px;overflow-x:hidden;overflow-y:hidden;color:#2a5885;">${data.birthDate}</div><span style="display:block;height:0px;clear:both;visibility:hidden;"></span></div>` : ''}
                ${data.work ? `<div style="display:block;padding-top:3px;"><div style="float:left;width:120px;color:rgb(119, 119, 119);">${labels.work}</div><div style="float:left;width:265px;overflow-x:hidden;overflow-y:hidden;color:#2a5885;">${data.work}</div><span style="display:block;height:0px;clear:both;visibility:hidden;"></span></div>` : ''}
                ${data.website ? `<div style="display:block;padding-top:3px;"><div style="float:left;width:120px;color:rgb(119, 119, 119);">${labels.website}</div><div style="float:left;width:265px;overflow-x:hidden;overflow-y:hidden;color:#2a5885;">${data.website}</div><span style="display:block;height:0px;clear:both;visibility:hidden;"></span></div>` : ''}
            </div>
        `;
        // Добавляем кнопку после вставки информации
        addButtonToProfileInfo(profileInfo);
    }

    // Функция для скрытия элементов внутри .ProfileWrapper
    function hideElements() {
        const profileWrapper = document.querySelector('.ProfileWrapper');
        if (profileWrapper) {
            const profileInfoFull = profileWrapper.querySelector('.ProfileInfo__fullInfo');
            if (profileInfoFull) {
                const layerWrap = profileWrapper.querySelector('#box_layer_wrap');
                const layerBg = profileWrapper.querySelector('#box_layer_bg');
                if (layerWrap && layerBg) {
                    layerWrap.style.visibility = 'hidden';
                    layerWrap.style.height = '0';
                    layerWrap.style.overflow = 'hidden';
                    layerBg.style.visibility = 'hidden';
                    layerBg.style.height = '0';
                    layerBg.style.overflow = 'hidden';
                }
            }
        }
    }

    // Автоматическое нажатие на кнопку "Подробнее"
    async function clickDetailsButton() {
        const buttons = document.querySelectorAll('.vkitActionsGroupItem__root--EYNrm.vkitActionsGroupItem__rootModeSecondary--0hmMc.vkuiTappable.vkuiTappable--hasPointer-none.vkuiClickable__host.vkuiClickable__realClickable.vkui-focus-visible.vkuiRootComponent');
        const detailsButton = buttons[2] || buttons[1] || buttons[0]; // Третья или вторая или первая кнопка по индексу
        if (detailsButton) {
            detailsButton.click();
        }
    }

    // Закрытие модального окна "Подробная информация"
    async function closeDetailsModal() {
        const closeButton = document.querySelectorAll('.vkuiModalDismissButton.vkuiTappable.vkuiTappable--hasPointer-none.vkuiClickable__host.vkuiClickable__realClickable.vkui-focus-visible.vkuiRootComponent');
        closeButton.forEach(button => {
            button.click();
        });
    }

    // Основная функция для обработки профиля
    async function processProfileInfo() {
        await clickDetailsButton();

        setTimeout(async () => {
            const profileModalContent = document.querySelector('.ProfileFullInfoModal__content--szm9S');
            if (profileModalContent) {
                const city = extractCity(profileModalContent);
                const languages = extractLanguages(profileModalContent);
                const birthDate = extractBirthDate(profileModalContent);
                const work = extractWork(profileModalContent);
                const website = extractWebsite(profileModalContent);
                const profileData = { city, languages, birthDate, work, website };
                const profileInfoFull = document.querySelector('.ProfileInfo__fullInfo');
                if (profileInfoFull) {
                    insertProfileInfo(profileInfoFull, profileData);
                }
                await closeDetailsModal(); // Закрываем модальное окно

                // Скрываем элементы через 500 миллисекунд после закрытия
                setTimeout(hideElements, 0);
            }
        }, 0); // Ждем 500 миллисекунд для загрузки контента
    }

    // Функция инициализации с повторением
    async function initializeProfileInfo() {
        setInterval(async () => {
            await processProfileInfo();
        }, 0); // Проверяем каждые 500 миллисекунд
    }

    // Запуск инициализации при загрузке страницы
    document.addEventListener('DOMContentLoaded', initializeProfileInfo);

})();
