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
    $footer = initValues($(footer).animate({
      bottom: '+=' + ((window.innerHeight - $(footer).find('ul > li').height()) / 2) + 'px'
    }, 0));

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
      if ((nav.offsetTop + nav.clientHeight + q) < footer.offsetTop) {
        animate($nav, 'top', q);
        animate($footer, 'bottom', q);
      }
    };
  })();

  // mousewheel event
  $container.mousewheel(function(e) {
    move(e.deltaY * Math.round(e.deltaFactor / 10) * -1);
  });

  // touch event
  var sx, sy;
  $container.on('touchstart', function(e) {
    var t = e.originalEvent.changedTouches[0];
    // sx = t.pageX;
    sy = t.pageY;
  });
  $container.on('touchmove', function(e) {
    var t = e.originalEvent.changedTouches[0];
    var moveY = t.pageY - sy;
    if (Math.abs(moveY) > 2) {
      // sx = t.pageX;
      sy = t.pageY;
      move(moveY / 2);
    }
  });

});