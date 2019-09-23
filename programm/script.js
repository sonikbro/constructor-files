setTimeout(function(){
  var obj = searchToObject();
  if (obj.landing_id) {
    LP.CORE.selectPackage( $('[data-id="'+ obj.landing_id +'"]') )
  }
  
}, 1500);


autoPriceChange('[data-price]','[data-total-price]', '[data-deadline]');

if (!$('.bottom > .date:contains("Астана")').length > 0) {
$(".date").addClass("thisClass");} 
  else {
  $(".dateKZ").addClass("thisClass");
  };