var debug = false;

Sam.UI.vidPlayer = Sam.UI.vidPlayer || {};

Sam.UI.vidPlayer = {

    timer: -1,
    duration: -1,
    position: -1,
    percent: -1,
    current: null,
    video_path: null, // Path they are located, the rels only contain file names
    video_default: 'Champion', // This is the featured video on the homepage callout
    video_specified: null,
    p_25: false,
    p_50: false,
    p_75: false,
    p_90: false,
    p_100: false,

    init: function(video, videoStill) {
        if (debug) {
            console.log("Initializing Video: " + video);
        }
        if (debug) {
            console.log("Video Still: " + videoStill);
        }

        Sam.UI.vidPlayer.video_default = video;

        var videoId = video;

        if (Sam.UI.getUrlParam('video') != "") {
            videoId = Sam.UI.getUrlParam('video');
        }

        var drupalVideoFilesPath = document.getElementById('video-files-path').getAttribute('data-video-path');
        Sam.UI.vidPlayer.video_path = drupalVideoFilesPath;

        /*console.log("Video from URL: " + videoId);
        var videoName = $("#videoName").val();
        if (videoName != "" && videoName != "undefined") {
            console.log("Using videoName: " + videoName);
            videoId = videoName;
        } else if (videoId && videoId != "") {
            console.log("Using URL: " + videoId);
            videoId = videoId;
        } else {
            console.log("Using function default: " + video);
            videoId = video;
        }*/

        Sam.UI.vidPlayer.video_specified = Sam.UI.vidPlayer.getVideoFileName(videoId);

        if (Sam.UI.vidPlayer.video_specified) {
            Sam.UI.vidPlayer.setup(Sam.UI.vidPlayer.video_specified, $('a[rel=' + Sam.UI.vidPlayer.video_specified + ']').attr('rev'), true);
        } else {
            Sam.UI.vidPlayer.setup(Sam.UI.vidPlayer.video_default, $('a[rel=' + Sam.UI.vidPlayer.video_default + ']').attr('rev'), !Sam.UI.isMobile);
        }

        document.title = document.title.split("#")[0];
    },

    reset: function() {
        clearInterval(Sam.UI.vidPlayer.timer);
        Sam.UI.vidPlayer.duration = Sam.UI.vidPlayer.position = Sam.UI.vidPlayer.percent = Sam.UI.vidPlayer.timer = -1;
        Sam.UI.vidPlayer.current = null;
    },

    status: function() {
        if (Sam.UI.vidPlayer.duration < 0) {
            Sam.UI.vidPlayer.duration = jwplayer().getDuration();
        } else {
            Sam.UI.vidPlayer.position = jwplayer().getPosition();
            Sam.UI.vidPlayer.percent = (Sam.UI.vidPlayer.position / Sam.UI.vidPlayer.duration) * 100;
            if (Sam.UI.vidPlayer.percent >= 25 && !Sam.UI.vidPlayer.p_25) {
                Sam.UI.vidPlayer.p_25 = true;
                mediaMilestoneHandler(Sam.UI.vidPlayer.current, 25);
            } else if (Sam.UI.vidPlayer.percent >= 50 && !Sam.UI.vidPlayer.p_50) {
                Sam.UI.vidPlayer.p_50 = true;
                mediaMilestoneHandler(Sam.UI.vidPlayer.current, 50);
            } else if (Sam.UI.vidPlayer.percent >= 75 && !Sam.UI.vidPlayer.p_75) {
                Sam.UI.vidPlayer.p_75 = true;
                mediaMilestoneHandler(Sam.UI.vidPlayer.current, 75);
                if (typeof(videoCompleteHandler) == 'function') {
                    videoCompleteHandler();
                }
            } else if (Sam.UI.vidPlayer.percent >= 90 && !Sam.UI.vidPlayer.p_90) {
                // Fired at 90% completion per requirements
                mediaCompleteHandler(Sam.UI.vidPlayer.current);
                Sam.UI.vidPlayer.p_90 = true;
            } else if (Sam.UI.vidPlayer.percent >= 98 && !Sam.UI.vidPlayer.p_100) {
                Sam.UI.vidPlayer.p_100 = true;
                clearInterval(Sam.UI.vidPlayer.timer);
                mediaMilestoneHandler(Sam.UI.vidPlayer.current, 100);
            }
        }
    },

    setup: function(source, width, autostart) {
        Sam.UI.vidPlayer.reset();

        Sam.UI.vidPlayer.current = source;
        jwplayer('vidPlayer').setup({
            autostart: autostart,
            width: width,
            height: '360',
            image: Sam.UI.vidPlayer.video_path + source + '.png',
            file: Sam.UI.vidPlayer.video_path + source + '.mp4',
            events: {
                onPlay: function() {
                    if (debug) {
                        console.log('inside onplay');
                    }
                    if (Sam.UI.vidPlayer.timer < 0 && !(Sam.UI.vidPlayer.current === undefined)) {
                        if (debug) {
                            console.log('inside if statement: ' + Sam.UI.vidPlayer.current);
                        }
                        //mediaPlayHandler(Sam.UI.vidPlayer.current);
                        Sam.UI.vidPlayer.timer = setInterval(
                            function() {
                                Sam.UI.vidPlayer.status();
                            }, 1000
                        );
                    }
                }
            },
            modes: [{ type: "html5" }, { type: "flash", src: "/themes/custom/samsca_hcp/src/legacy/vendor/jwplayer/player.swf" }]
        });

        //VideoTagging
        videoName = Sam.UI.vidPlayer.current;
        window.setTimeout(
            function() {
                if (typeof(videoPlayHandler) == 'function') {
                    videoPlayHandler();
                }
            }, 3000
        );
    },

    getVideoFileName: function(videoID) {
        //fix for new url requested by SEO
        if (videoID == "" && window.location.href.indexOf('/video-library/') > -1) {
            videoID = window.location.pathname.split('/')[2];
        }

        // id/filename mapping
        var ids = {
            "samsca-mechanism-of-action": "Samsca_moa",
            "rowe-case-study": "rowe",
            "siadh-oncology": "pathophysiology",
            "champion-hf": "champion-hf",
            "champion-siadh": "champion-siadh",
            "matsuda": "matsuda",
            "pathophysiology": "pathophysiology",
            "rowe": "rowe",
            "Samsca_moa": "Samsca_moa",
            "default": "Samsca_moa"
        }

        // assign the filename
        var filename;
        if (ids[videoID]) {
            filename = ids[videoID];
        } else {
            filename = ids["default"];
        }

        return filename;
    }
}