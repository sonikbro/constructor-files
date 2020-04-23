function autoHeightAnimate(t, e) {
	var a = t.height(),
		i = t.css("height", "auto").height();
	t.height(a), 0 == a ? t.stop().animate({
		height: i
	}, e) : t.stop().animate({
		height: 0
	}, e)
}

function checkValidPhone() {
	var t = $("#getcall__input").val(),
		e = Inputmask.isValid(t, {
			alias: "+38 099 999 99 99"
		});
	return 1 == e ? $("#getcall__input").addClass("getcall__input--success").removeClass("getcall__input--error") : ($("#getcall__input").removeClass("getcall__input--success").addClass("getcall__input--error"), $("#getcall__send").attr("data-shake", "true"), setTimeout(function() {
		$("#getcall__send").attr("data-shake", "false")
	}, 1100)), e
}

function initMask() {
	var t = document.getElementById("getcall__input");
	new Inputmask("+38 099 999 99 99", {
		oncomplete: checkValidPhone,
		groupSeparator: " ",
		showMaskOnHover: !1,
		keypressEvent: function(t, e, a, i, o) {
			var r = this,
				n = $(r),
				l = t.which || t.charCode || t.keyCode;
			if (!(!0 === e || t.ctrlKey && t.altKey) && (t.ctrlKey || t.metaKey || ignorable)) return l === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), setTimeout(function() {
				n.trigger("change")
			}, 0)), !0;
			if (l) {
				46 === l && !1 === t.shiftKey && "" !== opts.radixPoint && (l = opts.radixPoint.charCodeAt(0));
				var s, c = e ? {
						begin: o,
						end: o
					} : caret(r),
					_ = String.fromCharCode(l);
				getMaskSet().writeOutBuffer = !0;
				var u = isValid(c, _, i);
				if (!1 !== u && (resetMaskSet(!0), s = void 0 !== u.caret ? u.caret : e ? u.pos + 1 : seekNext(u.pos), getMaskSet().p = s), !1 !== a) {
					var p = this;
					if (setTimeout(function() {
							opts.onKeyValidation.call(p, l, u, opts)
						}, 0), getMaskSet().writeOutBuffer && !1 !== u) {
						var g = getBuffer();
						writeBuffer(r, g, opts.numericInput && void 0 === u.caret ? seekPrevious(s) : s, t, !0 !== e), !0 !== e && setTimeout(function() {
							!0 === isComplete(g) && n.trigger("complete")
						}, 0)
					}
					if (android && n.is(":focus")) {
						var d = seekNext(u.pos);
						d > 0 && setTimeout(function() {
							caret(r, d)
						}, 0)
					}
				}
				if (t.preventDefault(), e) return u.forwardPosition = s, u
			}
		}
	}).mask(t)
}

function autoAnimation() {
	shakeButton(), setTimeout(showLabel, 6e3), setTimeout(shakeButton, 12e3)
}
var GC_CONFIG = {
		date: new Date,
		domain: "https://forstas.bizconstructor.com/tilda-assets/src/getcall/",
		trigger: "[data-show]",
		wrapper: ".getcall__inner",
		container: ".getcall__content",
		workForm: "work.php",
		holidayForm: "holidays.html",
		expand: !1,
		loaded: !1,
		postUrl: "https://forstas.bizconstructor.com/tilda-assets/src/getcall/proceed.php",
		css: "https://forstas.bizconstructor.com/tilda-assets/src/getcall/build/css/style.css"
	},
	GETCALLHTML = '<div class="getcall__wrapper"><div class="getcall__inner"><div class="getcall__header"><div class="getcall__button" data-show="false" ><div><img src="https://forstas.bizconstructor.com/tilda-assets/src/getcall/build/img/phone.svg" alt=""></div><span></span></div><div class="getcall__hover" data-show="false"><span>Закажите звонок</span><span>или напишите нам сообщение</span></div></div><div class="getcall__content"></div></div></div>',
	GETCALL = {
		init: function() {
			$("head").append('<link rel="stylesheet" href="' + GC_CONFIG.css + '" type="text/css" />'), $(document).on("click", GC_CONFIG.trigger, this.showform), $("body").append(GETCALLHTML), $("body").hasClass("lp-pom-body") && $("html").attr("unbounce", !0)
		},
		showform: function() {
			$(GC_CONFIG.trigger).toggleClass("getcall__button--expand"), $(GC_CONFIG.wrapper).toggleClass("getcall__content--expand"), $(".wait__wrapper, .rating__wrapper, .thanks__wrapper").removeClass("wait__wrapper--visible"), $(".getcall__wrapper").toggleClass("topbottom");
			var t = GETCALL.getDayStatus() ? GC_CONFIG.workForm : GC_CONFIG.holidayForm;
			GETCALL.getFormHtml(t), GC_CONFIG.expand = !GC_CONFIG.expand
		},
		getDayStatus: function() {
			return GC_CONFIG.date.getDay(), !0
		},
		getFormHtml: function(t) {
			return GC_CONFIG.loaded ? void autoHeightAnimate($(".getcall__content"), 200) : $.get(GC_CONFIG.domain + t, function(t) {
				GC_CONFIG.loaded = !0, $(GC_CONFIG.container).html(t), autoHeightAnimate($(".getcall__content"), 200), initMask()
			})
		}
	};
