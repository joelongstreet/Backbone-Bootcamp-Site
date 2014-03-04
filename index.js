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
  props['section2'].$section = $('#section-2');
  props['section2'].$bone1 = $('#section-2').find('.bone-1');
  props['section2'].$bone2 = $('#section-2').find('.bone-2');
  props['section2'].$headline = $('#section-2').find('h2');
  props['section2'].$copy = $('#section-2').find('p');


  // Set up scrolling and make active when
  // items enter viewport
  $(window).scroll(function(){
    $sections.each(function(index, item){
      if(inViewport(item)){
        var methodName = 'section' + (index + 1);
        if(watchers[methodName])
          watchers[methodName]($(window).scrollTop());
      }
    });
  });
});



watchers.section1 = function(scrollPosition){
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


watchers.section2 = function(scrollPosition){
  var $section = props['section2'].$section;
  var $bone1 = props['section2'].$bone1;
  var $bone2 = props['section2'].$bone2;
  var $headline = props['section2'].$headline;
  var $copy = props['section2'].$copy;
  var bounds = $section[0].getBoundingClientRect();

  var boneOffset = bounds.top/10;
  $bone1.css('transform', 'translateY(' + -1*boneOffset + 'px)');
  $bone2.css('transform', 'translateY(' + boneOffset + 'px)');

  var headlineOffset = bounds.top/5;
  $headline.css('transform', 'translateX(' + headlineOffset + 'px)');
  $copy.css('transform', 'translateX(' + -1*headlineOffset + 'px)');
};



var inViewport = function(el){
  var rect = el.getBoundingClientRect();

  if(rect.bottom >= 0 && rect.bottom < window.innerHeight)
    return true;
  else if(rect.top >=0 && rect.top < window.innerHeight)
    return true;
  else return false;
};