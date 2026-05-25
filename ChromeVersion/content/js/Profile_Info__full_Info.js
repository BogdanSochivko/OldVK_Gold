(function() {
    'use strict';

    // ================== Создание кнопки "Показать подробную информацию" ==================
    function createDetailsButton() {
        const button = document.createElement('button');
        button.className = 'details-button';
        button.textContent = 'Показать подробную информацию';
        button.style.backgroundColor = 'rgb(255 255 255)';
        button.style.border = 'none';
        button.style.padding = '10px 98px';
        button.style.cursor = 'pointer';
        button.style.margin = '10px auto 0';
        button.style.display = 'block';
        button.style.color = '#2a5885';
        button.onmouseover = () => button.style.backgroundColor = '#f1f1f1';
        button.onmouseout = () => button.style.backgroundColor = 'rgb(255 255 255)';
        return button;
    }

    // ================== Вставка данных в старый блок "Информация" ==================
    function insertProfileInfo(profileInfo, data) {
        const labels = {
            'ru': { city: 'Город:', languages: 'Языки:', birthDate: 'День рождения:', work: 'Место работы:', website: 'Сайт:' },
            'en-us': { city: 'City:', languages: 'Languages:', birthDate: 'Birthdate:', work: 'Work:', website: 'Website:' }
        };
        const lang = document.documentElement.lang;
        const l = labels[lang] || labels['en-us'];

        profileInfo.innerHTML = `
            <div style="line-height:140%;">
                ${data.city ? `<div style="display:block;"><div style="float:left;width:120px;color:rgb(119, 119, 119);">${l.city}</div><div style="float:left;width:265px;color:#2a5885;">${data.city}</div><span style="display:block;clear:both;"></span></div>` : ''}
                ${data.languages ? `<div style="display:block;padding-top:3px;"><div style="float:left;width:120px;color:rgb(119, 119, 119);">${l.languages}</div><div style="float:left;width:265px;color:#2a5885;">${data.languages}</div><span style="display:block;clear:both;"></span></div>` : ''}
                ${data.birthDate ? `<div style="display:block;padding-top:3px;"><div style="float:left;width:120px;color:rgb(119, 119, 119);">${l.birthDate}</div><div style="float:left;width:265px;color:#2a5885;">${data.birthDate}</div><span style="display:block;clear:both;"></span></div>` : ''}
                ${data.work ? `<div style="display:block;padding-top:3px;"><div style="float:left;width:120px;color:rgb(119, 119, 119);">${l.work}</div><div style="float:left;width:265px;color:#2a5885;">${data.work}</div><span style="display:block;clear:both;"></span></div>` : ''}
                ${data.website ? `<div style="display:block;padding-top:3px;"><div style="float:left;width:120px;color:rgb(119, 119, 119);">${l.website}</div><div style="float:left;width:265px;color:#2a5885;">${data.website}</div><span style="display:block;clear:both;"></span></div>` : ''}
            </div>
        `;

        // Кнопка "Показать подробную информацию"
        const button = createDetailsButton();
        profileInfo.appendChild(button);
        button.addEventListener('click', async () => {
            await processProfileInfo();
        });
    }

    // ================== Извлечение данных из модального окна ==================
    function extractData(modalContent) {
        const getElementHTML = (selector) => {
            const el = modalContent.querySelector(selector);
            return el ? el.outerHTML : '';
        };

        const city = getElementHTML('.ProfileFullCommonInfo__caption a[href*="city"]');
        const languages = getElementHTML('.ProfileFullMainInfo__langs');
        const birthDate = (() => {
            const caption = modalContent.querySelector('.ProfileFullCommonInfo__caption');
            if (!caption) return '';
            const dayMonth = caption.querySelector('a[href*="birth_day"][href*="birth_month"]');
            const year = caption.querySelector('a[href*="birth_year"]');
            return [dayMonth, year].filter(Boolean).map(el => el.outerHTML).join(' ');
        })();
        const work = getElementHTML('.ProfileFullCommonInfoCareer__caption a');
        const website = getElementHTML('.ProfileFullCommonInfo__caption a[href*="/away.php?utf=1&to="]');

        return { city, languages, birthDate, work, website };
    }

    // ================== Клик по кнопке "Подробнее" ==================
    async function clickDetailsButton() {
        const buttons = document.querySelectorAll('.vkitActionsGroupItem__root');
        for (const btn of buttons) {
            if (btn.innerText.includes('Подробнее') || btn.innerText.includes('Details')) {
                btn.click();
                return true;
            }
        }
        return false;
    }

    // ================== Закрытие модального окна ==================
    function closeDetailsModal() {
        const closeButtons = document.querySelectorAll('[data-testid="modal-close-button"]');
        closeButtons.forEach(btn => btn.click());
    }

    // ================== Основной процесс обработки профиля ==================
    async function processProfileInfo() {
        const clicked = await clickDetailsButton();
        if (!clicked) return;

        // Ждем модальное окно
        setTimeout(() => {
            const modalContent = document.querySelector('.ProfileFullInfoModal__content--szm9S');
            if (!modalContent) return;

            const data = extractData(modalContent);
            const profileInfo = document.querySelector('.ProfileInfo__fullInfo');
            if (profileInfo) insertProfileInfo(profileInfo, data);

            // Закрываем модальное окно
            closeDetailsModal();
        }, 500); // Ждем 0.5 секунды для загрузки контента
    }

    // ================== Инициализация ==================
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(processProfileInfo, 1000); // Ждем загрузку профиля
    });
})();