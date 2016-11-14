/* Common JS */
$(document).ready(function () {

	clearPlaceholder();
	initValidator();
	initModals();
	initSlider($('.js-slider'));
	scrollBottom($('.js-scroll-btn'));
	initCounter($('.js-counter'));
	initPhoneMask($('.js-phone-mask'));

	function initModalClose() {
		var modal = $('.js-modal'),
			closeBtn = $('.js-modal-close');

		closeBtn.on('click', function () {
			$(this).closest(modal).fadeOut(function () {
				$('body').removeClass('is-locked');
				$(this).remove();
				$('form').trigger('reset');
			});
		});

		modal.on('click', function (e) {
			if (!$(this).is(e.target)) {
				//code here
			} else {
				$(this).fadeOut(function () {
					$('body').removeClass('is-locked');
					$(this).remove();
				});
			}
		});
	}

	function initModals() {
		var modalBtn = $('.js-init-modal');
		modalBtn.on('click', function (e) {
			var _thisBtn = $(this);
			e.preventDefault();
			var ref = _thisBtn.data('href');
			$('body').addClass('is-locked');
			$.get('modals/' + ref + '.html', function (data) {
				$('body').append(data);
				$('.modal').fadeIn();
				initPhoneMask($('.js-phone-mask'));
				initValidator();
				initModalClose();
			});
		});
	}

	function initValidator() {
		$.validate({
			validateOnBlur : true,
			showHelpOnFocus : false,
			addSuggestions : false,
			scrollToTopOnError: false,
			borderColorOnError : '#FF0000'
		});
	}

	function initPhoneMask(element){
		var phoneInput = element;

		phoneInput.mask("+9 (999) 999 - 99 - 99");

		//SET CURSOR POSITION
		$.fn.setCursorPosition = function(pos) {
			this.each(function(index, elem) {
				if (elem.setSelectionRange) {
					elem.setSelectionRange(pos, pos);
				} else if (elem.createTextRange) {
					var range = elem.createTextRange();
					range.collapse(true);
					range.moveEnd('character', pos);
					range.moveStart('character', pos);
					range.select();
				}
			});
			return this;
		};

		phoneInput.on('focus', function(){
			var _this = $(this);

			setTimeout(function() {
				_this.setCursorPosition(1);
			},100);
		});
	}

	function clearPlaceholder() {
		var el = $('input, textarea');
		el.focus(function () {
			$(this).data('placeholder', $(this).attr('placeholder'));
			$(this).attr('placeholder', '');
		});
		el.blur(function () {
			$(this).attr('placeholder', $(this).data('placeholder'));
		});
	}

	function initSlider(slider) {
		initSlickSlider(slider);
		toggleSlider(1024, slider);
		$(window).resize(function () {
			toggleSlider(1024, slider);
		});

		function toggleSlider(breakpoint, slider) {
			if ($(window).width() < breakpoint) {
				if (!slider.hasClass('slick-initialized')) {
					initSlickSlider(slider);
				}
			} else {
				slider.slick('unslick');
			}
		}

		function initSlickSlider(slider) {
			slider.slick({
				slidesToShow: 2,
				slidesToScroll: 1,
				prevArrow: '<button type="button" class="slick-prev"><span class="slider-arrow slider-arrow_left"></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span class="slider-arrow slider-arrow_right"></span></button>',
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
		}
	}

	function scrollBottom(button) {
		button.on('click', function () {
			var distance,
				scrollTime;

			distance = $(document).height() - $(window).height();
			scrollTime = (distance - $(window).scrollTop()) / 3;
			$('body, html').animate({scrollTop: distance}, scrollTime);
		});
	}

	function initCounter(element) {
		element.each(function () {
			var hour = $(this).data('hour'),
				min = $(this).data('min'),
				sec;

			sec = (hour * 60 + min) * 60;

			$(this).countdown({
				until: sec,
				format: 'HM',
				layout: '<div class="count__circle"><div class="count__circle-in">{h<}<div class="count__number js-counter-hour">{hn}</div><div class="count__desc">{hl}</div>{>h} </div></div><div class="count__circle"><div class="count__circle-in">{m<}<div class="count__number js-counter-minute">{mn}</div><div class="count__desc">{ml}</div>{>m}</div></div>'
			});
		});
	}

});