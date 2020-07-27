(function() { 

function ready() { 
'use script'; 
if (document.getElementById('l_pr')) { 
var id = document.querySelector('.page_block a.ui_tab.ui_tab_sel').getAttribute('href').replace('/wall', ''); 
var a = document.querySelectorAll('#narrow_column .page_block')[1]; 
var b = document.createElement('a'); 
var c = document.querySelector('.counts_module .page_counter[onclick="return page.showPageMembers(event, ' + id + ', \'fans\');"] .count').textContent; 
b.classList = 'page_actions_item'; 
b.style = "display: block; line-height: 22px; padding: 0 6px; font-size: inherit; color: #2B587A;"; 
b.setAttribute('onclick', 'return page.showPageMembers(event, ' + id + ', \'fans\');'); 
b.innerHTML = '<div class="count" style="line-height: inherit; color: #8495a6; font-size: 0.9em; float: right; padding: 0;">' + c + '</div><div class="label" style="line-height: inherit; color: inherit;">Подписчики</div>'; 
a.insertBefore(b, a.firstChild); 
} 
} 
ready(); 

})(); 