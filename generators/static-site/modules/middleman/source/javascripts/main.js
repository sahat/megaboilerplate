$(document).ready(function() {
  $('.ui.menu .ui.dropdown').dropdown({ on: 'hover' });
  $('.ui.menu a.item').on('click', function() {
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active');
  });
  $('.ui.dropdown').dropdown();
  $('.ui.buttons .dropdown.button').dropdown({ action: 'combo' });
  $('.special.card .image').dimmer({ on: 'hover' });
  $('.star.rating').rating();
  $('.card .dimmer').dimmer({ on: 'hover' });
});
