const $ = jQuery.noConflict();
$(window).load(
  () => {
    if ($(window).width() > 768) {
      const cssanimations = (function () {
        const b = document.body || document.documentElement;
        const s = b.style;
        let p = 'animation';
        if (typeof s[p] === 'string') { return true; }

        // Tests for vendor specific prop
        v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
        p = p.charAt(0).toUpperCase() + p.substr(1);
        for (let i = 0; i < v.length; i++) {
          if (typeof s[v[i] + p] === 'string') { return true; }
        }
        return false;
      }());

      const animationTime = 4333;
      const heroDelayTime = 2000;
      const fadeDelay = 100;
      const fadeOutDelay = 400;

      const showHero = function () {
        $('#white').delay(heroDelayTime).fadeIn(fadeDelay, () => {
          $('#hero-copy').show();
          $('#animationSequence').addClass('finished');
        }).fadeOut(fadeOutDelay);
      };

      // Hide first frame
      $('#firstFrame').hide();

      // Set class to change bg image
      $('#animationSequence').addClass('animate');

      // Use CSS3 if possible, fallback to setInterval (IE)
      if (!cssanimations) {
        let position = 0;
        const maxPosition = -16881;
        const size = 331;
        const intervalTime = animationTime / (Math.abs(maxPosition) / size);
        const jqSequence = $('#animationSequence');
        var interval;

        const animate = function () {
          if (position === maxPosition) {
            clearInterval(interval);

            showHero();
          } else {
            position -= size;

            jqSequence.css('background-position', `0px ${position}px`);
          }
        };

        var interval = setInterval(animate, intervalTime);
      } else {
        $('#animationSequence').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', () => {
          showHero();
        });
      }
    } else {
      $('#hero-copy').show();
    }
  },
);