GETCALL.init(), $(document).on("submit", "#getcall__form", function(t) {
	t.preventDefault(), checkValidPhone() && $.post(GC_CONFIG.postUrl, $(this).serialize(), function(t) {
		$(".wait__wrapper").addClass("wait__wrapper--visible"), setTimeout(function() {
			$(".wait__wrapper").removeClass("wait__wrapper--visible"), $(".rating__wrapper").addClass("wait__wrapper--visible")
		}, 6e4);
	});
}), $(document).on("click", "#getcall__repeat", function(t) {
	t.preventDefault(), $(".rating__wrapper, .thanks__wrapper").removeClass("wait__wrapper--visible"), checkValidPhone() && $.post(GC_CONFIG.postUrl, $("#getcall__form").serialize(), function(t) {
		$(".wait__wrapper").addClass("wait__wrapper--visible"), setTimeout(function() {
			$(".wait__wrapper").removeClass("wait__wrapper--visible"), $(".rating__wrapper").addClass("wait__wrapper--visible")
		}, 6e4)
	})
}), $(document).on("mouseover", ".rating__item", function(t) {
	t.preventDefault(), $(".rating__item").removeClass("rating__item--color"), $(this).addClass("rating__item--color").prevAll(".rating__item").addClass("rating__item--color")
}), $(document).on("click", ".rating__item", function(t) {
	t.preventDefault(), $.post(GC_CONFIG.postUrl, {
		value: $(this).attr("data-rating")
	}, function(t) {
		$(".wait__wrapper, .rating__wrapper").removeClass("wait__wrapper--visible"), $(".thanks__wrapper").addClass("wait__wrapper--visible")
	})
}), $(document).on("mouseleave", ".rating__list", function(t) {
	t.preventDefault(), $(".rating__item").removeClass("rating__item--color")
}), setTimeout(function() {
	autoAnimation(), setInterval(autoAnimation, 18e3)
}, 3e3);
var showLabel = function() {
		return !($(window).width() < 769) && ($(".getcall__hover").addClass("getcall__hover--visible"), $(".getcall__button").addClass("getcall__button--rotate"), void setTimeout(function() {
			$(".getcall__hover").removeClass("getcall__hover--visible"), $(".getcall__button").removeClass("getcall__button--rotate")
		}, 3e3))
	},
	shakeButton = function() {
		$(".getcall__button").addClass("shake-bottom"), setTimeout(function() {
			$(".getcall__button").removeClass("shake-bottom")
		}, 2100)
	};
$(".getcall__content").after('<div class="ta"> <a href="https://m.me/business.constructor" target="_blank"><img src="https://forstas.bizconstructor.com/tilda-assets/src/getcall/build/img/fb.svg" alt=""></a> <a href="https://t.me/romatheawesome" target="_blank"><img src="https://forstas.bizconstructor.com/tilda-assets/src/getcall/build/img/tg.svg" alt=""></a> <a href="viber://chat?number=0685280583" target="_blank"><img src="https://forstas.bizconstructor.com/tilda-assets/src/getcall/build/img/vb.svg" alt=""></a> <a href="mailto:r.sagan@bizconstructor.com" target="_blank"><img src="https://forstas.bizconstructor.com/tilda-assets/src/getcall/build/img/email.svg" alt=""></a></div>'), $(".getcall__header").click(function() {
	$(".ta").toggleClass("visible")
}), $(".getcall__button").delay(1e4).animate({
	opacity: "1"
}, 300), $(window).width() < 768 && $(".getcall__hover").click(!1)