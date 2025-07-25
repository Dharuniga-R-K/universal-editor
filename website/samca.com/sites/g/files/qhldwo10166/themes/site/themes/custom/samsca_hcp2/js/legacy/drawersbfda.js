$(document).ready(
  () => {
    let { hash } = window.location;
    // collapsible management
    if (hash) {
      hash = hash.replace('#', 'nav-');
      const sel = `#${hash}`;
      $('.collapsible').jcollapse(
        {
          cookieName: `${window.location}-collapsible`,
          speed: 100,
        },
      );
      $('.collapsible').jcollapse('close');
      $(sel).jcollapse('open');
    } else {
      $('.collapsible').jcollapse(
        {
          defaultOpen: 'nav-presentation',
          cookieName: `${window.location}-collapsible`,
          speed: 100,
        },
      );
    }
  },
);
