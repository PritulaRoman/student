(function(){
	const getFooterLinksCards = (cardLinks = []) => {
		return cardLinks.map(({ title, href }) => {
			const link = `
		  				<div class="card__text">
							<a href="${href}" class="card__text--footer">
								${title}
							</a>
						</div>`;
			return link;
		}).join('');
	}

	const $boxFooterCards = $('.js-box-cards-footer');
	axios.get('https://jsonblob.com/api/1c066a98-2fd6-11e9-9080-df955f1091f2')
		 .then((response) => {
		  	const footerCardsInformation = response.data.results;
		  	const footerCards = footerCardsInformation.map(({ title, links}) => {
		  		const footerCardLinks = getFooterLinksCards(links);
		  		const footerCard = `
		  			<div class="card">
						<div class="card__title card__title--footer">
							${title}
						</div>
						${footerCardLinks}
					</div>`;
				return footerCard;
		  	}).join('')
		  	$boxFooterCards.html(footerCards);
		 })
		 .catch((error) => {
		 	$boxFooterCards.html("Sorry this API not available!!!");
		 });
})()
