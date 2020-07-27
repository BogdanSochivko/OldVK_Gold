(function() {
	var callback = function() {
	    var id = document.querySelector('.left_label.inl_bl a');
		var url = document.location.pathname.substring(1);

		if (id) {
			if (url === 'im' + id.getAttribute('href').replace(/(\/im|\?tab=all)/g, '')) {
				var title = document.querySelector('title');
				if (title.textContent === 'Мои Сообщения') {
					title.textContent = 'Диологи';
				}
				else {
					title.textContent = title.textContent.replace('Сообщения', 'Диологи');
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