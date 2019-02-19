(function(){
	let availableInedx = 0;

	$('.js-queue').click(function(event) {
		if(availableInedx === $(this).data('index')) {
			$(this).addClass('box-btn__item--active');
			availableInedx += 1;
		}

	});
})()

