$(document).ready(
    function () {
        var hash = window.location.hash;
        //collapsible management
        if (hash) {
            hash = hash.replace("#", "nav-");
            var sel = '#' + hash;
            $('.collapsible').jcollapse(
                {
                    cookieName: window.location + '-collapsible',
                    speed: 100
                }
            );
            $('.collapsible').jcollapse('close');
            $(sel).jcollapse('open');
        } else {
            $('.collapsible').jcollapse(
                {
                    defaultOpen: 'nav-presentation',
                    cookieName: window.location + '-collapsible',
                    speed: 100
                }
            );
        }
    }
);