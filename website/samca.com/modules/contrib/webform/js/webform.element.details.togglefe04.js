/**
 * @file
 * JavaScript behaviors for details element.
 */

(function ($, Drupal, once) {
  Drupal.webform = Drupal.webform || {};
  Drupal.webform.detailsToggle = Drupal.webform.detailsToggle || {};
  Drupal.webform.detailsToggle.options = Drupal.webform.detailsToggle.options || {};

  /**
   * Attach handler to toggle details open/close state.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformDetailsToggle = {
    attach(context) {
      $(once('webform-details-toggle', '.js-webform-details-toggle', context)).each(function () {
        const $form = $(this);
        const $tabs = $form.find('.webform-tabs');

        // Get only the main details elements and ignore all nested details.
        const selector = ($tabs.length) ? '.webform-tab' : '.js-webform-details-toggle, .webform-elements';
        const $details = $form.find('details').filter(function () {
          const $parents = $(this).parentsUntil(selector);
          return ($parents.find('details').length === 0);
        });

        // Toggle is only useful when there are two or more details elements.
        if ($details.length < 2) {
          return;
        }

        const options = $.extend({
          button: '<button type="button" class="webform-details-toggle-state"></button>',
        }, Drupal.webform.detailsToggle.options);

        // Create toggle buttons.
        const $toggle = $(options.button)
          .attr('title', Drupal.t('Toggle details widget state.'))
          .on('click', (e) => {
            // Get details that are not vertical tabs pane.
            const $details = $form.find('details:not(.vertical-tabs__pane)');
            const $summary = $details.find('summary');
            let open;
            if (Drupal.webform.detailsToggle.isFormDetailsOpen($form)) {
              $details.removeAttr('open');
              $summary.attr('aria-expanded', 'false');
              open = 0;
            } else {
              $details.attr('open', 'open');
              $summary.attr('aria-expanded', 'true');
              open = 1;
            }
            Drupal.webform.detailsToggle.setDetailsToggleLabel($form);

            // Set the saved states for all the details elements.
            // @see webform.element.details.save.js
            if (Drupal.webformDetailsSaveGetName) {
              $details.each(function () {
                // Note: Drupal.webformDetailsSaveGetName checks if localStorage
                // exists and is enabled.
                // @see webform.element.details.save.js
                const name = Drupal.webformDetailsSaveGetName($(this));
                if (name) {
                  localStorage.setItem(name, open);
                }
              });
            }
          })
          .wrap('<div class="webform-details-toggle-state-wrapper"></div>')
          .parent();

        if ($tabs.length) {
          // Add toggle state before the tabs.
          $tabs.find('.item-list:first-child').eq(0).before($toggle);
        } else {
          // Add toggle state link to first details element.
          $details.eq(0).before($toggle);
        }

        Drupal.webform.detailsToggle.setDetailsToggleLabel($form);
      });
    },
  };

  /**
   * Determine if a webform's details are all opened.
   *
   * @param {jQuery} $form
   *   A webform.
   *
   * @return {boolean}
   *   TRUE if a webform's details are all opened.
   */
  Drupal.webform.detailsToggle.isFormDetailsOpen = function ($form) {
    return ($form.find('details[open]').length === $form.find('details').length);
  };

  /**
   * Set a webform's details toggle state widget label.
   *
   * @param {jQuery} $form
   *   A webform.
   */
  Drupal.webform.detailsToggle.setDetailsToggleLabel = function ($form) {
    const isOpen = Drupal.webform.detailsToggle.isFormDetailsOpen($form);

    const label = (isOpen) ? Drupal.t('Collapse all') : Drupal.t('Expand all');
    $form.find('.webform-details-toggle-state').html(label);

    const text = (isOpen) ? Drupal.t('All details have been expanded.') : Drupal.t('All details have been collapsed.');
    Drupal.announce(text);
  };
}(jQuery, Drupal, once));
