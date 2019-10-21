setTimeout(function () {
	$('#tildacopy').css("display", "none");
}, 100);
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
$('a.box--btn').on('click', function (e) {
	$('html,body').stop().animate({
		scrollTop: $('#form').offset().top + -100
	}, 1000);
	e.preventDefault();
});
$('#call-link').on('click', function (e) {
	$('html,body').stop().animate({
		scrollTop: $('#form').offset().top + -100
	}, 1000);
	e.preventDefault();
});

$('.box1').on('click', function(e) {
	$('#tabs1').click();
	e.preventDefault();
});
$('.box2').on('click', function(e) {
	$('#tabs2').click();
	e.preventDefault();
});
$('.box3').on('click', function(e) {
	$('#tabs3').click();
	e.preventDefault();
});
$('.box4').on('click', function(e) {
	$('#tabs4').click();
	e.preventDefault();
});
