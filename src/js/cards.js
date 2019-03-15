import $ from "jquery";
import axios from "axios";

const getLinksCard = (cardLinks = [], linkCssClass = '',  footerCssClass = '') => {
  return cardLinks.map(({title, href}) => {
    const link = `
			<div class="card__text ${footerCssClass}">
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
  const $boxHeaderCards = $('.js-menu');

  //Products footer cards
  const $boxFooterProductsCards = $('.js-box-cards-products');


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
        const footerCardLinks = getLinksCard(links, 'card__text--link-footer', 'card__text--footer');
        const footerCard = `
	  			<div class="card card--footer">
					<div class="card__title card__title--footer">
						${title}
					</div>
          <div class="card-wrapper-links card-wrapper-links--footer">
					  ${footerCardLinks}
          </div>
				</div>`;
        return footerCard;
      }).join('');
      $boxFooterCards.html(footerCards);
      return response;
    })
    .then((response) => {
      const footerCardsInformation = response.data.results;
      const footerCards = footerCardsInformation.map(({title, links}) => {
        const footerCardLinks = getLinksCard(links, 'card__text--link-footer-products');
        const footerCardProduct = `
        <div class="card card--footer">
        <div class="card__title card__title--footer card__title--footer-products">
          ${title}
        </div>
        <div class="card-wrapper-links card-wrapper-links--footer">
          ${footerCardLinks}
        </div>
      </div>`;
        return footerCardProduct;
      }).join('');
      $boxFooterProductsCards.html(footerCards);
      return response;
    })
    .then((response) => {
      const headerCardsData = response.data.header;
      const isMain = location.href.includes('index.html');

      const headerCardes = headerCardsData.map(({title, href, color}) => {
        let itemColor = color;
        let itemCssClass = '';
        const isActive = location.href.includes(href);

        if (!isMain) {
          const addCssClass = isActive ? ' box-link__item--active-page' : '';
          itemCssClass = `box-link__item--active${addCssClass}`;
          itemColor = isActive ? 'transparent' : '#768692';
        }

        return `<div class="box-link" style='border-top-color: ${itemColor}'>
                  <a href="./${href}" class="box-link__item ${itemCssClass}" >${title}</a>
                </div>`;

      }).join('');
      $boxHeaderCards.html(headerCardes);
      // $('.box-link')
      //     .first()
      //     .css('border-color', 'transparent')
      //     .find('.box-link__item--active')
      //     .addClass('box-link__item--active-page');
    })

    .catch(err => {
      console.log(err);
      $boxCards.add($boxFooterCards).html("Sorry this API not available!!!");
    });
};


