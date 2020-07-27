$profile.mobserve('added existing once', ".page_name", function(elemen){
			var name = $(this).text().split(' ');

			var pageHeader = $("<div>");
			pageHeader.attr("id", "vkc-page-title");
			pageHeader.text(name.shift() + ' ' + name.pop());
			pageHeader.prependTo($profile);
})();