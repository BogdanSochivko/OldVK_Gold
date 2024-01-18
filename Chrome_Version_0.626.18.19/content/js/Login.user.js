// ==UserScript==
// @name         Login
// @version      1.0
// @description  Some changes of login page
// @author       Anton Kozlovski and VKOldFix
// @match        https://vk.com/
// @require      https://code.jquery.com/jquery-3.1.0.min.js
// ==/UserScript==

(function() {
    'use strict';

//Исчезающий блок
$(function(){
	var input = $('#ij_last_name'),
     pole = $('#nev_pole'),
	 height = $('.index_page #wrap2, .index_page #wrap1, .index_page #content, #index_footer_wrap');

        pole.addClass('nev');

			setInterval(function(){
				if($(input).val() !== ''){
					if(pole.hasClass('nev')){
						pole.removeClass('nev');
						height.addClass('h_bl');
					} else {
						return false;
					}
				} else {
					pole.addClass('nev');
					height.removeClass('h_bl');
				}
			},500);
});

//Добавление над полями ввода текст
    $('.index_rcolumn>.page_block.index_login #index_email').before('<div id="t_and_em">Телефон или email</div>');
	$('.index_rcolumn>.page_block.index_login #index_pass').before('<div id="pass_word">Пароль</div>');
	$('input.big_text').prepend('placeholder','');

//Первый текст
	jQuery('#index_rcolumn.index_rcolumn').prepend('<p id="txt_about_vk"><b>ВКонтакте</b> – универсальное средство для общения и поиска друзей и одноклассников, которым ежедневно пользуются десятки миллионов человек.');

//Pleceholder для полей имени и фамилии в регистрации
	$('#ij_first_name.big_text').prepend('placeholder','Ваше имя');
	$('#ij_last_name.big_text').prepend('placeholder','Ваша фамилия');

//Добавление новодизайных полей регистрации в исчезающий блок
	$('#ij_last_name').prepend('<div id="nev_pole">');
	$('#ij_form>.ij_label, #ij_birthdate_row, #ij_sex_row').prepend($('#nev_pole'));

//Добавление блока со стрелкой в кнопку "Зарегистрироваться"
    $('form.VkIdForm__form').before('<div id="up_title_vk">Моментальная регистрация</div>');
    $('.flat_button.button_wide.button_big_text.ij_button').text("Зарегистрироваться");
	$('[dir] .VkIdForm__header').prepend('<div id="up_title_vk_login"><div id="up_title_vk_login_l" style="left: 325px;bottom: 0px;position: absolute;">-</div><div id="up_title_vk_text" style="position: relative;left: 290px;top: 49px;"> был переработан так что бы он защищял</div><div id="down_title_vk_text" style="position: relative;left: 45px;top: 49px;"> данные вашего аккаунта.</div>');
	$('.VkIdForm__button.VkIdForm__signUpButton').before('<div class="index_or"><div class="index_or_l"></div><span class="index_or_s">или</span></div>');
	$('button.FlatButton.FlatButton--positive.FlatButton--size-l.FlatButton--wide.VkIdForm__button.VkIdForm__signUpButton>.FlatButton__in>.FlatButton__content').prepend('<div class="strelka">');

//Второй текст
	jQuery('#vk_connect_registration_faq').prepend('<div id="title_vk2">В чём поможет ВКонтакте?</div><ul id="vk_ab"><li><span5>Найти людей, с которыми Вы когда-либо учились, работали или отдыхали.</span5></li><li><span6>Узнать больше о людях, которые Вас окружают, и найти новых друзей.</span6></li><li><span7>Всегда оставаться в контакте с теми, кто Вам дорог.</span7></li></ul><div id="prim_str"><div id="p_s1"></div><div id="p_s2"></div><div id="p_s3"></div></div>');

//Перемещение списка в подвале над строками "Язык" и "ВКонтакте 2019"
    $('#index_footer_wrap.footer_wrap.index_footer_wrap>#bottom_nav.footer_nav>.footer_links').prependTo($('#bottom_nav.footer_nav'));

})();

    ///$('#quick_email').before('<div id="t_and_em1">Телефон или email</div>');
	///$('#quick_pass').before('<div id="pass_word1">Пароль</div>');