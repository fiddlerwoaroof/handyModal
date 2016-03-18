(function ($) {

  var currentModal = null;
  $.fn.myjQModal = function() {
      'use strict';
      var self=this;
      var $self = $(self);

      if ($self.length === 1 && $self[0].myjQModal !== undefined) { return $self[0].myjQModal; }

      $(self).each(function() {
          if (this.myjQModal === undefined) {
              var target = $(this.dataset.target);
              var targetModal = target.data('myjQModal');
              var action = this.dataset.action;
              var wrapper = target.closest('.myjQModal-wrapper');

              if (targetModal === undefined) {
                  var modal = $('<div></div>');
                  wrapper = $('<div class="myjQModal-wrapper"></div>').append(modal);

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

                  target.removeClass('preinit');
              }

              this.myjQModal = {
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
                  target.data('myjQModal', this.myjQModal);
              }

              $(this).click(function() {
                  console.log('this should happen');
                  if (action === 'open') { this.myjQModal.open(); }
                  else if (action === 'close') { this.myjQModal.close(); }
              });
          };
      });
      return this;
  };
}( jQuery ));
