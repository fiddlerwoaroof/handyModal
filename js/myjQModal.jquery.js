(function ($) {

  $.fn.myjQModal = function() {
    'use strict';
    var self=this;
    $(self).each(function() {
      var target = $(this.dataset.target);
      var action = this.dataset.action;
      if (action === 'open') {
        var modal = $('<div class="modal"></div>');
        var wrapper = $('<div class="modal-wrapper"></div>').append(modal);
        console.log(target);
        modal.append(target);
        modal.wrap('<div>');
        $('body').append(wrapper);
        wrapper.click(function() {
          wrapper.removeClass('open');
        });
        modal.click(function(ev) {
          ev.stopPropagation();
        });
      }
      $(this).click(function() {
        if (action === 'open') { wrapper.addClass('open'); }
        else if (action === 'close') {wrapper.removeClass('open'); }
      });
    });
    return this;
  };
  $(document).ready(function() {
    $('button[data-action=open]').myjQModal();
  });
}( jQuery ));
