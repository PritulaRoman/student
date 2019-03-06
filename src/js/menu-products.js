import $ from "jquery";
import axios from "axios";

const getActiveLink = () => {
 $('.box-link--products').first().find('.box-link__item--products').addClass('box-link__item--products-active');
};

export const buildMenuProducts = () => {
  //Products header cards
  const $boxHeaderProductsCards = $('.js-menu-products');

  //Products page
  axios.get('https://jsonblob.com/api/2574b956-3e90-11e9-bd88-d79040dc99f3')
      .then((response) => {
        const headerProductCardsData = response.data.header;
        const headerProductsCards = headerProductCardsData.map(({title, href, color}) => {
          return `
          <div class="box-link box-link--products" style='border-top: 8px solid ${color}'>
					  <a href="${href}" class="box-link__item box-link__item--products" >${title}</a>
				  </div>`;

        }).join('');
        $boxHeaderProductsCards.html(headerProductsCards);

        getActiveLink();
      })
      .catch(() => {
        $boxHeaderProductsCards.html("Sorry this API not available!!!");
      });
};
