scriptTag = null;
(function ($) {

  var currentModal = null;
  $.fn.handyModal = function() {
      'use strict';
      var self=this;
      var $self = $(self);

      if ($self.length === 1 && $self[0].handyModal !== undefined) { return $self[0].handyModal; }

      $(self).each(function() {
          if (this.handyModal === undefined) {
              var target = $(this.dataset.target);
              var targetModal = target.data('handyModal');
              var action = this.dataset.action;
              var wrapper = target.closest('.handyModal-wrapper');

              if (targetModal === undefined) {
                  var modal = $('<div></div>');
                  wrapper = $('<div class="handyModal-wrapper"></div>').append(modal);

                  modal.append(target);
                  modal.wrap('<div class="handyModal">');
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

                  target.removeClass('preinit');
              }

              this.handyModal = {
                  target: target,
                  action: action,
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

              if (targetModal === undefined) {
                  target.data('handyModal', this.handyModal);
              }

              $(this).click(function() {
                  console.log('this should happen');
                  if (action === 'open') { this.handyModal.open(); }
                  else if (action === 'close') { this.handyModal.close(); }
              });
          }
      });
      return this;
  };

  $(document).ready(function() {
    scriptTag = document.querySelector('script#handyModal');

    if (scriptTag && scriptTag.dataset.hasOwnProperty('initialize')) {
      $('[data-target]').handyModal();
    }
  });
}( jQuery ));
