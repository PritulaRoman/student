import $ from "jquery";

const initSearch = () => {
  const $bounder = $('.js-bounder');
  const $btnSearch = $bounder.find('.js-search-btn');
  const $inputSearch = $bounder.find('.js-search');
  const activeCssClass = 'box-bands--active';

  $btnSearch.on("click", function () {
    $bounder.addClass(activeCssClass);
    $inputSearch.focus();
  });

  $inputSearch.on("blur", function(){
    $bounder.removeClass(activeCssClass);
  });
};

export default initSearch;