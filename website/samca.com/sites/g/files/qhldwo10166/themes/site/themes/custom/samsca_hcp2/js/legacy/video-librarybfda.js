const debug = false;

$(document).ready(
  () => {
    $('#moa-info').hide();

    const global_playback_enabled = parseInt($('#videoLibraryRightColumn').attr('data-attr-global-playback'));

    if (global_playback_enabled) {
      if (QueryString.video) {
        const arg = QueryString.video;
        if (debug) {
          console.log(`Playing: ${arg}`);
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

      const { hash } = window.location;
      if (hash == '#MOA' || hash == '#moa') {
        $('#moa-info').show();
        Sam.UI.vidPlayer.init('Samsca_moa', '');
      }
    }

    $('#samsca_moa_video_container').click(
      function (event) {
        const video = $('#samsca_moa_video source')[0];

        $(this).css('visibility', 'hidden');
        return false;
      },
    );

    if (global_playback_enabled) {
      $('.video.jspathophysiology, #video-disease-state').click(
        (e) => {
          e.preventDefault();
          $('#moa-info').hide();
          Sam.UI.vidPlayer.init('siadh-oncology', '');
          return false;
        },
      );

      $('#pathophysiology').click(
        () => {
          e.preventDefault();
          $('#moa-info').hide();
          Sam.UI.vidPlayer.init('pathophysiology', '');
          return false;
        },
      );

      $('.video.jsmoa, #video-moa').click(
        (e) => {
          e.preventDefault();
          $('#moa-info').show();
          Sam.UI.vidPlayer.init('Samsca_moa', '');
          return false;
        },
      );

      $('#video-rowe').click(
        (e) => {
          e.preventDefault();
          $('#moa-info').hide();
          Sam.UI.vidPlayer.init('rowe', '');
          return false;
        },
      );

      $('#video-champion-siadh').click(
        (e) => {
          e.preventDefault();
          $('#moa-info').hide();
          Sam.UI.vidPlayer.init('champion-siadh', '');
          return false;
        },
      );

      $('#video-champion-hf').click(
        (e) => {
          e.preventDefault();
          $('#moa-info').hide();
          Sam.UI.vidPlayer.init('champion-hf', '');
          return false;
        },
      );

      $('#video-matsuda').click(
        (e) => {
          e.preventDefault();
          $('#moa-info').hide();
          Sam.UI.vidPlayer.init('matsuda', '');
          return false;
        },
      );
    }

    $('#samsca_moa_video source').bind(
      'pause ended',
      () => {
        console.log('Pause/End');
        $('#samsca_moa_video_container').css('visibility', 'visible');
        return false;
      },
    );
  },
);
