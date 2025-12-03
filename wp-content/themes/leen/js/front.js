$(function(){
	
	new WOW().init();

	let isPc = true;

	const $win = $(window),
		  $header = $('header'),
		  menu = $header.find('.menu > li'),
		  menuBtn = $header.find('h2'),
		  submenu = $header.find('.sub-menu'),
          quickMenu = $('#quick_menu');

	
	// pc 메뉴
	$header.on({
		'mouseenter':function(){
			if ($win.width() > 1025) {
				$header.addClass('active');
			}
		},
		'mouseleave':function(){
			if ($win.width() > 1025) {
				$header.removeClass('active');
			}
		}
	});

	menu.on({
		'mouseenter':function(){
			if ($win.width() > 1025) {
				$(this).find(submenu).fadeIn(150)
			}
		},
		'mouseleave':function(){
			if ($win.width() > 1025) {
				 $(this).find(submenu).fadeOut(150)
			}
		}
	});

	menu.find('>a').after('<p class="bar"></p>');
	const menuClone = $('.gnb .menu').clone();

	$('#all_menu .menu_wrap').prepend(menuClone);
	
	
	$('header h2').on('click', function(){
		if (isPc == false) return false;
		$('#all_menu').show();
	});

	$('#all_menu  .close').on('click', function(){
		if (isPc == false) return false;
		$('#all_menu').hide();
	});
	

	// mo 메뉴
	menu.each(function(){
		if(!$(this).find(submenu).length > 0) $(this).closest('li').find('>a').addClass('no_submenu');
	});


	// mo 메뉴 클릭시
	menuBtn.on('click', function(){
		$(this).closest($header).toggleClass('open');
		$header.find('.gnb').toggleClass('mb_hd');
	});
	
	// 관리자 bar대응 (#wpadminbar)
	$win.on('load resize', function(){
		const adBar = $('#wpadminbar'),
			adBH = adBar.height();
		if (adBar.is(':visible')){
			//관리자로 로그인시
			$header.css('top',adBH);
		}
	}).resize();

	$win.on('load', function(){
		//fullpage_api.moveTo(3);
	})
	
	//fullpage
	if ($('#fullpage').length > 0){
		$('#fullpage').fullpage({
			navigation:true,
			navigationPosition:'left',
			navigationTooltips: ['REAL','Why?','실력','무료진단','성공사례','업무분야','주의사항','대표소개','사무소','철학'],
			showActiveTooltip:true,
			anchors: ['home', 'why' ,'skill', 'freetest', 'case', 'field', 'caution', 'ceo','office','philosophy'],
			responsiveWidth: 1025,
			normalScrollElements: '.free_diagnosis_new .board_wrap',
			fixedElements: 'header , #quick_inquiry, #quick_menu, #all_menu , .btm_sns, #wpadminbar', //#wpadminbarm
			afterLoad: function () {
				$(this).find('.full_animate').addClass('animate_active');
				$('.section').addClass('lazy-loaded');

				if ($('.main_professional').is('.active')){ // 숫자 카운트

					$('.count01 strong').jQuerySimpleCounter({
						start:100,
						end:0,
						duration:2000,
						
					});
					$('.count02 strong').jQuerySimpleCounter({
						duration:2000,
						start:0,
						end:500
					});
					$('.count03 strong').jQuerySimpleCounter({
						duration:2000,
						start:0,
						end:93
					});	
				}

				if ($('.main_philosophy').is('.active')){ // 숫자 카운트
					$('.main_philosophy .con button').addClass('on');
				}else{
					$('.main_philosophy .con button').removeClass('on');
				}
				
				
			},
			onLeave: function(index, nextIndex, direction) {
				if (nextIndex == $('.section').length){
					$('#quick_inquiry').addClass('hide').removeClass('show');	
				}else{
					$('#quick_inquiry').removeClass('hide').addClass('show');
				}
			},
		});

		$('.full_animate').each(function(){
			$(this).css('animation-delay',$(this).attr('data-wow-delay'));
		});

		$('body').addClass('line');
	}
	

	
	let ww = $win.width(),
		caseSwiper = undefined;

	const skillSwiper = new Swiper('.main_skill .skill_slide', {
		loop:true,
		spaceBetween:24,
		slidesPerView:1.1,
		speed:1500,
		loopedSlides:3,
		autoplay:{
			delay:2500,
			disableOnInteraction:false,
		},
		breakpoints:{
			1199: { 
				slidesPerView:2,
				spaceBetween:230,
			},
		}
	});

	function initSwiper() {
		if (ww > 1025 && caseSwiper == undefined) {
			caseSwiper = new Swiper('.main_success .case_slide', {
				slidesPerView:1,
				speed:1500,
				spaceBetween:30,
				on: {
					slideChangeTransitionStart:function(){
						let Idx = this.realIndex;
						
						if (Idx === 0) {
							$('.main_success .pc_con .con_tit em').text('개인회생/파산 성공 사례')
							$('.main_success .arw_view').removeClass('active').addClass('remove').text('기업 성공 사례')
							$('.main_success .arw_view').removeClass('first')
							caseSwiper.slideTo(0, 1000, false);
						} else {
							$('.main_success .pc_con .con_tit em').text('기업회생/파산 성공 사례')
							$('.main_success .arw_view').addClass('active').removeClass('remove').text('개인 성공 사례')
							$('.main_success .arw_view').addClass('first')
							caseSwiper.slideTo(1, 1000, false);
						}
					}
				}
			});
		}else if(ww < 1025 && caseSwiper != undefined){
			caseSwiper.destroy();
			caseSwiper = undefined;
			$('.main_success .pc_con .con_tit em').text('개인회생/파산 성공 사례')
		}
	}
	
	if($('.main_success').length > 0) {
		initSwiper();
	}
	
	// 성공사례 버튼 클릭시
	$('.main_success .arw_view').on('click',function(e){
		e.preventDefault();
		
		if ($(this).is('.first')){
			$(this).removeClass('first')
			caseSwiper.slideTo(0, 1000, false);
			$('.main_success .pc_con .con_tit em').text('개인회생/파산 성공 사례')
			$('.main_success .arw_view').removeClass('active').addClass('remove').text('기업 성공 사례')
		}else{
			$(this).addClass('first')
			$('.main_success .pc_con .con_tit em').text('기업회생/파산 성공 사례')
			$('.main_success .arw_view').addClass('active').removeClass('remove').text('개인 성공 사례')
			caseSwiper.slideTo(1, 1000, false);	
		}

	})

	$win.on('resize', function(){
		ww = $win.width();
		if($('.main_success').length > 0) {
			initSwiper();
		}
	});

	if ($('.sub_wrap').length > 0){
		$('footer').addClass('border');
	}
	

	// 둘러보기/오시는길
	if ($('.sub_round').length > 0){
		const btmSwiper = new Swiper('.sub_round .btm_swiper', {
			loop:true,
			loopedSlides:12,
			watchSlidesVisibility:true,
			watchSlidesProgress:true,
			speed:1500,
			autoplay:{
			delay:2500,
				disableOnInteraction:false,
			},
			spaceBetween:5,
			slidesPerView:5,
			breakpoints:{
				640: { 
					slidesPerView:5,
					spaceBetween:20,
				},
			},
		});
		
		const topSwiper = new Swiper('.sub_round .top_swiper', {
			loop:true,
			spaceBetween:0,
			speed:1500,
			loopedSlides:12,
			autoplay:{
				delay:2500,
				disableOnInteraction:false,
			},
			navigation: {
			  nextEl:'.swiper-button-next',
			  prevEl:'.swiper-button-prev',
			},
			thumbs: {
				swiper:btmSwiper,
			},
		});
	}
	

	const faqTit = $('.sub_qna ul .list_tit'),
		  faqCon = $('.sub_qna ul .con');
	
	faqTit.on('click', function(){
		if ($(this).is('.on')){
			$(this).removeClass('on').siblings(faqCon).slideUp();
			
		}else{
			faqTit.removeClass('on').siblings(faqCon).slideUp();
			$(this).addClass('on').siblings(faqCon).slideDown();
		}	
	}).eq(0).trigger('click');


	if($('.main_closely').length > 0) {		
		var container01 = document.getElementById('map01');

		var options = {
			center: new kakao.maps.LatLng(37.509602813387744, 127.03537330895604), 
			level: 3
		};
		 
		var map01 = new kakao.maps.Map(container01, options); 
		 
		
		var marker01 = new kakao.maps.Marker({
			position: map01.getCenter() 
		}); 
				
	
		marker01.setMap(map01);


		var container02 = document.getElementById('map02'); 

		var options = {
			center: new kakao.maps.LatLng(35.22225990008876,128.70084593462764), 
			level: 3 
		};
		 
		var map02 = new kakao.maps.Map(container02, options);
		 
		
		var marker02 = new kakao.maps.Marker({
			position: map02.getCenter() 
		}); 
				
	
		marker02.setMap(map02);

		var container03 = document.getElementById('map03'); 

		var options = {
			center: new kakao.maps.LatLng(35.09864815111382,128.90884396924852), 
			level: 3 
		};
		 
		var map03 = new kakao.maps.Map(container03, options);
		 
		
		var marker03 = new kakao.maps.Marker({
			position: map03.getCenter() 
		}); 
				
	
		marker03.setMap(map03);


		var container04 = document.getElementById('map04'); 

		var options = {
			center: new kakao.maps.LatLng(35.537545350065095,129.3265349846283), 
			level: 3 
		};
		 
		var map04 = new kakao.maps.Map(container04, options);
		
	
		var marker04 = new kakao.maps.Marker({
			position: map04.getCenter() 
		}); 
				
		marker04.setMap(map04);
	}

	
	
	 
	// 지도가 정상적으로 호출되지 않을 때
	function relayout() {
		map01.relayout();
		map01.setCenter(new daum.maps.LatLng(37.509602813387744, 127.03537330895604));
		map02.relayout();
		map02.setCenter(new daum.maps.LatLng(35.22225990008876,128.70084593462764));
		map03.relayout();
		map03.setCenter(new daum.maps.LatLng(35.09864815111382,128.90884396924852));
		map04.relayout();
		map04.setCenter(new daum.maps.LatLng(35.537545350065095,129.3265349846283));
	}
	 
	 $('.main_closely .tab_btn li').on('click', function(){
		let i = $(this).index();
		
		$('.main_closely .tab_btn li').removeClass('active').eq(i).addClass('active');
		$('.main_closely .tab_con > div').hide().eq(i).show();
		
		relayout();
	}).eq(0).trigger('click');
	
	 
	$win.on('resize', function(){
		if ($('.main_closely').length > 0){        
			relayout();
		}    
	});
	



	$('.point_reand ul li').on('mouseenter', function(e){
		if ($win.width() > 1025){
			$(this).closest('ul').addClass('show');

			$(this).is('.on') ? $(this).removeClass('on') : $(this).addClass('on').siblings('li').removeClass('on');

			if(!$('.point_reand ul li').is('.on')) $(this).closest('ul').removeClass('show');	
		} else {
			e.preventDefault();
			
			$(this).closest('ul').removeClass('show');
			$('.point_reand ul li').removeClass('on');
		}
	}).eq(0).trigger('mouseenter')

	

	// 메인 - 업무 분야 리스트
	$('.bank_transfer ul li').on('mouseenter', function(){
		if (isPc == false) return false;

		let thisIdx = $(this).index();
		
		$('.bank_transfer').attr('data-bg','bank_bg' + thisIdx);
		$('.tit_change h3').hide().eq(thisIdx).show();
		$('.bank_transfer ul li').removeClass('active').eq(thisIdx).addClass('active');

	}).eq(0).trigger('mouseenter')




	$('.main_closely ul li').on('mouseenter', function(){
		if (isPc == false) return false;
		
		let thisIdx = $(this).index();
		
		$('.main_closely').attr('data-bg','store' + thisIdx);
		$('.main_closely ul li').removeClass('active').eq(thisIdx).addClass('active');
		

	}).eq(0).trigger('mouseenter');


	
	// 퀵메뉴 툴팁
	const toolTip = $('.tooltip');

	if (toolTip.length > 0){
		toolTip.tooltip({
			position: {
				my: "left center",
				at: "right center",	
			},
		});
	}
	
	if ($('.free_diagnosis_new').length > 0){
		// 기존 무료진단 수정 버전 js
		const StepBoxWrap = $('.free_diagnosis_new .board_wrap .inquiry_wrap'),
			  StepBoxCon = StepBoxWrap.find('div[class^="step_"]'),
			  StepBoxFirstStep = StepBoxWrap.find('.step_00'),
			  StepBoxSixStep = StepBoxWrap.find('.step_06'),
			  StepBoxSixStepProgess = StepBoxSixStep.find('.progress_bar.forgiven_rate .circle_txt > p span'),
			  StepBoxLoadingEl = StepBoxWrap.find('.step_06_loading'),//로딩 바
			  StepBoxsRow = StepBoxWrap.find('>div .kboard-attr-row'),
			  StepBoxsCheckCon = StepBoxCon.find('.kboard-attr-row.chk_radio'),
			  nextStep = StepBoxCon.find('.next_step'),
			  prevStep = StepBoxCon.find('.prev_step');


		// 첫 화면 진입
		const openEl = $('.free_diagnosis_new .open_txt'),
			  openBtn = openEl.find('a'),
			  openNextCon = $('.free_diagnosis_new .open_con');

		openBtn.on('click',function(){
			//e.preventDefault();

			openEl.hide();
			openNextCon.fadeIn().addClass('show');
		});
		
		nextStep.each(function(){
			const thisBox = $(this).closest('.board_wrap').find('.inquiry_wrap > [class^="step_"]');
			
			$(this).on('click',function(e){
				e.preventDefault();
				
				let thisStep = $(this).parents('.board_btn_wrap').siblings('.kboard-attr-row');
					
				
				$(this).closest('div[class^="step_"]').next('div[class^="step_"]').fadeIn();

				if (thisStep.attr('type') == '' || thisStep.attr('type') == '소득 없음'){
					//선택 안하고 next클릭시
					if (thisStep.is('.step01')){
						//alert('월 평균 수입을 선택해주세요.');
						// 소득없음 에 따라 팝업 노출되게 해야할 때 사용할 부분
						if (thisStep.attr('type') == ''){
							alert('월 평균 수입을 선택해주세요.');
						}else if (thisStep.attr('type') == '소득 없음'){
							
							$('.step_no.nopay').fadeIn()//.addClass('next_show');
							$('.step_no.nopay').siblings('div').hide()//.removeClass('next_show');
						}
					}else if(thisStep.is('.step02')){
						alert('채무 금액을 선택해주세요.');
					}else if(thisStep.is('.step04')){
						alert('소유 재산을 선택해주세요.');
					}else if(thisStep.is('.step05')){
						alert('부양 가족을 선택해주세요.');
					}else if(thisStep.is('.step06')){
						alert('채무가 발생하게 된 원인을 선택해주세요.');
					}
				}else {				
					$(this).closest('div[class^="step_"]:not(.step_07)').hide()
					$(this).closest('div[class^="step_"]:not(.step_07)').next('div[class^="step_"]').addClass('next_show');
					$(this).closest('div.step_07').next('div[class^="step_"]').hide();
					
					if (StepBoxLoadingEl.is('.next_show')){
						// 2초후에 로딩 사라짐
						setTimeout(function(){
							StepBoxLoadingEl.hide().removeClass('next_show');
							StepBoxSixStep.fadeIn().addClass('next_show');
						}, 2000);
					}
				}

				if ($(this).parents('div').is('.step_07')){
					StepBoxSixStep.hide();
					if ($('.ok_form .board_wrap .inquiry_wrap #kboard-input-member-display').is('.no_inp')){
						alert('성함을 입력해주세요.');				
					}else if ($('.ok_form .board_wrap .inquiry_wrap #telephone').is('.no_inp')){
						alert('연락처를 입력해주세요.');
					}else if ($('.ok_form .board_wrap .inquiry_wrap #address').is('.no_inp')){
						alert('지역을 입력해주세요.');
					}else if ($('.ok_form .board_wrap .inquiry_wrap #chk-agree').is('.no_inp')){
						alert('개인정보수집에 동의해주세요.');
					}else {
						$('.ok_form .board_wrap .inquiry_wrap > .board_btn_wrap button[type="submit"]').trigger('click');
						setTimeout(function(){
							reStartForm();
							reSetKboard();
							$('.free_diagnosis_new .board_wrap .kboard-form .inquiry_wrap .step_07 input[type="text"]').val('');
							$('.free_diagnosis_new .board_wrap .kboard-form .inquiry_wrap .step_06 .con.case_iframe > iframe').remove();
							$('.free_diagnosis_new .open_con').removeClass('show');
							$('.free_diagnosis_new .open_txt').show();
						}, 500)
					}
				}

				
			});
		});

		StepBoxWrap.find('>div').each(function(i){
			const $this = $(this).find('.kboard-attr-row');

			let chkData;

			// 다중선택 값 넣기
			function inputEvent(chkEl){
				chkData = [];

				for (let i=0; i < chkEl.length; i++) {
					if(chkEl.eq(i).prop("checked")) chkData.push(chkEl.eq(i).closest('label').find('span').text())
				}

				chkData = chkData.join()

				return chkData
			}


			// 체크 된 답 텍스트 받기
			function answer(el,$this){
				el.attr('type','');

				let answer;

				$this.find('.con input[type="radio"] , .con input[type="checkbox"]').on('click',function(){
					let thisLabel = $(this).closest('label');
					let thisLabelWrap = $(this).closest('.chk_radio');
					let i = $(this).closest('label').index() + 1;

					answer = $(this).closest('.chk_radio').attr('type',$(this).closest('label').find('span').text());
					/* s: 240311 추가 */
					$(this).closest('.attr-value-label').siblings().removeClass('on');
					$(this).closest('.attr-value-label').addClass('on');
					/* e: 240311 추가 */

					
					// 최대금 설정
					if (thisLabel.find('span .max').attr('data-price') ){
						answer = thisLabelWrap.attr('type',thisLabel.find('span .max').attr('data-price'))
					}
				});
			}
		
			// 1단계
			if($(this).is('.step_01')){
				answer($this,$this)

				$(this).find('.board_btn_wrap .next_step').on('click',function(e){
					e.preventDefault();
					
					answer = $(this).closest('.board_btn_wrap').siblings('.step01').attr('type');
					/* s: 240311 추가 */
					let thisTxt = $('.free_diagnosis_new .board_wrap .inquiry_wrap .step_01 .kboard-attr-row.chk_radio .con label.on span').text();
					$(this).parents('.step_01').attr('type',thisTxt);
					/* e: 240311 추가 */
				
					// 결과 값 들어감
					$('.ok_form .board_wrap .inquiry_wrap #step01-1').val(answer);
				});
			}

			// 2단계
			if($(this).is('.step_02')){
				answer($this,$this)
				
				$(this).find('.board_btn_wrap .next_step').on('click',function(e){
					e.preventDefault();
					
					answer = $(this).closest('.board_btn_wrap').siblings('.step02').attr('type');
					/* s: 240311 추가 */
					let thisTxt = $('.free_diagnosis_new .board_wrap .inquiry_wrap .step_02 .kboard-attr-row.chk_radio .con label.on span').text();
					$(this).parents('.step_02').attr('type',thisTxt);
					/* e: 240311 추가 */

					// 결과 값 들어감
					$('.ok_form .board_wrap .inquiry_wrap #step02-1').val(answer);			
				});
			}

			// 3단계
			if($(this).is('.step_03')){
				//다중 선택 가능
				answer($this,$this)

				const etcInput = $('.step_03 .attr-value-label'),
					  chkItem = $('input[name="kboard_option_step04-1"]'); // 알게된 경로 체크 아이템
					
				chkItem.each(function(){
					$(this).on('click',function(){
						inputEvent(chkItem);
						
					});
				});

				$(this).find('.board_btn_wrap .next_step').on('click',function(e){
					e.preventDefault();

					answer = $(this).closest('.board_btn_wrap').siblings('.step04').attr('type');
					$('input#step04-1').val(chkData);
				});
			}

			// 4단계
			if($(this).is('.step_04')){
				//다중 선택 가능
				answer($this,$this)
				
				$(this).find('.board_btn_wrap .next_step').on('click',function(e){
					e.preventDefault();
					
					answer = $(this).closest('.board_btn_wrap').siblings('.step05').attr('type');
					
					// 결과 값 들어감
					$('.ok_form .board_wrap .inquiry_wrap #step05-1').val(answer);			
				});
			}

			// 5단계
			if($(this).is('.step_05')){
				//다중 선택 가능
				answer($this,$this)

				const etcInput = $('.step_05 .attr-value-label'),
					  chkItem = $('input[name="kboard_option_step06-1"]'); // 알게된 경로 체크 아이템
					
				chkItem.each(function(){
					$(this).on('click',function(){
						inputEvent(chkItem);
						
					});
				});

				$(this).find('.board_btn_wrap .next_step').on('click',function(e){
					e.preventDefault();

					answer = $(this).closest('.board_btn_wrap').siblings('.step05').attr('type');
					$('input#step06-1').val(chkData);
				});
			}

			// 개인회생 탕감률, 변제기간 계산
			if($(this).is('.step_06')){
				//다중 선택 가능
				answer($this,$this)

				$('.step_05 .board_btn_wrap .next_step').on('click',function(e){
					e.preventDefault();
					
					let monthRepaid, //월 변제금
						monthPay = $('.ok_form .board_wrap .inquiry_wrap #step01-1').val(), //월 소득
						allDebt = $('.ok_form .board_wrap .inquiry_wrap #step02-1').val(), //총채무액
						countNum = $('.ok_form .board_wrap .inquiry_wrap #step05-1').val(), // 부양가족
						liveCost, //생계비
						allRepaid, // 총변제금
						period; // 탕감율

						monthPay = Number(monthPay.replaceAll(',','')); // , 제거 + 숫자열로 type 변경
						allDebt = Number(allDebt.replaceAll(',','')); // , 제거 + 숫자열로 type 변경
						
						// 부양가족에 따른 생계비 설정
						if (countNum == '없음'){
							liveCost = 1435208; //1인생계비
						}else if (countNum == '1명'){
							liveCost = 2359595; //2인생계비
						}else if (countNum == '2명'){
							liveCost = 3015212; //3인생계비
						}else if (countNum == '3명'){
							liveCost = 3658664; //4인생계비
						}else if (countNum == '4명 이상'){
							liveCost = 4264915; //5인생계비
						}

						//liveCost = Number(liveCost);
						//console.log(liveCost);
						//console.log($.type(liveCost));

					monthRepaid = monthPay - liveCost; // 월 변제금
					//console.log('월변제금 : ' + monthRepaid);

					//console.log(monthRepaid);

					allRepaid = monthRepaid*36; //총 변제금
					//console.log('총 변제금 : ' + allRepaid);

					period = ((allDebt - allRepaid)/allDebt)*100 //탕감율
					period = period.toFixed(2);
					period = Math.round(period);
					//console.log('탕감율 : ' + period + '%');
					
					//console.log(period);
					if (period >= 100){
						period = 100;
					}

					// 탕감율이 -(마이너스) 이거나, 100이상일땐 100%로 표기
					if (period < 0 || period == 'NaN' || period >= 95 || monthRepaid < 0){
						period = 0;
						// 계산 이슈 결과 표현 개선 -(마이너스) 또는 0일땐 결과페이지 x + 고객센터연락 alert창  (추후 팝업) 
						$('.step_05').hide();
						$('.step_06').removeClass('next_show').hide();
						$('.step_06_loading').addClass('next_show').fadeIn();
						
						setTimeout(function(){
							$('.step_06').removeClass('next_show').hide().fadeOut();
							//$('.step_06_loading').addClass('next_show').fadeIn();
							$('.step_no.result_minus').addClass('next_show').fadeIn();
						},2000);
					}/*else if (period >= 100){
						period = 100;
					}*/

					$('.ok_form .board_wrap .inquiry_wrap #period').val('36개월'); //변제기간
					$('.ok_form .board_wrap .inquiry_wrap #forgive').val(period + '%'); //탕감율
					$('.free_diagnosis_new .progress_bar.forgiven_rate .circle_txt > p > span').text(period); //탕감율

					let pay = $('.free_diagnosis_new .board_wrap .inquiry_wrap > .step_01').attr('type'), /* 240311 수정*/
						debt = $('.free_diagnosis_new .board_wrap .inquiry_wrap > .step_02').attr('type'), /* 240311 수정*/
						dependent = $('.ok_form .board_wrap .inquiry_wrap input#step05-1').val(),
						property = $('.ok_form .board_wrap .inquiry_wrap input#step04-1').val(),
						keyword = $('.ok_form .board_wrap .inquiry_wrap input#step06-1').val();
						
					$('.free_diagnosis_new .board_wrap .inquiry_wrap .step_06 .counsel_li li.pay > span').text(pay);
					$('.free_diagnosis_new .board_wrap .inquiry_wrap .step_06 .counsel_li li.debt > span').text(debt);
					$('.free_diagnosis_new .board_wrap .inquiry_wrap .step_06 .counsel_li li.dependent > span').text(dependent);
					$('.free_diagnosis_new .board_wrap .inquiry_wrap .step_06 .counsel_li li.property > span').text(property);
					$('.free_diagnosis_new .board_wrap .inquiry_wrap .step_06 .counsel_li li.keyword > span').text(keyword);

					// 프로그래스 바
					const bar = StepBoxSixStep.find('.progress_bar:not(.period) .bar'),
						  value = StepBoxSixStep.find('.progress_bar:not(.period) .value');

					let RADIUS = 65;
					let CIRCUMFERENCE = 2 * Math.PI * RADIUS;

					bar.css('stroke-dasharray',CIRCUMFERENCE);
					progress(period);

					function progress(per) {
						const progress = per / 100;
						const dashoffset = CIRCUMFERENCE * (1 - progress);
						
						StepBoxSixStepProgess.text(per) //퍼센트 값 value
						bar.css('stroke-dashoffset',dashoffset);

						if (per > 100){
							bar.css('stroke-dashoffset',0);
						}
					}
					
					let iframeResult;
					keyword = keyword.replace(",","+"); // 검색이 되도록 변경
					keyword = keyword.replace("·","+"); // 검색이 되도록 변경
					if (keyword == '기타'){
						iframeResult = '<iframe src="https://smileagain4u.com/success_crl/" frameborder="0" scrolling="no"></iframe>';	
					}else {
						iframeResult = '<iframe src="https://smileagain4u.com/success_crl/?pageid=1&mod=list&keyword='+ keyword + '" frameborder="0" scrolling="no"></iframe>';	
					}

					$('.free_diagnosis_new .board_wrap .kboard-form .inquiry_wrap .step_06 .con.case_iframe').append(iframeResult);

					$("iframe").on("load", function(){
						let thisLi = $(this).contents();
						thisLi.find('#step06 .result_list li').on("click", function(){
							let thisPop = $(this).attr('pop-link'),
								loadingImg = '<div class="free_diagnosis_new loading_form"> <div class="loading"> <div class="loader"> <svg class="circle_loader" viewBox="25 25 50 50"> <circle class="path" cx="50" cy="50" r="20" fill="none" stroke="rgba(255,128,0,1)" stroke-width="4" /> <circle  cx="50" cy="50" r="20" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="4" /> </svg> </div><p>잠시만 기다려 주세요!</p> </div> </div>'; 

							$('#wrap').append('<div class="result_popwrap"><div class="result_pop">'+loadingImg+'<iframe src="https://smileagain4u.com/'+thisPop+'"frameborder="0" scrolling="yes"></iframe><button type="button"></button></div></div>');	
							$(document).ready(function(){
								//팝업 내 게시판 document 로딩 감지
								$('.result_pop iframe').on("load", function(){
									$('.result_pop .loading_form').remove();
								});
							});
						});
						
						//iframeResponCss(thisLi);
						$(window).on('resize load', function(){
							iframeResponCss(thisLi);
						}).resize()
					});
						
					$(document).on('click','.result_popwrap button', function(){
						$(this).closest('.result_popwrap').remove();
					});
					
				});
			}
			
			// 성공사례 불러오는 부분 반응형 css 맞추기
			function iframeResponCss(target) {
				if($(window).width() < 1025){
					//console.log('aaa');
					target.find('#step06').css({ 'width':'100%', 'white-space':'nowrap', 'overflow-x':'auto' });
					target.find('#step06 .result_list').css({ 'display':'block', 'white-space':'nowrap', 'overflow-x':'auto' });
					target.find('#step06 .result_list li').css({ 'display':'inline-block', 'max-width':'156px', 'height':'156px', 'vertical-align':'top' });
					if($(window).width() < 480){
						//console.log('aaa');
						target.find('#step06 .result_list li').css({ 'height':'115px' });
					}

				}else if($(window).width() > 1024){
					target.find('#step06').css({ 'width':'548px', 'white-space':'inherit', 'overflow':'hidden' });
					target.find('#step06 .result_list').css({ 'display':'flex', 'white-space':'nowrap', 'overflow-x':'inherit' });
					target.find('#step06 .result_list li').css({ 'display':'inherit', 'max-width':'inherit', 'height':'190px', 'vertical-align':'inherit' });
				}
			}
			
			$('.ok_form .board_wrap .inquiry_wrap #telephone').addClass('no_inp');
			$('.ok_form .board_wrap .inquiry_wrap #kboard-input-member-display').addClass('no_inp');
			$('.ok_form .board_wrap .inquiry_wrap #address').addClass('no_inp'); //240306 추가
			$('.ok_form .board_wrap .inquiry_wrap #chk-agree').addClass('no_inp');
			// 이름, 연락처 넣는 곳
			if($(this).is('.step_07')){
				$(this).find('input#member_display_no').on('input', function(){
					let thisVal = $(this).val(),
						inquiryName = $('.ok_form .board_wrap .inquiry_wrap #kboard-input-member-display');
					// 결과 값 들어감
					inquiryName.val(thisVal);	

					if (inquiryName.val()){
						inquiryName.removeClass('no_inp').addClass('enter_inp');
					}else {
						inquiryName.removeClass('enter_inp').addClass('no_inp');
					}
				});
				$(this).find('input#telephone_no').on('input', function(){
					let thisVal = $(this).val();
						inquiryTel = $('.ok_form .board_wrap .inquiry_wrap #telephone');
					// 결과 값 들어감
					inquiryTel.val(thisVal);	

					if (inquiryTel.val()){
						inquiryTel.removeClass('no_inp').addClass('enter_inp');
					}else {
						inquiryTel.removeClass('enter_inp').addClass('no_inp');
					}
				});
				// s: 240306 추가
				$(this).find('input#addr_no').on('input', function(){
					let thisVal = $(this).val();
						inquiryAdr = $('.ok_form .board_wrap .inquiry_wrap #address');
					// 결과 값 들어감
					inquiryAdr.val(thisVal);	

					if (inquiryAdr.val()){
						inquiryAdr.removeClass('no_inp').addClass('enter_inp');
					}else {
						inquiryAdr.removeClass('enter_inp').addClass('no_inp');
					}
				});
				// e: 240306 추가
				$(this).find('input#chk_agree').on('change', function(){
					if ($(this).is(':checked')){
						$('.ok_form .board_wrap .inquiry_wrap #chk-agree').val('동의함').removeClass('no_inp').addClass('enter_inp');	
					}else {
						$('.ok_form .board_wrap .inquiry_wrap #chk-agree').val('').removeClass('enter_inp').addClass('no_inp');	
					}
				});
			}
		});


		// 다음 설문으로 이동
		prevStep.each(function(){
			$(this).on('click',function(e){
				e.preventDefault();
				$(this).closest('div[class^="step_"]').fadeOut()
				$(this).closest('div[class^="step_"]').prev('div[class^="step_"]').fadeIn();

				//$(this).closest('div[class^="step_"]').prev('div[class^="step_"]').addClass('next_show').removeAttr('style').next('div[class^="step_"]').removeAttr('style').css('transition','inherit').removeClass('next_show')
			});
		});

		// 뒤로가기로 다시 오면 항목선택되어있는 부분 초기화 시키기
		window.onpageshow = function(event){
			if(event.persisted || (window.performance && window.performance.navigation.type == 2)){
				reStartForm();
				reSetKboard();
				$('.free_diagnosis_new .progress_bar.forgiven_rate .circle_txt > p > span').text('??');
				$('.free_diagnosis_new .board_wrap .inquiry_wrap .step_00 .progress_wrap .circle_txt p span').text('??');
				$('.free_diagnosis_new .board_wrap .kboard-form .inquiry_wrap .step_06 .con.case_iframe > iframe').remove();
			}
		}

		//초기화버튼 클릭시
		$('.reset_btn').each(function(){
			$(this).on('click',function(e){
				e.preventDefault();
				
				reStartForm();
				reSetKboard();
				$('.free_diagnosis_new .progress_bar.forgiven_rate .circle_txt > p > span').text('??');
				$('.free_diagnosis_new .board_wrap .inquiry_wrap .step_00 .progress_wrap .circle_txt p span').text('??');
				$('.free_diagnosis_new .board_wrap .kboard-form .inquiry_wrap .step_06 .con.case_iframe > iframe').remove();
			});
		});


		function reStartForm() {
			StepBoxCon.show();
			StepBoxCon.hide()//.removeClass('next_show');
			StepBoxsRow.find('input[type="radio"]').prop('checked',false);
			StepBoxsRow.find('input[type="checkbox"]').prop('checked',false);
			StepBoxsRow.attr('type','');
			StepBoxFirstStep.show();
		}
		
		// 초기화 버튼 킬릭시 진짜 데이터 받는 폼도 리셋하기
		function reSetKboard() {
			$('.ok_form .board_wrap .inquiry_wrap input[type="text"]:not(#title)').val(''); // 제목빼고 모두 리셋
		}
	}
	
	$('.top_btn').on('click', function(e){
		e.preventDefault();
		$(this).attr('href').replace("#","");

		$('html, body').animate({
			scrollTop:0
		}, 500);
	});

	/*let thisLoca = window.location.search;

	if (thisLoca.match('document')){
		console.log('aaaa');
	}*/
	
	//
	$win.on('resize',function(){
		if ($win.width() < 1025){
			// mo
			isPc = false;	

			
		}else{
			// pc
			isPc = true;
			
		}
		
	}).resize();

});