(function ($) {

  var currentModal = null;
  $.fn.myjQModal = function() {
    'use strict';
    var self=this;
    var $self = $(self);

    if ($self.length === 1 && $self[0].myjQModal !== undefined) { return $self[0].myjQModal; }

    $(self).each(function() {
      if (this.myjQModal !== undefined) { return this.myjQModal; }

      var target = $(this.dataset.target);
      var action = this.dataset.action;
      var modal = $('<div></div>');
      var wrapper = $('<div class="myjQModal-wrapper"></div>').append(modal);
      console.log(target);
      modal.append(target);
      modal.wrap('<div class="myjQModal">');
      $('body').append(wrapper);
      wrapper.click(function() {
        wrapper.removeClass('open');
        currentModal = null;
      });

      if (! target.hasClass('close-on-click')) {
        modal.click(function(ev) {
          ev.stopPropagation();
        });
      }

      target.myjQModal = this.myjQModal = {
        target: target,
        action: action,
        modal: modal,
        wrapper: wrapper,

        open: function() {
          this.wrapper.addClass('open');
          if (currentModal !== null) { currentModal.removeClass('open'); }
          currentModal = wrapper;
        },
        close: function() {
          currentModal = null;
          this.wrapper.removeClass('open');
        }
      };

      $(this).click(function() {
        if (action === 'open') { this.myjQModal.open(); }
        else if (action === 'close') { this.myjQModal.close(); }
      });
    });
      return this;
    };
  $(document).ready(function() {
    $('button[data-type=modalTrigger]').myjQModal();
  });
}( jQuery ));
