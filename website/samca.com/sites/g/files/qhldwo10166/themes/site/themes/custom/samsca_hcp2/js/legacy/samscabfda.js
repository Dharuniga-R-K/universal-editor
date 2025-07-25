const debug = false;

/** **
 * Main JS Class
 *** */
var Sam = Sam || {};

/** **
 * Samasca.UI Definition
 *** */
Sam.UI = Sam.UI || {};

Sam.UI = {
  // global variables
  isMobile: false,
  isDesktop: false,
  clickEvent: 'click',
  href: '',
  debug: false,
  initialVisit: true,
  scrollEnabled: true,

  // Init - Runs on DOM load : BEGIN
  init() {
    const showISI = localStorage.getItem('InitialVisit');

    if (showISI == null || showISI == true) {
      Sam.UI.initialVisit = true;
    } else {
      Sam.UI.initialVisit = false;
    }

    // browser check
    const browser = navigator.userAgent.toLowerCase();

    if (browser.indexOf('ipad') != -1 || browser.indexOf('iphone') != -1 || browser.indexOf('ipod') != -1) {
      Sam.UI.isMobile = true;
      Sam.UI.clickEvent = 'touchstart';
      $('body').addClass('ios');
    } else if (browser.indexOf('android') != -1) {
      Sam.UI.isMobile = true;
      $('body').addClass('android');
    } else if (browser.indexOf('firefox') != -1) {
      $('body').addClass('firefox');
    } else if (browser.indexOf('windows nt') != -1) {
      $('body').addClass('internet-explorer');
    } else if (debug) {
      console.log(browser);
    }

    if (Sam.UI.debug) {
      $('.debug').show();
    } else {
      $('.debug').hide();
    }

    // run methods
    Sam.UI.nav();
    Sam.UI.activeMenu();
    Sam.UI.isi();
    Sam.UI.validation.init();

    // had to fix the field names so that the text could be cleared ...
    $('.calloutFirstName').focus(
      () => {
        $('.pre.calloutFirstName').text('');
      },
    );
    $('.calloutLastName').focus(
      () => {
        $('.pre.calloutLastName').text('');
      },
    );

    $(window).resize(
      () => {
        Sam.UI.growOverlay();
        if (!Sam.UI.isDesktop && document.documentElement.clientWidth >= 1024) {
          Sam.UI.isDesktop = true;
          $('.ui-panel-page-content-open').removeClass();
        } else {
          Sam.UI.isDesktop = false;
        }
      },
    );

    // form fields
    $('select[id*=HealthId]').change(
      function () {
        Sam.UI.toggleHealthCareIdentifier(this);
      },
    );
    $('select[id*=HealthId]').attr('onchange', '');

    // Mobile nav scroll
    $('header .navbar-default .navbar-ex1-collapse').on('touchstart', (event) => {});

    /* Mobile Search Form */
    $('.search-button').click(
      () => {
        $('.mobile-search-form').toggle('visible');
      },
    );
  }, // Init : END

  // fixes a bug where lightbox greyed  out bg might not be large enough
  growOverlay() {
    if ($('#fancybox-overlay')) {
      $('#fancybox-overlay').css({ width: $(document).width() });
    }
  },

  // ISI : BEGIN
  isi() {
    $('.jump-to-isi').click(
      () => {
        const isi = $('#isi');
        $(window).scrollTop(isi.offset().top).scrollLeft(isi.offset().left);
      },
    );

    $('#isi-static-header').click(
      function (e) {
        e.preventDefault();
        Sam.UI.scrollEnabled = false;
        if (debug) {
          console.log('Disable Scroll (click)');
        }
        if (debug) {
          console.log('Clicked on ISI Header Bar');
        }
        const isi = $('#isi');

        if ($('#isi-static-header').hasClass('bottom')) {
          if (debug) {
            console.log('Scrolling to ISI');
          }
          $('html, body').animate({ scrollTop: isi.offset().top - 40 }, 500);
          // $(window).scrollTop(isi.offset().top - 40).scrollLeft(isi.offset().left);
        } else {
          if (debug) {
            console.log('Scrolling to top');
          }
          $('html, body').animate({ scrollTop: 1 }, 500);
          // $(window).scrollTop(1).scrollLeft(isi.offset().left);
        }

        $('.header-indicator').toggleClass('arrow-up');
        $('.header-indicator').toggleClass('arrow-down');

        $(this).toggleClass('top');
        $(this).toggleClass('bottom');

        setTimeout(() => {
          Sam.UI.scrollEnabled = true;
          if (debug) {
            console.log('Enable Scroll (click)');
          }
        }, 500);
      },
    );
    $(document).ready((e) => {
      if (Sam.UI.scrollEnabled == true) {
        const isi = $('#isi');
        const position = $(window).scrollTop();
        const isi_break = Math.round(isi.offset().top) - 815;
        const isi_top = Math.round(isi.offset().top) - 40;
        const is_top = $('#isi-static-header').hasClass('top');

        const { body } = document;
        const html = document.documentElement;

        const height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight,
        );
        const isifull_height = $('#isi-full').height();
        const windowh = window.innerHeight + 180;
        // alert(isifull_height);
        // alert(height);
        // alert((height - isifull_height) );
        // alert(windowh);

        if (position <= 1 && Sam.UI.initialVisit) {
          Sam.UI.scrollEnabled = false;

          localStorage.setItem('InitialVisit', 'false');
          setTimeout(() => {
            $('#isi-static-header').addClass('top');
            $('#isi-static-header').removeClass('bottom');
            $('html, body').animate({ scrollTop: isi.offset().top - 40 }, 500);
            // $(window).scrollTop(isi.offset().top - 40).scrollLeft(isi.offset().left);
            Sam.UI.scrollEnabled = true;
            Sam.UI.initialVisit = false;
          }, 1000);
        } else if ((height - isifull_height) <= position + windowh) {
          $('#isi-static-header').hide();
        } else if ((height - isifull_height) > position + windowh) {
          $('#isi-static-header').show();
          $('#isi-static-header').removeClass('top');
          $('#isi-static-header').addClass('bottom');
        } else if (isi_top > position - 2 && isi_top < position + 2) {
          $('#isi-static-header').show();
          $('#isi-static-header').addClass('top');
          $('#isi-static-header').removeClass('bottom');
        } else if (isi_break <= position - 2) {
          // $("#isi-static-header").hide();
        } else if (!Sam.UI.initialVisit) {
          $('#isi-static-header').show();
          $('#isi-static-header').removeClass('top');
          $('#isi-static-header').addClass('bottom');
        }
      }
    });
    $(window).scroll(
      (e) => {
        if (Sam.UI.scrollEnabled == true) {
          e.preventDefault();
          const isi = $('#isi');
          const position = $(window).scrollTop();
          const isi_break = Math.round(isi.offset().top) - 815;
          const isi_top = Math.round(isi.offset().top) - 40;
          const is_top = $('#isi-static-header').hasClass('top');

          const { body } = document;
          const html = document.documentElement;

          const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight,
          );
          const isifull_height = $('#isi-full').height();
          const windowh = window.innerHeight + 180;
          // alert(isifull_height);
          // alert(height);
          // alert((height - isifull_height) );
          // alert(windowh);

          if (position <= 1 && Sam.UI.initialVisit) {
            Sam.UI.scrollEnabled = false;

            localStorage.setItem('InitialVisit', 'false');
            setTimeout(() => {
              $('#isi-static-header').addClass('top');
              $('#isi-static-header').removeClass('bottom');
              $('html, body').animate({ scrollTop: isi.offset().top - 40 }, 500);
              // $(window).scrollTop(isi.offset().top - 40).scrollLeft(isi.offset().left);
              Sam.UI.scrollEnabled = true;
              Sam.UI.initialVisit = false;
            }, 1000);
          } else if ((height - isifull_height) <= position + windowh) {
            $('#isi-static-header').hide();
          } else if ((height - isifull_height) > position + windowh) {
            $('#isi-static-header').show();
            $('#isi-static-header').removeClass('top');
            $('#isi-static-header').addClass('bottom');
          } else if (isi_top > position - 2 && isi_top < position + 2) {
            $('#isi-static-header').show();
            $('#isi-static-header').addClass('top');
            $('#isi-static-header').removeClass('bottom');
          } else if (isi_break <= position - 2) {
            // $("#isi-static-header").hide();
          } else if (!Sam.UI.initialVisit) {
            $('#isi-static-header').show();
            $('#isi-static-header').removeClass('top');
            $('#isi-static-header').addClass('bottom');
          }
        }
      },
    );

    $('.header-isi-more').click(
      () => {
        $('.header-isi-full').toggle();
        $('.header-isi-short').toggle();
      },
    );
  }, // ISI : END

  // Nav : BEGIN
  nav() {
    // store variables
    const origCurrent = $('#header .current');
    let oldCurrent = null;

    // When you mouse over a navigation item you make it blue by adding the class current
    // Next you make the navigation itmes next to them 'left' and 'right'
    $('#header .navBar a').mouseenter(
      function () {
        const $current = $(this);

        if (oldCurrent) {
          oldCurrent.removeClass('current');
        }

        oldCurrent = $current.addClass('current');

        // make sure tha the orginal always is marked as current
        if (!origCurrent.hasClass('current')) {
          origCurrent.addClass('current');
        }
      },
    );

    // When your mouse leaves the nav bar you reset it back to the way it was originally.
    $('#header .navBar').mouseleave(
      () => {
        if (oldCurrent) {
          oldCurrent.removeClass('current');
        }
      },
    );
  }, // Nav : END

  // logic for nav current states
  navCurrent(location) {
    const $current = $('#header .navBar').find(`a[href*=${window.location.pathname}]`);
    $current.addClass('current');
  },
  // Nav Current end

  activeMenu() {
    const current = location.pathname;
    let page = '';
    if (current == '/') {
      page = '/';
    } else {
      page = `/${current.replace('/', '')}`;
    }

    // Remove trailing slash if there is one.
    if (page.substr(-1) == '/') {
      page = page.substr(0, page.length - 1);
    }

    page_noslash = page.replace('/', '');

    $('body').addClass(page);

    $('.samsca-side-nav li a').each(
      function () {
        const $this = $(this);
        if ($this.attr('href') == page || $this.attr('href') == page_noslash) {
          $this.parent().addClass('active');
        }
      },
    );

    return false;
  },

  getUrlParam(name) {
    name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    const regexS = `[\\?&]${name}=([^&#]*)`;
    const regex = new RegExp(regexS);
    const results = regex.exec(window.location.href.replace('–', '-').replace('%E2%80%93', '-'));
    if (results == null) {
      return '';
    }
    return decodeURIComponent(results[1]);
  },
},

