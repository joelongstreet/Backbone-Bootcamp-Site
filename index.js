var $skeletor = null;
var $skeletorParts = null;
var props = {};
var watchers = {};


$(function(){
  // Set odd elements as sticky
  $('#section-3').sticky();
  $('#section-5').sticky();
  $('#section-7').sticky();


  // Setup section props
  var $sections = $('section');
  $sections.each(function(index, item){
    var propName = 'section' + (index + 1);
    props[propName] = {};
  });

  props['section1'].$skeletor = $('.skeletor');
  props['section1'].$skeletorParts = $('.skeletor').find('img');


  // Set up scrolling and make active when
  // items enter viewport
  $(window).scroll(function(){
    $sections.each(function(index, item){
      if(inViewport(item)){
        var methodName = 'section' + (index + 1);
        if(watchers[methodName])
          watchers[methodName]();
      }
    });
  });
});



watchers.section1 = function(){
  var scrollPosition = $(window).scrollTop();
  var $skeletor = props['section1'].$skeletor;
  var $skeletorParts = props['section1'].$skeletorParts;

  // Set the bone parts
  $.each($skeletorParts, function(index, item){
    var reverseIndex = $skeletorParts.length - index;
    var itemVal = -1*(reverseIndex * scrollPosition/10);
    $(item).css('transform', 'translateY(' + itemVal + 'px)');
  });

  // Move ther wrapper around for better visuals
  var wrapperVal = scrollPosition/10;
  $skeletor.css('transform', 'translateY(' + wrapperVal + 'px)');
};



var inViewport = function(el){
  var rect = el.getBoundingClientRect();

  if(rect.bottom >= 0 && rect.bottom < window.innerHeight)
    return true;
  else if(rect.top >=0 && rect.top < window.innerHeight)
    return true;
  else return false;
};