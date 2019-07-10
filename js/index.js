var colorsMap = {
    'lip_00': './images/mouth-bn.png',
    'lip_01': './images/mouth_01.png',
    'lip_02': './images/mouth_02.png',
    'lip_03': './images/mouth_04.png',
    'lip_04': './images/mouth_03.png',
};

var color, paint;
var context, canvas;

function makeBase(id) {
    color = $('#' + id).attr("data-color");
    otherColor(id, true);
}

function otherColor(id, forceFirstImg) {
    var imgSrc = colorsMap[(forceFirstImg? "lip_00" : id) ];
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    var base_image = new Image();
    base_image.src = imgSrc;
    base_image.style.width = '350px';
    base_image.onload = function () {
        context.drawImage(base_image, 0, 0);
        if (id !== 'lip_00' && !forceFirstImg) {
            $('.click-lips').hide();
            $('.adk-proj-btn').removeClass("invisible");
        }
    };
}


function onLipChange(id) {
    makeBase(id);
    $('#myCanvas').mousedown(function(e){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    $('#myCanvas').mousemove(function(e){
        if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    $('#myCanvas').mouseup(function(e){
        paint = false;
        otherColor($("*[data-color='"+color+"']").attr("id"));
    });

    $('#myCanvas').mouseleave(function(e){
        paint = false;
    });

};

var clickX = new Array();
var clickY = new Array();
var clickDrag =  new Array();

function addClick(x, y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}
function redraw(){
    var canvas = document.getElementById("myCanvas");
    context.lineJoin = "round";
    context.lineWidth = 5;

    for(var i=0; i < clickX.length; i++)
    {
        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.strokeStyle = color;
        context.stroke();
    }
}

$(document).ready(function () {

    $('.new-color-choise').click(function () {
        $('.click-lips').show();
        $('.adk-proj-btn').addClass("invisible");
    });

    function onLipChange(id) {
        makeBase(id);
    };

    window.onload = function () {
        otherColor('lip_00');
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

    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }
});