(function ($) {

  $.fn.myjQModal = function() {
    'use strict';
    var self=this;
    var $self = $(self);
    var currentModal = null;

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

      this.myjQModal = {
        target: target,
        action: action,
        modal: modal,
        wrapper: wrapper,

        open: function() {
          if (currentModal !== null) { currentModal.removeClass('open'); }
          this.wrapper.addClass('open');
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
    $('button[data-action=open]').myjQModal();
  });
}( jQuery ));
