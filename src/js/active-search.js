import $ from "jquery";


const initSearch = () => {
  $('.js-search-btn').click(function (event) {
      let x = $('.js-search-btn').parents('.box-bands').addClass('box-bands--active');
      console.log(x);

  });
};

export default initSearch;