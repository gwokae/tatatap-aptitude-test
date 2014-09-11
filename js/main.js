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

  // btn
  $('.js-change-opacity').click(function() {
    container.style.opacity = this.dataset.opacity;
  });
});