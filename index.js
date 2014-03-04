$(function(){
  $('#section-3').sticky();
  $('#section-5').sticky();
  $('#section-7').sticky();

  var $skeletor = $('.skeletor');
  var $skeletorParts = $skeletor.find('img');

  $(window).scroll(function(){
    var scrollPosition = $(window).scrollTop();

    // Set the bone parts
    $.each($skeletorParts, function(index, item){
      var reverseIndex = $skeletorParts.length - index;
      var itemVal = -1*(reverseIndex * scrollPosition/10);
      $(item).css('transform', 'translateY(' + itemVal + 'px)');
    });

    // Move ther wrapper around for better visuals
    var wrapperVal = scrollPosition/10;
    $skeletor.css('transform', 'translateY(' + wrapperVal + 'px)');
  });
});