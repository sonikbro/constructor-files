$(document).ready(function () {
	setBackground()
});
$(window).resize(setBackground)

function setBackground() {
	if ($(window).width() < 768) {
		$('.hero').css('background-image', 'url(' + $('.hero').data('img-xs') + ')')
	} else {
		$('.hero').css('background-image', 'url(' + $('.hero').data('img-lg') + ')')
	}
}
$(".accorden-item__title").on("click", function () {
	$(".accorden-item__title").removeClass("is-open"),
		$(this).addClass("is-open");
	var t = $(this).next();
	$(this).parent().hasClass("show-in") ? $(".show-in .accorden-item__content").stop().animate({
			height: "0"
		}, 250) : ($(".show-in .accorden-item__content").stop().animate({
			height: "0"
		}, 250), o(t, 250)),
		$(this).parent().toggleClass("show-in").siblings().removeClass("show-in")
});

function o(t, e) {
	var a = t.height(),
		i = t.css("height", "auto").height();
	t.height(a),
		t.stop().animate({
			height: i
		}, e)
}
$('.feed-button').on('click', function (e) {
	if (!$(this).prev('div').hasClass('feed-max')) {
		$('.feed--text').removeClass('feed-max');
		$(this).prev('div').toggleClass('feed-max');
		$(this).html('Скрыть');
		$('.feed-button').not(this).html('Подробнее');
	} else {
		$(this).prev('div').removeClass('feed-max');
		$('.feed-button').html('Подробнее');
	}
});
$('#allrecords').after('<div id="copydel"></div>');
$(".program__item:first").addClass('program-item-block-max');
setTimeout(function () {
	$('#tildacopy').css("display", "none");
}, 100);
$(".program__item").click(function () {
	$(this).toggleClass('program-item-block-max');
	$('.program__item').not(this).removeClass('program-item-block-max');
});
$("#packageModal").click(function () {
	$(".modal--itemsmob").addClass('active');
	$(".modal--itemsmob-bg").addClass('on');
});
$("#packageModalClose").click(function () {
	$(".modal--itemsmob").removeClass('active');
	$(".modal--itemsmob-bg").removeClass('on');
});
$('a.box--btn').on('click', function (e) {
	$('html,body').stop().animate({
		scrollTop: $('#form').offset().top + 260
	}, 1000);
	e.preventDefault();
});

if ($(window).width() > 768) {
	$('.speaker--card').hover(function () {
		$('.speaker--card').not(this).toggleClass('opacity');
	});
};
if ($(window).width() < 768) {
	$('.speaker--card').click(function () {
		$(this).toggleClass('hover-card');
		$('.speaker--card').not(this).removeClass('hover-card').toggleClass('opacity');
	});
};

$('.footer a').click(function() {
	$(this).target = "_blank";
	window.open($(this).prop('href'));
	return false;
});