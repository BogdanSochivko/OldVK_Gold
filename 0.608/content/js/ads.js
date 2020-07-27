if(typeof(VKAR) === 'undefined') {
	var VKAR = {};
}

VKAR = (function($){
    var settings = {
        debug: false,
        hiddenClass: 'vkar_hidden',

        adLeftBlockMarkClass: 'vkar_ad-left-block',
        adLeftBlockSelector: '#ads_left',

        adPostMarkClass: 'vkar_ad-post',
        adPostSelector: '._ads_block_data_w,.wall_marked_as_ads',

        adRecordMarkClass: 'vkar_ad-record',
        adRecordSelector: '._ads_promoted_post_data_w'
    };

    var methods = {
        log: function(message) {
            if(settings.debug) {
                console.log(message);
            }
        },
        init: function() {
			chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
				if (request.action === 'remove_ads') {
					methods.removeAdPosts();
					sendResponse(methods.getAdsTotalCounts());
				}

				if (request.action === 'get_ads_count') {
					sendResponse(methods.getAdsTotalCounts());
				}

				sendResponse(methods.getAdsTotalCounts());
			});

			methods.disableAudioAds();
        },
        getAdsTotalCount: function() {
            return $('.' + settings.hiddenClass).length.toString();
        },
		getAdsTotalCounts: function(){
        	return {
        		banners: $('.' + settings.adLeftBlockMarkClass).length,
				records: $('.' + settings.adRecordMarkClass).length,
				posts: $('.' + settings.adPostMarkClass).length,
				all: $('.' + settings.hiddenClass).length
			}
		},
		removeAdPosts: function() {
            // Ad record
            $(settings.adRecordSelector).each(function() {
                $(this).closest('.feed_row').addClass(settings.adRecordMarkClass + ' ' + settings.hiddenClass);
				$(this).closest('.post').addClass(settings.adPostMarkClass + ' ' + settings.hiddenClass);
            });

            // Ad post
			$(settings.adPostSelector).each(function(){
				$(this).closest('.feed_row').addClass(settings.adPostMarkClass + ' ' + settings.hiddenClass);
				$(this).closest('.post').addClass(settings.adPostMarkClass + ' ' + settings.hiddenClass);
			});

            // Ads block in left side
            $(settings.adLeftBlockSelector).addClass(settings.adLeftBlockMarkClass + ' ' + settings.hiddenClass);
		},
		disableAudioAds: function(){
			if (typeof(AudioPlayer) === 'function') {
				AudioPlayer.prototype._adsIsAllowed = function() {
					return 1;
				};
			}
		}
    };

    $(methods.init);

    return {};
})(jQuery);
