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
      layer2.style.backgroundImage = 'url(' + this.src + ')';
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
    layer2.style.opacity = this.dataset.opacity;
    container.style.backgroundColor = this.dataset.backgroundColor === 'random' ? "#" + Math.round(Math.random() *
      16777215).toString(16) : this.dataset.backgroundColor;
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
      var diff = footer.offsetTop - (nav.offsetTop + nav.clientHeight);
      if (diff >= 0 || q < 0) {
        if (diff - q - q < 0) {
          q = Math.ceil(diff / 2);
        }
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
  var touch;
  var parseTouch = function(e) {
    var t = e.originalEvent.changedTouches[0];
    return {
      x: t.pageX,
      y: t.pageY,
      ts: e.type === 'touchstart' ? e.timeStamp : touch.ts
    };
  }
  $container.on('touchstart', function(e) {
    touch = parseTouch(e);
  });
  $container.on('touchend', function(e) {
    if ((new Date().getTime() - touch.ts < 150) && e.target.classList.contains('js-change-opacity')) {
      e.target.click();
    }
  });
  $container.on('touchmove', function(e) {
    var t = parseTouch(e);
    var moveY = t.y - touch.y;
    if (Math.abs(moveY) > 2) {
      touch = t
      move(moveY / 2);
    }
  });
});