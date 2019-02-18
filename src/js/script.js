
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    $('.carousel').carousel({
        interval: 8000
      })

      $('[data-add-to-cart]').click(function(e){
          alert ("اضيف المنتج الى عربة الشراء");
          e.stopPropagation();
      });
      $('.product-option input[type="radio"]').change(function() {
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
      })
});