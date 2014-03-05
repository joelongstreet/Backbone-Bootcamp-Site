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

  props['section1'] = {
    $skeletor : $('.skeletor'),
    $skeletorParts : $('.skeletor').find('img')
  };

  props['section2'] = {
    $section : $('#section-2'),
    $bone1 : $('#section-2').find('.bone-1'),
    $bone2 : $('#section-2').find('.bone-2'),
    $headline : $('#section-2').find('h2'),
    $copy : $('#section-2').find('p')
  };

  props['section3'] = {
    $section : $('#section-3'),
    $textItems : $('#section-3').find('li'),
    $bones : $('#section-3').find('img'),
    $boneWrapper : $('#section-3').find('.bones'),
    $headline : $('#section-3').find('h2')
  };

  props['section4'] = {
    $section : $('#section-4'),
    $bone1 : $('#section-4').find('.bone-1'),
    $bone2 : $('#section-4').find('.bone-2'),
    $h4 : $('#section-4').find('h4')
  };

  // Set up scrolling and make active when
  // items enter viewport
  $(window).scroll(function(){
    $sections.each(function(index, item){
      if(inViewport(item)){
        var methodName = 'section' + (index + 1);
        if(watchers[methodName])
          watchers[methodName](
            props[methodName],
            $(window).scrollTop()
          );
      }
    });
  });
});



watchers.section1 = function(opts, scrollPosition){
  // Set the bone parts
  $.each(opts.$skeletorParts, function(index, item){
    var reverseIndex = opts.$skeletorParts.length - index;
    var itemVal = -1*(reverseIndex * scrollPosition/10);
    $(item).css('transform', 'translateY(' + itemVal + 'px)');
  });

  // Move ther wrapper around for better visuals
  var wrapperVal = scrollPosition/10;
  opts.$skeletor.css('transform', 'translateY(' + wrapperVal + 'px)');
};


watchers.section2 = function(opts, scrollPosition){
  var bounds = opts.$section[0].getBoundingClientRect();

  var boneOffset = bounds.top/10;
  opts.$bone1.css('transform', 'translateY(' + -1*boneOffset + 'px)');
  opts.$bone2.css('transform', 'translateY(' + boneOffset + 'px)');

  var headlineOffset = bounds.top/5;
  opts.$headline.css('transform', 'translateX(' + headlineOffset + 'px)');
  opts.$copy.css('transform', 'translateX(' + -1*headlineOffset + 'px)');
};


watchers.section3 = function(opts, scrollPosition){
  var bounds = opts.$section[0].getBoundingClientRect();
  var offset = bounds.top/5;

  opts.$textItems.each(function(index, item){
    $(item).css('transform', 'translateX(' + offset*index + 'px)');
  });

  opts.$bones.each(function(index, item){
    $(item).css('transform', 'translateY(' + offset*index + 'px)');
  });

  opts.$boneWrapper.css('transform', 'translateY(' + offset + 'px)');
  opts.$headline.css('transform', 'translateX(' + offset + 'px)');
};


watchers.section4 = function(opts, scrollPosition){
  var bounds = opts.$section[0].getBoundingClientRect();
  var offset = bounds.top/1.5;
  var zoom = bounds.bottom/750;

  if(zoom < 1) zoom = 1;

  opts.$bone1.css('transform', 'translateX(' + offset + 'px)');
  opts.$bone2.css('transform', 'translateX(' + -1*offset + 'px)');
  opts.$h4.css('transform', 'scale(' + zoom + ')');
};


var inViewport = function(el){
  var rect = el.getBoundingClientRect();

  if(rect.bottom >= 0 && rect.bottom < window.innerHeight)
    return true;
  else if(rect.top >=0 && rect.top < window.innerHeight)
    return true;
  else return false;
};