$(function(){
	// Основной слайдер на главной
	$('.main_slider .slider').owlCarousel({
		items: 1,
		margin: 0,
		nav: true,
		dots: true,
		loop: true,
		smartSpeed: 700,
		autoplay: true,
		autoplayTimeout: 5000
	})


	// Слайдер в тексте
	$('.text_block .slider').owlCarousel({
		items: 1,
		margin: 0,
		nav: true,
		dots: true,
		loop: true,
		smartSpeed: 700
	})


	// About - слайдер
	$('.about .slider').owlCarousel({
		items: 1,
		margin: 0,
		nav: true,
		dots: false,
		loop: true,
		smartSpeed: 700
	})


	// Ховер по картинке
	$('.about .slider .img').mousemove(function(e) {
        let x = e.offsetX
        let y = e.offsetY
        let tooltip = $(this).find('.tooltip')

        tooltip.css('top', (y + 10))
        tooltip.css('left',  (x + 10))
    })


	// Отправка форм
	$('.main_slider .order .form').submit(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.order')

		parent.find('.form').hide()
		parent.find('.success').fadeIn(300)
	})


	$('.diplom .order .form').submit(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.order')

		parent.find('.form').hide()
		parent.find('.success').fadeIn(300)
	})


	$('.specialty .head .order .form').submit(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.order')

		parent.find('.form').hide()
		parent.find('.success').fadeIn(300)
	})


	// Шапка
	setTimeout(function(){
		headerHeight = $('header').innerHeight()

		$('header').wrap('<div class="header_wrap" style="height: ' + headerHeight + 'px"></div>')
	}, 50)
})


$(window).resize(function(){
	// Шапка
	setTimeout(function(){
		headerHeight = $('header').innerHeight()

		$('.header_wrap').height('auto')
		$('.header_wrap').height(headerHeight)
	}, 200)

	if( $(window).scrollTop() > headerHeight ) {
		$('header').addClass('fixed')
	} else {
		$('header').removeClass('fixed')
	}
})


$(window).scroll(function(){
	// Шапка
	setTimeout(function(){
		if( $(window).scrollTop() > $('header').innerHeight() ) {
			$('header').addClass('fixed')
		}else{
			$('header').removeClass('fixed')
		}
	}, 210)
})