
var colorsMap = {
    'lip_00': './images/mouth-bn.png',
    'lip_01': './images/mouth_01.png',
    'lip_02': './images/mouth_02.png',
    'lip_03': './images/mouth_04.png',
    'lip_04': './images/mouth_03.png',
};

function makeBase(id) {
    var imgSrc = colorsMap[id];
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    var base_image = new Image();
    base_image.src = imgSrc;
    base_image.style.width = '350px';
    base_image.onload = function(){
        context.drawImage(base_image, 0, 0);
        if (id !== 'lip_00') {
            $('.click-lips').hide();
            $('.adk-proj-btn').removeClass("invisible");
        }
    };
    return false;
}

function onLipChange(id) {
    makeBase(id);
};

$(document).ready(function () {

    $('.new-color-choise').click(function () {
        $('.click-lips').show();
        $('.adk-proj-btn').addClass("invisible");
    });

    function onLipChange(id) {
        makeBase(id);
    };

    window.onload = function () {
        // context.drawImage(document.getElementById("mouth-lips"), 0,0);
        makeBase('lip_00');
    };



    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

    ResCarouselSize();


    $('.img-hand').click(function () {
        $('.lip-choice').remove();
        $('.click-lips').removeClass("invisible");
    });

    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);

            if (bodyWidth <= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }

            $(this).css({'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers});
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }
});