(function (Drupal, drupalSettings, OtsukaFM) {
  Drupal.behaviors.focusTrap = {
    attach: (context) => {
      const { selectors } = drupalSettings.otsuka_focus_manager;
      selectors.forEach((selector) => {
        if (!OtsukaFM.selectors.includes(selector)) {
          OtsukaFM.waitForElement(selector);
        }
      });
    },
  };
}(Drupal, drupalSettings, OtsukaFM));
