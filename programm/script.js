setTimeout(function(){
  var obj = searchToObject();
  if (obj.landing_id) {
    LP.CORE.selectPackage( $('[data-id="'+ obj.landing_id +'"]') )
  }
  
}, 1500);


autoPriceChange('[data-price]','[data-total-price]', '[data-deadline]');
$('#allrecords').after('<div id="copydel"></div>');
$('body').addClass('zoho_url');