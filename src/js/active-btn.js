import $ from "jquery";

let availableInedx = 0;

const initBtns = () => {
	$('.js-queue').click(function(event) {
		const $this = $(this);
		if(availableInedx === $this.data('index')) {
			$this.addClass('box-btn__item--active');
			availableInedx += 1;
		}

	});
};	

export default initBtns;


