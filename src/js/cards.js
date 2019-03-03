import $ from "jquery";
import axios from "axios";

const getLinksCard = (cardLinks = [], linkCssClass = '') => {
  return cardLinks.map(({title, href}) => {
    const link = `
			<div class="card__text">
				<a href="${href}" class="${linkCssClass}">${title}</a>
			</div>`;
    return link;
  }).join('');
};

export const buildCards = () => {
  const $boxCards = $('.js-box-cards');

  // Footer cards class
  const $boxFooterCards = $('.js-box-cards-footer');

  // Header cards
  const $boxHeaderCards = $('.box-menu');

  axios.get('https://jsonblob.com/api/1c066a98-2fd6-11e9-9080-df955f1091f2')
    .then((response) => {
      const result = response.data.items;

      const cards = result.map(({image, title, description, links}) => {
        const linksCard = getLinksCard(links || []);

        const card = `
				<div class="card">
					<div class="card__item card__img" style="background-image: url('./static/images/cards/${image}')"></div>
					<div class="card__wrapper-text">
            <div class="card__item card__title" name="api">${title}</div>
            <div class="card__description">
              ${description}
            </div>
            <div class="card-wrapper-links">
              ${linksCard}
            </div> 
          </div>
				</div>
			`;
        return card;
      }).join('');

      $boxCards.html(cards);
      return response;
    })
    // Footer cards
    .then((response) => {
      const footerCardsInformation = response.data.results;
      const footerCards = footerCardsInformation.map(({title, links}) => {
        const footerCardLinks = getLinksCard(links, 'card__text--footer');
        const footerCard = `
	  			<div class="card">
					<div class="card__title card__title--footer">
						${title}
					</div>
          <div class="card-wrapper-links">
					  ${footerCardLinks}
          </div>
				</div>`;
        return footerCard;
      }).join('');
      $boxFooterCards.html(footerCards);
      return response;
    })
    .then((response) => {
      const headerCardsData = response.data.header;
      const headerCardes = headerCardsData.map(({title, href, color}) => {
        const headerCard = `
	  			<div class="box-link" style='border-top: 8px solid ${color}'>
					<a href="${href}" class="box-link__item" >${title}</a>
				</div>`;
        return headerCard;
      }).join('');
      $boxHeaderCards.html(headerCardes);
    })


    .catch(() => {
      $boxCards.add($boxFooterCards).html("Sorry this API not available!!!");
    });
};


