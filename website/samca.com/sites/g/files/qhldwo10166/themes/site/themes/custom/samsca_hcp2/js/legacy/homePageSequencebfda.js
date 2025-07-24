var $ = jQuery.noConflict();
$(window).load(
    function () {
        if ($(window).width() > 768) {
            var cssanimations = (function () {
                var b = document.body || document.documentElement;
                var s = b.style;
                var p = 'animation';
                if (typeof s[p] == 'string') { return true; }

                // Tests for vendor specific prop
                v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
                p = p.charAt(0).toUpperCase() + p.substr(1);
                for (var i = 0; i < v.length; i++) {
                    if (typeof s[v[i] + p] == 'string') { return true; }
                }
                return false;
            })();

            var animationTime = 4333;
            var heroDelayTime = 2000;
            var fadeDelay = 100;
            var fadeOutDelay = 400;

            var showHero = function () {

                $('#white').delay(heroDelayTime).fadeIn(
                    fadeDelay, function () {
                        $('#hero-copy').show();
                        $('#animationSequence').addClass('finished');
                    }
                ).fadeOut(fadeOutDelay);
            };

            // Hide first frame
            $('#firstFrame').hide();

            // Set class to change bg image
            $('#animationSequence').addClass('animate');

            // Use CSS3 if possible, fallback to setInterval (IE)
            if (!cssanimations) {

                var position = 0,
                maxPosition = -16881,
                size = 331,
                intervalTime = animationTime / (Math.abs(maxPosition) / size),
                jqSequence = $('#animationSequence'),
                interval;

                var animate = function () {

                    if (position === maxPosition) {

                        clearInterval(interval);

                        showHero();

                    } else {

                        position = position - size;

                        jqSequence.css('background-position', '0px ' + position + 'px');

                    }

                };

                var interval = setInterval(animate, intervalTime);

            } else {

                $('#animationSequence').bind(
                    'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {

                        showHero();

                    }
                );

            }
        } else {
            $('#hero-copy').show();
        }
    }
);