(function() {
	const getLinksCard = (cardLinks = []) => {
		return cardLinks.map(({ title, href }) => {
			const link = `
				<div class="card__text">
					<a href="${href}">${title}</a>
				</div>`;
			return link;
		}).join('');
	}

	const $boxCards = $('.js-box-cards');

	axios.get('https://jsonblob.com/api/1c066a98-2fd6-11e9-9080-df955f1091f2')
	  .then((response) => {
	  	const result = response.data.items;

	  	const cards = result.map(({ image, title, description, links }) => {
	  		const linksCard = getLinksCard(links);
	  		
			const card = `
				<div class="card">
					<div class="card__item card__img" style="background-image: url('./static/images/cards/${ image }')"></div>
					<div class="card__item card__title" name="api">${title}</div>
					<div class="card__text">
						${description}
					</div>
					${linksCard}
				</div>
			`;
			return card;
	  	}).join('');

	  	$boxCards.html(cards);
	  })
	

	  .catch((error) => {
	  	$boxCards.html("Sorry this API not available!!!");
	  });
})();

