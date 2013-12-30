var gallery = function() {
    var currentItem = 0;
    var galleryElem, items;

    var _navigate = function() {
        $('.gallery-action a').on('click', function(e) {
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
    var createList = function(photos) {
        if ($('.gallery-images').length < 0) {
            $('.gallery-content').append('<ul class="gallery"></ul>');
            photos.each(function() {
                console.log(this);
            });
        }
    };
    var init = function() {
        galleryElem = $('#gallery-list li');
        items = $('#gallery-list li').length;
        if (!$('.gallery-content .gallery-action').html()) {
            $('.gallery-content')
                    .prepend('<div class="gallery-action"><a href="#" class="prev"><</a>' +
                            '<a href="#"  class="next">></a></div>');
        }
        _navigate();
        $('.activeImage').html('<img />');
        _showImage(galleryElem.eq(currentItem));
    };
    return {
        init: init,
        createList: createList
    };
}();

$(document).ready(function() {
    gallery.init();
});
