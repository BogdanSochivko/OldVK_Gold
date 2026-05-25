   (function ()
{
jQuery("#l_vid").prepend('<a href="/videos" onclick="return nav.go(this, event, {noback: true, params: {_ref: 'left_nav'}});" class="left_row"><span class="left_icon fl_l"></span><span class="left_label inl_bl">' + i18n.videos[lang] + '</span><span class="left_count_wrap fl_r left_void"><span class="inl_bl left_count_sign">0</span></span></a>');
})();