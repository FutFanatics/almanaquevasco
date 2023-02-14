(function($){

	var containershirt= $('.shirt__slick')
	var containerwin = $(".win__slick")
	var containerhistory = $(".slick__history")
	var containeridols = $(".slick__idols")
	var containershield = $(".slick__shield")

	containershirt.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: true,
		dots: false,
		prevArrow: $('.slick-nav_shirt').find('.slick-prev'),
        nextArrow: $('.slick-nav_shirt').find('.slick-next'),
		adaptiveHeight: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	}).on('afterChange', function(event, slick, currentSlide, nextSlide){
		var current = currentSlide + 1;
		$('.slick-nav_shirt').find('.slick-numbers .current').html(current < 10 ? "0" + current : current)}
);
	containeridols.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: true,
		dots: false,
		adaptiveHeight: true,
		prevArrow: $('.slick-nav_idols').find('.slick-prev'),
        nextArrow: $('.slick-nav_idols').find('.slick-next'),
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	}).on('afterChange', function(event, slick, currentSlide, nextSlide){
		var current = currentSlide + 1;
		$('.slick-nav_idols').find('.slick-numbers .current').html(current < 10 ? "0" + current : current)}
);
	containershield.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: false,
		dots: false,
		adaptiveHeight: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	});

	containerwin.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: false,
		dots: false,
		adaptiveHeight: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	});

	containerhistory.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: true,
		dots: false,
		adaptiveHeight: true,
		prevArrow: $('.slick-nav_historia').find('.slick-prev'),
        nextArrow: $('.slick-nav_historia').find('.slick-next'),
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	}).on('afterChange', function(event, slick, currentSlide, nextSlide){
		var current = currentSlide + 1;
		$('.slick-nav_historia').find('.slick-numbers .current').html(current < 10 ? "0" + current : current)}
);

	function copyToClipboard(element) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val($(element).text()).select();
		document.execCommand("copy");
		$temp.remove();
	}

	$('.name-cupom').on('click', function() {
		var $el = $(this)
		copyToClipboard($el .find('.cupom'));
		$($el).addClass('copied');
		setTimeout(function() {
			$($el).removeClass('copied');
		}, 3000);
	});

	$('.c-modalVote form').on('submit', function(event) {
		console.log('clickou');
		event.preventDefault();

		var form = $(this);
		var formData = form.serialize();
		var url = 'https://apiinfra.futfanatics.app/voto-top10';
		// var url = 'http://localhost/api-infra/voto-top10';

		form.find('.msg-resp').html('').removeClass('text-success text-danger text-info').slideUp();

		if (!form.find('select').val()) {
			form.find('.msg-resp').html('Escolha o seu time.').addClass('text-info').slideDown();
			return false;
		}

		console.log(formData);
	
		$.post(url, formData, function(response) {
			if (response.status) {
				form.find('.msg-resp').html('Boa jogada, e-mail cadastrado com sucesso!').addClass('text-success').slideDown();

				setTimeout(function() {
					var selected = $('.list-camisas .item.selected');

					$('#modal-votar').modal('hide');
					$('.col-content').addClass('d-none');
					$('.col-cupom').addClass('active');
					$('html, body').animate({
                		scrollTop: ($('#voto-concluido').offset().top - $('#header').height() - $('.header-nav').height() - 50)
                		// scrollTop: 0
            		}, 800);
				}, 1000);
			} else {
				form.find('.msg-resp').html('Desculpe-nos, ocorreu um erro ao cadastrar.').addClass('text-danger').slideDown();
				console.log('Error form dinamize: ' + response.error_msg.result);
			}
		}).fail(function(response) {
			form.find('.msg-resp').html(response.responseJSON.errorMsg).addClass('text-danger').slideDown();
		});

		return false;
	});

	$('.title-idols').on('click',function(){
		$('.title-idols').addClass('active');
		$('.content-title').addClass('active');
		$('.content-about').removeClass('active');
		$('.about').removeClass('active');
	});
	$('.about').on('click',function(){
		$('.about').addClass('active');
		$('.content-about').addClass('active');
		$('.content-title').removeClass('active');
		$('.title-idols').removeClass('active');
	})

	$('.see-more').on('click', function() {
		console.log($(this).siblings('.content-history').hasClass('active'));

		multiSlideAdaptiveHeight($('.slick__history'));

		if (!$(this).siblings('.content-history').hasClass('active')) {
			$(this).html('Mostrar menos -');
			$(this).siblings('.content-history').addClass('active');
		} else { 
			$(this).html('Mostrar mais +');
			$(this).siblings('.content-history').removeClass('active');
		}
		return false;
	});

	$('.slick__history').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		if (window.innerWidth < 768) {

			$('html, body').animate({
                scrollTop: $(this).offset().top - 102
            }, 800);
		}
	});




	
    function multiSlideAdaptiveHeight(slider) {

        var activeSlides = [];
        var tallestSlide = 0;
        
        setTimeout(function() {
        
            $('.slick-track .slick-active', slider).each(function(item) {
                activeSlides[item] = $(this).outerHeight();
            });
        
            activeSlides.forEach(function(item) {
            	if (item > tallestSlide) {
					tallestSlide = item;
				}
			});
        
			$('.slick-list', slider).height(tallestSlide);
        }, 10);
    }

})(jQuery);

