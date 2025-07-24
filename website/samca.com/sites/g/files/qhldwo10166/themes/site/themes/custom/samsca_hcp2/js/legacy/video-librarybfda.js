var debug = false;

$(document).ready(
    function() {
        $('#moa-info').hide();

        var global_playback_enabled = parseInt($('#videoLibraryRightColumn').attr('data-attr-global-playback'));

        if (global_playback_enabled) {
            if (QueryString.video) {
                var arg = QueryString.video;
                if (debug) {
                    console.log("Playing: " + arg);
                }
                if (arg == 'moa' || arg == 'samsca_moa') {
                    $('#moa-info').show();
                    Sam.UI.vidPlayer.init('Samsca_moa', '');
                } else {
                    $('#moa-info').hide();
                    Sam.UI.vidPlayer.init(arg, '');
                }
                jwplayer().play(true);
                return false;
            }

            var hash = window.location.hash;
            if (hash == '#MOA' || hash == '#moa') {
                $('#moa-info').show();
                Sam.UI.vidPlayer.init('Samsca_moa', '');
            }
        }

        $('#samsca_moa_video_container').click(
            function(event) {
                var video = $('#samsca_moa_video source')[0];

                $(this).css("visibility", "hidden");
                return false;
            }
        );

        if (global_playback_enabled) {
            $(".video.jspathophysiology, #video-disease-state").click(
                function(e) {
                    e.preventDefault();
                    $('#moa-info').hide();
                    Sam.UI.vidPlayer.init('siadh-oncology', '');
                    return false;
                }
            );

            $("#pathophysiology").click(
                function() {
                    e.preventDefault();
                    $('#moa-info').hide();
                    Sam.UI.vidPlayer.init('pathophysiology', '');
                    return false;
                }
            );

            $(".video.jsmoa, #video-moa").click(
                function(e) {
                    e.preventDefault();
                    $('#moa-info').show();
                    Sam.UI.vidPlayer.init('Samsca_moa', '');
                    return false;
                }
            );

            $("#video-rowe").click(
                function(e) {
                    e.preventDefault();
                    $('#moa-info').hide();
                    Sam.UI.vidPlayer.init('rowe', '');
                    return false;
                }
            );

            $("#video-champion-siadh").click(
                function(e) {
                    e.preventDefault();
                    $('#moa-info').hide();
                    Sam.UI.vidPlayer.init('champion-siadh', '');
                    return false;
                }
            );

            $("#video-champion-hf").click(
                function(e) {
                    e.preventDefault();
                    $('#moa-info').hide();
                    Sam.UI.vidPlayer.init('champion-hf', '');
                    return false;
                }
            );

            $("#video-matsuda").click(
                function(e) {
                    e.preventDefault();
                    $('#moa-info').hide();
                    Sam.UI.vidPlayer.init('matsuda', '');
                    return false;
                }
            );
        }

        $("#samsca_moa_video source").bind(
            "pause ended",
            function() {
                console.log("Pause/End");
                $("#samsca_moa_video_container").css("visibility", "visible");
                return false;
            }
        );


    }
);