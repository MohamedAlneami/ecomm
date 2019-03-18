
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
      });

      $('[data-remove-from-cart]').click(function() {
          $(this).parents('[data-product-info]').remove();

          //أعد حساب السعر الاجمالي بعد حذف المنتجات
          calculateTotalPrice();
      })

      //عندما تتغير كمية المنتج
      $('[data-product-quantity]').change(function() {

          //اجلب الكمية الجديدة
          var newQuantity = $(this).val();

          //ابحث عن السطر الذي يحتوي معلومات عن هذا العنصر
          var $parent = $(this).parents('[data-product-info]');

          //اجلب سعر القطعة الواحدة من معلومات المنتج
          var PricePerUnit = $parent.attr('data-product-price');

          //السعر الاجمالي للمنتج هو سعر القطعة مضروبا بعددها
          var totalPricForProduct = newQuantity * PricePerUnit;

          //عين السعر الجديد ضمن خلية السعر الاجمالي للمنتج في هذا السطر
          $parent.find('.total-price-for-product').text(totalPricForProduct + '$');

          //حدث السعر الاجمالي لكل المنتجات
          calculateTotalPrice();
      });

      function calculateTotalPrice() {
          //انشئ متغيرا جديدا لحفظ السعر الاجمالي
          var totalPricForAllProducts = 0;

          //لكل سطر يمثل معلومات المنتج في الصفحة
          $('[data-product-info]').each(function() {

            //اجلب سعر القطعة الواحدة من الخاصية الموافقة
            var PricePerUnit = $(this).attr('data-product-price');

            //اجلب كمية الممنتج من حقل اختيار الكمية
            var quantity = $(this).find('[data-product-quantity]').val();

            //السعر الاجمالي للمنتج هو سعر القطعة مضروبا بعددها
            var totalPricForProduct = PricePerUnit * quantity;

            //اضف سعر هذا المنتج الى السعر الاجمالي لكل المنتجات واحفظ القيمة في المتغير نفسه
            totalPricForAllProducts = totalPricForAllProducts + totalPricForProduct;
          });

          //حدث السعر الاجمالي لكل المنتجات في الصفحة
          $('#total-price-for-all-products').text(totalPricForAllProducts + '$');
      };


      $( ".button-pay" ).click(function( event ) {
        event.preventDefault(); // هام لمنع السلوك الافتراضي
        
        $(location).attr('href', "payment.html");
      });


      var citiesByCountry = {
        sa: ['الرياض', 'جدة'],
        eg: ['القاهرة', 'الإسكندرية'],
        jo: ['عمان', 'الزرقاء'],
        sy: ['دمشق', 'حلب', 'حماه'],
      };

      //عندما يتغير البلد
      $('#form-checkout select[name="country"]').change(function() {

        //جلب رمز البلد
        var country = $(this).val();
        
        //جلب مدن هذه الدولة من المصفوفة
        var cities = citiesByCountry[country];
        
        //فرغ قائمة المدن
        $('#form-checkout select[name="city"]').empty();
        $('#form-checkout select[name="city"]').append(
          '<option disabled selected value="">اختر المدينة</option>'
        );

        //أضف المدن الى قائمة المدن
        cities.forEach(function(city) {
          var $newOption = $('<option></option>');
          $newOption.text(city);
          $newOption.val(city);

          $('#form-checkout select[name="city"]').append($newOption);
        });
      });

      //عندما تتغير طريقة الدفع
      $('#form-checkout input[name="payment_method"]').change(function() {
        //اجلب القيمة المختارة حالياً
        var paymentMethod = $(this).val();

        if (paymentMethod === 'on_delivery') {
          //اذا كانت عند الاستلام؛ فعطل حقول بطاقة الائتمان
          $('#credit-card-info input').prop('disabled', true);
        
        } else{
          //والا ففعلها
          $('#credit-card-info input').prop('disabled', false); 
        }

        //بدل معلومات بطاقة الائتمان بين الظهور والاختفاء
        $('#credit-card-info').toggle(); 

      });

});