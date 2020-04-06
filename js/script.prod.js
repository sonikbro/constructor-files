"use strict";
$(document).ready(function() {
	$(".hamburger").click(function() {
		$(this).hasClass("is-active") ? LP.MENU.close() : LP.MENU.open()
	}), LP.HERO.setSize(), LP.CORE.init(), LP.CORE.loadPrice(), $(".tabs__tab:first-child").click()
});
var $window = $(window);
$window.resize(function() {
	LP.HERO.setSize()
});
var LP = {
	CORE: {
		init: function() {
			$("header").sticky({
				topSpacing: 0
			}), $("[data-href],  .header__menu a:not(.menu__item--phone)").click(function(t) {
				t.preventDefault();
				var e = $(this).data("href") ? $(this).data("href") : $(this).attr("href");
				$("html, body").animate({
					scrollTop: $(e).offset().top - parseInt($(".header").height())
				}, 800), LP.MENU.close()
			}), $("[data-modal]").click(function(t) {
				t.preventDefault(), LP.CORE.showModal($(this).data("modal"))
			}), $("[data-modal-close]").click(function(t) {
				t.preventDefault(), LP.CORE.closeModal($(this).data("modal-close"))
			}), $(".tabs__tab, [data-id]").click(function() {
				$(".tabs__tab").removeClass("tabs__tab--active"), $(this).addClass("tabs__tab--active"), LP.CORE.selectPackage($(this))
			})
		},
		loadPrice: function() {
			autoPriceChange("[data-price]", "[data-total-price]", "[data-deadline]")
		},
		showModal: function(t) {
			$(t).addClass("modal--active")
		},
		closeModal: function(t) {
			$(t).removeClass("modal--active")
		},
		selectPackage: function(t) {
			t.attr("data-package-type") && $("[data-pckg-text]").length && $("[data-pckg-text]").text(t.attr("data-package-type")), LP.CORE.getPriceByID(t.data("id"))
		},
		getPriceByID: function(t) {
			if (!t) return !1;
			var e;
			e = $(".zoho_url").length ? "https://crm-oz.constructor.biz.ua/landing/price?landing_id=" + t + "&token=LapQMWHF9k5QPPGRkfRnAtACAGwUcX2tkaVgyDuQe76crMGnrU" : "//proceed.bizconstructor.com/price?landingId=" + t;
			var n = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
			$.get(e, function(t) {
				new Date(t.beforeDate);
				var e = t.beforeDate.split("-"),
					a = 0 == e[0][0] ? e[0].replace("0", "") : e[0];
				$("[data-deadline]").text(e[1] + " " + n[a - 1]), $("[data-total-price]").text(t.maxPrice), $("[data-price]").text(t.price), $(".timer_content").length && $(".timer_content").syotimer({
					year: e[2],
					month: e[0],
					day: e[1] - 1,
					hour: 24,
					lang: "rus"
				})
			}), $('#form [name="landing_id"]').val(t), LP.CORE.setActivaButtonsByID(t)
		},
		getSearchJson: function() {
			var t, e, a = window.location.search.substring(1).split("&"),
				n = {};
			for (e in a)
				if ("" !== a[e] && (t = a[e].split("="), !n[decodeURIComponent(t[0])])) {
					if (n[decodeURIComponent(t[0])] = decodeURIComponent(t[1]), "landing_id" != t[0] && "phone" != t[0] && $('[name="' + t[0] + '"]').length) {
						var i = decodeURIComponent(t[1]);
						$('[name="' + t[0] + '"]').val(i.replace("+", " "))
					}
					"phone" == t[0] && setTimeout(function() {
						$("#phone").blur()
					}, 1e3)
				}
			return n
		},
		setActivaButtonsByID: function(t) {
			$("[data-id]").removeClass("active__button__id tabs__tab--active"), $('[data-id="' + t + '"]').addClass("active__button__id tabs__tab--active")
		},
		setPriceThanks: function(t, e, a) {
			var n;
			n = $(".zoho_url").length ? "https://crm-oz.constructor.biz.ua/landing/price?landing_id=" + t + "&token=LapQMWHF9k5QPPGRkfRnAtACAGwUcX2tkaVgyDuQe76crMGnrU" : "//proceed.bizconstructor.com/price?landingId=" + t, $.get(n, function(t) {
				$(e).text(t.maxPrice), $(a).text(t.price)
			})
		}
	},
	MENU: {
		open: function() {
			$(".hamburger").addClass("is-active"), $(".header__menu").addClass("header__menu--active")
		},
		close: function() {
			$(".hamburger").removeClass("is-active"), $(".header__menu").removeClass("header__menu--active")
		}
	},
	HERO: {
		setSize: function() {
			var t = $(".hero"),
				e = parseInt($(".wrapper").css("padding-top")) + parseInt($(".header").height());
			t.css("min-height", $window.height() - e)
		}
	}
};
// setup lg-xs HERO.bg
$(document).ready(function() {
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
// accordeon section items
$(".accorden-item__title").on("click", function() {
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
// Program items
$(".container--item:first").addClass('container--item-max');
$(".container--item").click(function() {
	$(this).toggleClass('container--item-max');
	$('.container--item').not(this).removeClass('container--item-max');
});
$('.footer a').click(function() {
	$(this).target = "_blank";
	window.open($(this).prop('href'));
	return false;
});
// footer last year
$('#lastYearFooter, #lastYearFooterMob').html(new Date().getFullYear());
// Spoiler items section
! function(i) {
	var o, n;
	i(".spoiler__title").on("click", function() {
		o = i(this).parents(".spoiler--item"), n = o.find(".spoiler__info"),
			o.hasClass("active_block") ? (o.removeClass("active_block"), n.slideUp()) : (o.addClass("active_block"), n.stop(!0, !0).slideDown(), o.siblings(".active_block").removeClass("active_block").children(".spoiler__info").stop(!0, !0).slideUp())
	})
}(jQuery);
$('.spoiler--item:first .spoiler__title').click();