$(document).ready(
  function () {
    const $this = $(this);
    Sam.UI.href = $this.attr('href');

    // call init
    Sam.UI.init();

    // Support different browsre orientation handling
    // Legacy google analytics event
    // if (window.addEventListener) {
    //     window.addEventListener('orientationchange', doOnOrientationChange);
    // } else {
    //     window.attachEvent("orientationchange", doOnOrientationChange);
    // }

    // Special fancybox handling for email form
    $('a#emailColleague,a#emailColleague2').fancybox({
      overlayColor: '#000',
      titleShow: false,
      afterClose() {
        if (colleagueFormReset) {
          colleagueFormReset();
        }
      },
    });

    /* Let any link be fancybox */
    $('a.fancy').fancybox({
      overlayShow: true,
      hideOnContentClick: true,
      autoCenter: true,
      onStart() {
        const width = $(window).width();
        if (width > 768) {
          $('a.fancy').fancybox();
        } else {
          return false;
        }
      },
      beforeShow() {
        tarGet = this.href;
        this.title = $(this.element).next('.modalTitle').html();
      },
      afterClose() {
        $(tarGet).show();
      },
      helpers: {
        overlay: {
          locked: false,
        },
      },
    });

    const { hash } = window.location;
    // alert(hash)
    if (hash == '#share') {
      $('a.fancy[href="#tell-a-colleague"]').click();
    }

    /* Special mobile fancybox handling */
    $('a.mobile-fancy').fancybox({
      overlayShow: true,
      hideOnContentClick: true,
    });

    /* Tooltips */
    $('[rel=tooltip]').tooltip({ show: { effect: false } });

    /* Placeholders */
    $('input, textarea').placeholder();

    /* Load the ISI */
    // $("#ajaxresultISI").load("_ISI");

    // if url contains hash, then scroll to location

    // if (window.location.hash) {
    //    console.log('hash exists');
    //    $(function () {
    //        // get hash value
    //        var hash = window.location.hash;
    //        console.log(hash);
    //        // scroll to element with that id, with delay due to precoded slide to top
    //        setTimeout(function(){
    //            $('html, body').animate({ scrollTop: $(hash).offset().top });
    //        }, 1000);
    //        return false;
    //    });
    // };
  },
);

/* Disable jQueryUI page transitions */
$(document).bind(
  'mobileinit',
  () => {
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.useFastClick = true;
    $.mobile.ajaxEnabled = false;
  },
);

$(document).bind(
  'pageinit',
  () => {
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.useFastClick = true;
    $.mobile.ajaxEnabled = false;
  },
);
