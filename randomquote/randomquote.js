$(document).ready(function(){
  $('blockquote').hide();
  $('.load').show();
  getquote();
  $('#newquote').on('click',function(){
    $('blockquote').hide();
    $('.load').show();
    getquote();
  });
});
function getquote(){
  $.ajax({
    url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
    dataType: 'jsonp',
    success: function(data){
      $('.load').hide();
      $('blockquote').show();
      $('#quote').html(data.quoteText);
      if(data.quoteAuthor!==''){
        $('#author').html(data.quoteAuthor);
      }
      else{
        $('#author').html('Unknown');
      }
      $('#twitter').click(function(){
        window.open('https://twitter.com/intent/tweet?text='+
        encodeURIComponent(data.quoteText+' - '+data.quoteAuthor));
      });
    },
    error: function(){
      $('#quote').text('I\'m not sure what happened here. Click again!');
      $('#author').text('Service Team');
    }
  });
}
