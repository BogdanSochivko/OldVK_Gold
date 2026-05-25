/**
 * jQuery Observer library
 *
 * @author Oleg Korodenko <oleg.korodenko@gmail.com>
 *
 * MIT Licensed
 */

(function($){

	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	$.fn.mobserve = function(mode, options, callback) {
		var observerOptions = {
			childList: false,              // Добавление или удаление дочерних элементов (Включая текстовые узлы)
			attributes: false,             // Изменение атрибутов целевого элемента
			characterData: false,          // Изменение текстового содержимого целевого элемента
			subtree: false,                // Наблюдение за потомками целевого элемента
			attributeOldValue: false,      // Необходимо ли возвращать предыдущее значение атрибута
			characterDataOldValue: false   // Необходимо ли возвращать предыдущее значение Data-атрибута
			//attributeFilter: []          // Массив названий атрибутов
		};

		if (options && typeof options == 'object') {
			$.extend(observerOptions, options);
		}

		mode = mode.toLowerCase().split(' ');

		var isMode = function(flag){
			return $.inArray(flag, mode) > -1;
		};

		var matcher = function(){};

		var observer = new MutationObserver(function(mutations){
			mutations.forEach(matcher);
		});

		if (isMode("added")) {
			observerOptions.childList = true;
			observerOptions.subtree = !isMode("!subtree");

			var callbackCalled = function(node) {
				var data = $.data(node, "observed");
				if (data) {
					return data.indexOf(callback) != -1;
				}
				return false;
			}

			var callbackCall = function(node) {
				var data = $.data(node, "observed");
				if (!data) data = [];
				data.push(callback);
				$.data(node, 'observed', data);
				callback.call(node);
			}

			var matchNode = function(node){
				if ($(node).is(options) && !callbackCalled(node)){
					var brk = false;
					if (isMode("once")) {
						brk = true;
						observer.disconnect();
					}
					callbackCall(node);
					return brk;
				}
			};

			var matchRecursive = function(nodes){
				[].forEach.call(nodes, function(node){

					if (matchNode(node)) return;

					if (node.childNodes.length > 0) {
						var childs = node.querySelectorAll(options);
						[].forEach.call(childs, function(el){
							if (!callbackCalled(el)){
								var brk = false;
								if (isMode("once")) {
									brk = true;
									observer.disconnect();
								}
								callbackCall(el);
								if (brk) return;
							}
						});
						/*
						if (childs.length > 0) {
							childs.each(function(){
								if (!$.data(this, "observed")){
									var brk = false;
									if (isMode("once")) {
										brk = true;
										observer.disconnect();
									}
									$.data(this, "observed", true);
									callback.call(this);
									if (brk) return;
								}
							});
						}
						*/
						//matchRecursive(node.childNodes);
					}
				});
			};

			matcher = function(mutation){
				if (mutation.type == 'childList') {
					[].forEach.call(mutation.addedNodes, function(node){
						
						if (matchNode(node)) return;

						if (node.childNodes.length > 0) {
							matchRecursive(node.childNodes);
						}
					});
				}
			};
		}

		if (isMode("attr") || isMode("attributes")) {
			observerOptions.attributes = true;
			var filter = options.split(' ');
			if (filter.length) {
				observerOptions.attributeFilter = filter;
			}
			var ret = this;
			matcher = function(mutation){
				callback.call(ret, mutation);
			};
		}

		if (isMode("characterdata")) {
			observerOptions.characterData = true;
			observerOptions.subtree = isMode("subtree");
			var ret = this;
			matcher = function(mutation){
				callback.call(ret, mutation);
			};
		}

		return this.each(function(){
			if (isMode("added") && isMode("existing")) {
				var ret = false;
				var childs = this.querySelectorAll(options);
				[].forEach.call(childs, function(el){
					isMode("once") && (ret = true);
					callbackCall(el);
					if (ret) return;
				});
				/*
				$(this).find(options).each(function(){
					isMode("once") && (ret = true);
					callback.call(this);
					if (ret) return;
				});
				*/
				if (ret) return;
			}
			//console.log("Starting observer");
			observer.observe(this, observerOptions);
		});
	};

	// Fallback to jQuery-observe
	$.fn.observe = function(){};
	$.fn.observeOnce = function(){};
	$.fn.observeExisting = function(){};
	$.fn.disconnect = function(){};
})(jQuery);