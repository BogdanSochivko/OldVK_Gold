// ==UserScript==
// @name         Mini_side_bar
// @version      1.0
// @description  Some changes of mini-sidebar
// @author       Anton Kozlovski and VKOldFix
// @match        *://vk.com/*
// @require      https://code.jquery.com/jquery-3.1.0.min.js
// ==/UserScript==

(function() {
    'use strict';

var x = $('#side_bar_inner.side_bar_inner').outerHeight(true);

$(document).scroll(function() {
   var top_scroll = $(this).scrollTop();

   if (top_scroll > x) {
      $('#l_msg>.left_row>.left_fixer>.left_count_wrap.fl_r').css({'position':'fixed','background':'none','transition': 'background-color 0ms linear, color 0ms linear','top':'9px','color':'#9FACB5','margin-right':'263px','right':'50vw'});
   }
   else {
      $('#l_msg>.left_row>.left_fixer>.left_count_wrap.fl_r').css({'position':'relative','background':'#d1d9e0','transition': 'background-color 200ms linear, color 200ms linear','top':'0','right':'inherit','color':'#5b6e85','margin-right':'1px'});
   }
   if (top_scroll > x) {
      $('#l_ntf>.left_row>.left_fixer>.left_count_wrap.fl_r').css({'position':'fixed','background':'none','transition': 'background-color 0ms linear, color 0ms linear','top':'35px','color':'#9FACB5','margin-right':'263px','right':'50vw'});
   }
   else {
      $('#l_ntf>.left_row>.left_fixer>.left_count_wrap.fl_r').css({'position':'relative','background':'#d1d9e0','transition': 'background-color 200ms linear, color 200ms linear','top':'0','right':'inherit','color':'#5b6e85','margin-right':'1px'});
   }
   if (top_scroll > x) {
      $('#l_msg>.left_row>.mini_bar_icon').css({'display':'block','position':'fixed','top':'15px','margin-right':'252px','right':'50vw'});
   }
   else {
      $('#l_msg>.left_row>.mini_bar_icon').css({'display':'none'});
   }
   if (top_scroll > x) {
      $('#l_ntf>.left_row>.mini_bar_icon').css({'display':'block','position':'fixed','top':'41px','margin-right':'252px','right':'50vw'});
   }
   else {
      $('#l_ntf>.left_row>.mini_bar_icon').css({'display':'none'});
   }
});

$('#l_msg>.left_row').append('<div class="mini_bar_icon">');
$('#l_ntf>.left_row').append('<div class="mini_bar_icon">');

})();