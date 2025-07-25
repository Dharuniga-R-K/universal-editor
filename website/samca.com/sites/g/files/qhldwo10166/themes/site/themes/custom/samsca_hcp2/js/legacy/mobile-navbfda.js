$(document).ready(
  () => {
    const mobile = $('#mobile-section-title').is(':visible');
    // collapsible management
    if (mobile) {
      $('#mobile-section-title').html('In this section');
      $('.collapsible-nav').collapsible(
        {
          cookieName: `${window.location}-collapsible-nav`,
          speed: 100,
        },
      );
    }
  },
);
