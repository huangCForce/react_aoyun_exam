jQuery.fn.center = function (loaded) {
    var obj = this;
    body_width = parseInt($(window).width());
    body_height = parseInt($(window).height());
    block_width = parseInt(obj.width());
    block_height = parseInt(obj.height());

    left_position = parseInt((body_width / 2) - (block_width / 2) + $(window).scrollLeft());
    if (body_width < block_width) {
        left_position = 0 + $(window).scrollLeft();
    }

    top_position = parseInt((body_height / 2) - (block_height / 2) + $(window).scrollTop());
    if (body_height < block_height) {
        top_position = 0 + $(window).scrollTop();
    }

    if (!loaded) {

        obj.css({
            'position': 'absolute'
        });
        obj.css({
            'top': ($(window).height() - $('.dialog').height()) * 0.5,
            'left': left_position
        });
        $(window).bind('resize', function () {
            obj.center(!loaded);
        });
        $(window).bind('scroll', function () {
            obj.center(!loaded);
        });

    } else {
        obj.stop();
        obj.css({
            'position': 'absolute'
        });
        obj.animate({
            'top': top_position
        }, 200, 'linear');
    }
};

var intervalCounter = 0;
function hideToast() {
    var alert = document.getElementById("toast");
    alert.style.opacity = 0;
    clearInterval(intervalCounter);
}
function drawToast(message) {
    var alert = document.getElementById("toast");
    if (alert == null) {
        var toastHTML = '<div id="toast">' + message + '</div>';
        document.body.insertAdjacentHTML('beforeEnd', toastHTML);
    }
    else {
        alert.style.opacity = .9;
    }
    intervalCounter = setInterval("hideToast()", 2000);
}