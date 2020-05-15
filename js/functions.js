$(function(){
	// Проверка браузера
	if ( !supportsCssVars() ) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	// Ленивая загрузка
	setTimeout(function(){
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: function(el) {
				el.classList.add('loaded')
			}
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() +'px')


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs button', function(e) {
		e.preventDefault()

	    if( !$(this).hasClass('active') ) {
	    	let parent = $(this).closest('.tabs_container')
		    let activeTab = $(this).data('content')
        	let level = $(this).data('level')

		    parent.find('.tabs:first button').removeClass('active')
		    parent.find('.tab_content.' + level).removeClass('active')

		    $(this).addClass('active')
		    $(activeTab).addClass('active')
	    }
	})

	if( locationHash && $('.tabs_container').length ) {
		let activeTab = $('.tabs button[data-content='+ locationHash +']')
		let parent = activeTab.closest('.tabs_container')
    	let level = activeTab.data('level')

		parent.find('.tabs:first button').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		$(locationHash).addClass('active')

		$('html, body').stop().animate({
		   	scrollTop: $(locationHash).offset().top
		}, 1000)
	}


	// Мини всплывающие окна
	firstClick = false

	$('.mini_modal_link').click(function(e){
	    e.preventDefault()

	    let modalId = $(this).data('modal-id')

	    if( $(this).hasClass('active') ){
	        $(this).removeClass('active')
	        $(this).closest('.modal_cont').removeClass('open')
	      	$('.mini_modal').removeClass('active')

	        firstClick = false

			if( is_touch_device() ){
				$('body').css('cursor', 'default')
			}
	    }else{
	        $('.mini_modal_link').removeClass('active')
	        $(this).closest('.modal_cont').addClass('open')
	        $(this).addClass('active')

	        $('.mini_modal').removeClass('active')
	        $(modalId).addClass('active')

	        firstClick = true

			if( is_touch_device() ){
				$('body').css('cursor', 'pointer')
			}
	    }
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(function(e){
	    if ( !firstClick && $(e.target).closest('.mini_modal').length == 0 ){
	    	$('.modal_cont').removeClass('open')
	        $('.mini_modal, .mini_modal_link').removeClass('active')

			if( is_touch_device() ){
				$('body').css('cursor', 'default')
			}
	    }

	    firstClick = false
	})


	// Fancybox
	$.fancybox.defaults.hash = false
	$.fancybox.defaults.backFocus = false
	$.fancybox.defaults.autoFocus = false
	$.fancybox.defaults.animationEffect = 'zoom'
	$.fancybox.defaults.transitionEffect = 'slide'
	$.fancybox.defaults.speed = 500
	$.fancybox.defaults.gutter = 40
	$.fancybox.defaults.i18n = {
		'en' : {
			CLOSE: "Закрыть",
			NEXT: "Следующий",
			PREV: "Предыдущий",
			ERROR: "Запрошенный контент не может быть загружен.<br /> Пожалуйста, повторите попытку позже.",
			PLAY_START: "Запустить слайдшоу",
			PLAY_STOP: "Остановить слайдшоу",
			FULL_SCREEN: "На весь экран",
			THUMBS: "Миниатюры",
			DOWNLOAD: "Скачать",
			SHARE: "Поделиться",
			ZOOM: "Увеличить"
		}
	}

	// Увеличение картинки
	$('.fancy_img').fancybox({
		mobile:{
			clickSlide: "close"
		}
	})


	// Моб. версия
	if( $(window).width() < 360 ){
		$('meta[name=viewport]').attr('content', 'width=360px, user-scalable=no, minimum-scale=1, maximum-scale=1')
	} else {
		$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
	}


	// Моб. меню
	$('body').on('click', '.mob_header .mob_menu_link', function(e) {
    	e.preventDefault()

		$(this).addClass('active')
		//$('body').addClass('lock')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
    })

	$('body').on('click', 'header .close, .overlay', function(e) {
    	e.preventDefault()

    	$('.mob_header .mob_menu_link').removeClass('active')
		//$('body').removeClass('lock')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
    })


    if( is_touch_device() ){
    	$('header .menu .item > a.sub_link').addClass('touch_link')

    	$('body').on('click', 'header .menu .item > a.sub_link', function(e) {
    		if( $(this).next().css('visibility') == 'hidden' ) {
	    		e.preventDefault()

				$('header .menu .sub_menu').removeClass('show')

				$(this).next().addClass('show')
    		}
	    })
    }
})



// Вспомогательные функции
function setHeight(className){
    let maxheight = 0

    className.each(function() {
    	let elHeight = $(this).outerHeight()

        if( elHeight > maxheight ) {
        	maxheight = elHeight
        }
    })

    className.outerHeight( maxheight )
}


function is_touch_device() {
	return !!('ontouchstart' in window)
}


function widthScroll() {
    let div = document.createElement('div')
    div.style.overflowY = 'scroll'
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    let scrollWidth = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)

    return scrollWidth
}


var supportsCssVars = function() {
    var s = document.createElement('style'),
        support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}