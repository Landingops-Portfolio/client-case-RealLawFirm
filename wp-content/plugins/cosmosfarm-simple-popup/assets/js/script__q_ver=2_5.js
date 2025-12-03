/**
 * @author https://www.cosmosfarm.com/
 */

jQuery(document).ready(function(){
	cosmosfarm_simple_popup_init().popup_list_init(function(popup_list){
		jQuery('.cosmosfarm-simple-popup-background-before').addClass('cosmosfarm-simple-popup-background');
		jQuery('.cosmosfarm-simple-popup-background-before').removeClass('cosmosfarm-simple-popup-background-before');
		
		var cosmosfarm_popup_scroll_list = [];
		
		jQuery.each(popup_list, function(popup_id, data){
			var popup = cosmosfarm_simple_popup(popup_id, data.timer, data.css_selector);
			
			if(data.scroll_px){
				cosmosfarm_popup_scroll_list.push(popup_id); // 스크롤 표시 팝업을 표시한다.
			}
			else if(data.timer > 0){
				popup.show_after_timer(); // 타이머 시간 이후 팝업을 표시한다.
			}
			else if(data.css_selector != ''){
				popup.show_click_css_selector(); // 클릭 표시 팝업을 표시한다.
			}
			else{
				popup.show(); // 기본 표시 팝업을 표시한다.
			}
		});
		
		// 스크롤 표시 입력 시 각각 위치에 맞게 팝업을 표시한다.
		jQuery(window).scroll(function(){
			if(cosmosfarm_popup_scroll_list.length){
				for(var i in cosmosfarm_popup_scroll_list){
					var popup_id = cosmosfarm_popup_scroll_list[i];
					
					if(window.scrollY >= popup_list[popup_id].scroll_px){
						var popup = cosmosfarm_simple_popup(popup_id);
						popup.show();
						cosmosfarm_popup_scroll_list.splice(i, 1);
					}
				}
			}
		});
		
		// 배경 클릭 시 모든 팝업을 닫는다.
		cosmosfarm_simple_popup_background().hide_all_after_click();
	});
});

var cosmosfarm_simple_popup_init = function(){
	/**
	 * 팝업 데이터 초기화 및 시작
	 */
	function popup_list_init(callback){
		if(cosmosfarm_simple_popup_settings.init_type == 'footer'){
			// 팝업 데이터 푸터에 출력
			if(typeof cosmosfarm_simple_popup_list == 'object'){
				callback(cosmosfarm_simple_popup_list);
			}
		}
		else if(cosmosfarm_simple_popup_settings.init_type == 'async'){
			// 팝업 데이터 비동기 초기화
			async_popup_list_init(callback);
		}
	}
	
	/**
	 * 팝업의 HTML을 비동기로 불러온다.
	 */
	function async_popup_list_init(callback){
		jQuery.post(cosmosfarm_simple_popup_settings.ajax_url, {
				action:'cosmosfarm_simple_popup_async_popup_list_init',
				current_page_id:cosmosfarm_simple_popup_settings.current_page_id,
				is_front_page:cosmosfarm_simple_popup_settings.is_front_page
			},
			function(res){
				if(res && res.popup_list){
					jQuery("body").append(res.html);
					callback(res.popup_list);
				}
			}
		);
	}
	
	return {
		popup_list_init: popup_list_init
	}
}

var cosmosfarm_simple_popup_background = function(){
	/**
	 * 배경 클릭 시 모든 팝업을 닫는다.
	 */
	function hide_all_after_click(){
		jQuery('.close-all').click(function(){
			hide_all_popup();
			hide();
		});
	}
	
	/**
	 * 팝업 개수를 체크한다.
	 */
	function active_count(){
		var count = jQuery(".cosmosfarm-simple-popup-layout.active").children().length;
		return count;
	}
	
	/**
	 * 배경을 표시한다.
	 */
	function show(){
		var background = jQuery(".cosmosfarm-simple-popup-background");
		if(!background.hasClass("active")){
			background.show();
			setTimeout(function(){
				background.addClass("active");
				jQuery("body").addClass("cosmosfarm-simple-popup-activated");
			});
		}
	}
	
	/**
	 * 배경을 숨긴다.
	 */
	function hide(){
		if(active_count() <= 0){
			var background = jQuery(".cosmosfarm-simple-popup-background");
			background.removeClass("active");
			jQuery("body").removeClass("cosmosfarm-simple-popup-activated");
			setTimeout(function(){
				background.hide();
			}, 550);
		}
	}
	
	/**
	 * 모든 팝업을 숨긴다.
	 */
	function hide_all_popup(){
		var popup = jQuery(".cosmosfarm-simple-popup-layout");
		popup.removeClass("active");
		setTimeout(function(){
			popup.hide();
		}, 550);
	}
	
	return {
		hide_all_after_click: hide_all_after_click,
		active_count: active_count,
		show: show,
		hide: hide,
	}
}

var cosmosfarm_simple_popup = function(popup_id='', timer='', selector=''){
	var popup = jQuery(".cosmosfarm-simple-popup-layout.popup-id-" + popup_id);
	
	if(popup_id){
		// 닫기 클릭 시 팝업을 닫는다.
		jQuery('.popup-close', popup).click(function(){
			hide();
		});
		
		// 오늘 하루 보지 않기 클릭 시 팝업을 닫는다.
		jQuery('.popup-not-showing', popup).click(function(){
			not_showing();
		});
	}
	
	/**
	 * 팝업을 표시한다.
	 */
	function show(){
		if(popup_id){
			popup.show();
			setTimeout(function(){
				popup.addClass("active");
			});
		}
		else{
			var all_popup = jQuery(".cosmosfarm-simple-popup-layout").addClass("active");
			all_popup.show();
			setTimeout(function(){
				all_popup.addClass("active");
			});
		}
		cosmosfarm_simple_popup_background().show();
	}
	
	/**
	 * 팝업을 숨긴다.
	 */
	function hide(){
		popup.removeClass("active");
		setTimeout(function(){
			popup.hide();
		}, 550);
		cosmosfarm_simple_popup_background().hide();
	}
	
	/**
	 * 1일 동안 표시하지 않기 클릭 시 팝업 쿠키를 저장한다.
	 */
	function not_showing(){
		hide();
		jQuery.post(cosmosfarm_simple_popup_settings.ajax_url, {
				action:'cosmosfarm_simple_popup_not_showing',
				popup_id:popup_id,
				security:cosmosfarm_simple_popup_settings.ajax_security
			},function(res){}
		);
	}
	
	/**
	 * 클릭 표시 설정 요소를 클릭 시 팝업을 보여준다.
	 */
	function show_click_css_selector(){
		jQuery(selector).click(function(event){
			event.preventDefault();
			show(popup_id);
		});
	}
	
	/**
	 * 타이머가 있는 팝업은 타이머 이후 팝업을 표시한다.
	 */
	function show_after_timer(){
		if(popup_id){
			if(timer <= 0){
				show(popup_id);
			}
			else{
				setTimeout(function(){
					timer -= 1;
					show_after_timer(timer);
				}, 1000);
			}
		}
	}
	
	return {
		show: show,
		hide: hide,
		not_showing: not_showing,
		show_click_css_selector: show_click_css_selector,
		show_after_timer: show_after_timer
	};
}