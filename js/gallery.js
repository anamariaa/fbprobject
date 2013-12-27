var gallery = function() {
    var currentItem = 0;
    var galleryElem = $('.gallery li');
    var items = $('.gallery li').length;
    var _navigate = function() {
        $('.actions a').on('click', function(e) {
            e.preventDefault();
            if ($(this).hasClass('prev')) {
                currentItem = (--currentItem % items);
            } else {
                currentItem = Math.abs(++currentItem % items);
            }
            _showImage(galleryElem.eq(currentItem));
        });
        galleryElem.on('click', function() {
            currentItem = $(this).index();
            _showImage($(this));
        });
    };
    var _showImage = function(elem) {
        galleryElem.removeClass('selected');
        elem.addClass('selected');
        var image = elem.find('img').attr('src');
        $('.activeImage img').attr('src', image);

    };
    var init = function() {
        _navigate();
        $('.activeImage').html('<img />');
        _showImage(galleryElem.eq(currentItem));
    };
    return {
        init: init
    };
}();

$(document).ready(function() {
    gallery.init();
});
