$(function() {
    var contactTableH = $('.contact-table').height();
    $('.map-box').height(contactTableH);
    $(window).on('resize', function() {
        $('.map-box').height(contactTableH);
    })

    $(".view360").on('click', function() {
        $(".OverlayBg").css("display", "none");
    });

    $('#nav-toggle').on('click', function() {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
    });

    $('#overlay li').on('click', function() {
        $('#nav-toggle').removeClass('active');
        $('#overlay').removeClass('open');
    });
});



jQuery(function() {
    jQuery('.panorama-view').panorama360({
        sliding_controls: true,
        bind_resize: true,
        sliding_interval: 15,
        is360: false,
    });
});