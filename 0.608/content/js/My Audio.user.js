(function() {
	var callback = function() {
	    var id = document.querySelector('._audio_section_tab__all a');
		var url = document.location.pathname.substring(1);

		if (id) {
			if (url === 'audios' + id.getAttribute('href').replace(/(\/audios|\?section=all)/g, '')) {
				var title = document.querySelector('title');
				if (title.textContent === 'Моя музыка') {
					title.textContent = 'Мои аудиозаписи';
				}
				else {
					title.textContent = title.textContent.replace('Музыка', 'Аудиозаписи');
				}
			}
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