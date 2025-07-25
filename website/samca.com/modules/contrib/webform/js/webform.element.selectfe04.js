/**
 * @file
 * JavaScript behaviors for select menu.
 */

(function ($, Drupal, once) {
  /**
   * Disable select menu options using JavaScript.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformSelectOptionsDisabled = {
    attach(context) {
      $(once('webform-select-options-disabled', 'select[data-webform-select-options-disabled]', context)).each(function () {
        const $select = $(this);
        const disabled = $select.attr('data-webform-select-options-disabled').split(/\s*,\s*/);
        $select.find('option').filter(function isDisabled() {
          return ($.inArray(this.value, disabled) !== -1);
        }).attr('disabled', 'disabled');
      });
    },
  };
}(jQuery, Drupal, once));
