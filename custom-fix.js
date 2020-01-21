$(document).ready(function () {
	setBackground()
});
$(window).resize(setBackground);

function setBackground() {
	if ($(window).width() < 768) {
		$('.hero').css('background-image', 'url(' + $('.hero').data('img-xs') + ')')
	} else {
		$('.hero').css('background-image', 'url(' + $('.hero').data('img-lg') + ')')
	}
};
if (cDate !== 'date') {
	$('.cDate').each(function () {
		$(this).html(cDate);
	});
};
if (cDuration !== 'duration') {
	$('.cDuration').each(function () {
		$(this).html(cDuration);
	});
};
if (cLocation !== 'location') {
	$('.cLocation').each(function () {
		$(this).html(cLocation);
	});
};
if (cCurrency !== 'Currency') {
	$('.cCurrency').each(function () {
		$(this).html(cCurrency);
	});
};
if (cNumber !== 'num') {
	// header
	$('.menu__item--phone--desktop span').each(function () {
		$(this).html(cNumber);
	});
	$('.menu__item--phone--mobile span').each(function () {
		$(this).html(cNumber);
	});
	// mob link header
	var linkCall = "tel:" + cNumber;
	$('.menu__item--phone--mobile').each(function () {
		$(this).attr("href", linkCall);
	});
	// form contact
	$('#form__contact .form__contact:nth-child(1) a').each(function () {
		$(this).html(cNumber);
	});
	$('#form__contact .form__contact:nth-child(1) a').each(function () {
		$(this).attr("href", linkCall);
	});
};
setTimeout(function () {
	if (cLandingId !== 'id') {
		$("input[name='landing_id']").val(cLandingId)
	};
	if (cMail_id !== 'es_mail_id') {
		$("input[name='es_mail_id']").val(cMail_id)
	};
	if (cEs_id !== 'cEs_id') {
		$("input[name='es_id']").val(cEs_id)
	};
	if (cSuccess_url !== 'success_url') {
		$("input[name='success_url']").val(cSuccess_url)
	};
	if (cError_url !== 'error_url') {
		$("input[name='error_url']").val(cError_url)
	};
}, 10);
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
};
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
$('.footer a').click(function () {
	$(this).target = "_blank";
	window.open($(this).prop('href'));
	return false;
});

// new footer production versioan
$('#lastYearFooter, #lastYearFooterMob').html(new Date().getFullYear());

// custom for old footers
$('.foter-foter .desktop').html('® Все права защищены, 2013–2020 Бизнес-Конструктор');
$('.foter-foter .mobile p ~ p').html('2013–2020 Бизнес-Конструктор');

setTimeout(() => {
	$('.table-cell.day .tab-val').css("text-align", "center");
}, 500);

(function () {
	var lastVersioning = Date.UTC(2018, 11, 20, 2, 15, 10);

	var lastCacheDateTime = localStorage.getItem('lastCacheDatetime');

	if (lastCacheDateTime) {
		if (lastVersioning > lastCacheDateTime) {
			var reload = true;
		}
	}

	localStorage.setItem('lastCacheDatetime', Date.now());

	if (reload) {
		location.reload(true);
	}

})();

! function (i) {
	var o, n;
	i(".spoiler__title").on("click", function () {
		o = i(this).parents(".spoiler--item"), n = o.find(".spoiler__info"),
			o.hasClass("active_block") ? (o.removeClass("active_block"),
				n.slideUp()) : (o.addClass("active_block"), n.stop(!0, !0).slideDown(),
				o.siblings(".active_block").removeClass("active_block").children(
					".spoiler__info").stop(!0, !0).slideUp())
	})
}(jQuery);
$('.spoiler--item:first .spoiler__title').click();