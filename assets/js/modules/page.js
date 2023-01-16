(function($){

	var containerinstruction= $('.instruction__slick')

	containerinstruction.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: false,
		dots: false,
		adaptiveHeight: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	});

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



})(jQuery);

