import $ from "jquery";


const initSearch = () => {
  $('.js-search-btn').click(function () {
      $('.js-search-btn').closest('.box-bands').addClass('box-bands--active');
  });
};

export default initSearch;