$(function() {
  // container
  container.style.height = window.innerHeight + 'px';

  // loading modal
  var animate = function($e, direction) {
    $e.each(function() {
      this.dataset.in && this.classList.remove(this.dataset.in);
      this.dataset.out && this.classList.remove(this.dataset.out);
      this.dataset[direction] && this.classList.add(this.dataset[direction]);
    });
    if (direction === 'out') {
      setTimeout(function() {
        $e.hide();
      }, 1000);
    }
    return $e;
  };
  var $loading = animate($('.loading.animated, .loading-overlay.animated'), 'in');
  $('<img>')
    .attr('src', 'http://lorempixel.com/1920/1080/people/p1')
    .load(function() {
      container.style.backgroundImage = 'url(' + this.src + ')';
      animate($loading, 'out');
    });

  var initValues = function($e) {
    $e.data('min', $e.cssvalue($e[0].id === 'nav' ? 'top' : 'bottom'));
    return $e;
  };
  var $container = $(container),
    $nav = initValues($(nav)),
    $footer = initValues($(footer));

  // btn
  $('.js-change-opacity').click(function() {
    container.style.opacity = this.dataset.opacity;
  });

  // move
  var move = (function() {
    var animate = function($el, cssfield, q) {
      var aniObject = {},
        min = $el.data('min'),
        v = $el.cssvalue(cssfield) + q;
      aniObject[cssfield] = v > min ? v : min
      $el.animate(aniObject, 0);
    };
    return function(q) {
      animate($nav, 'top', q);
      animate($footer, 'bottom', q);
    };
  })();
  $container.mousewheel(function(e) {
    move(e.deltaY * Math.round(e.deltaFactor / 10) * -1);
  });
});