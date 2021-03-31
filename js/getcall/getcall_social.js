function autoHeightAnimate(t, e) {
    var a = t.height(),
        i = t.css("height", "auto").height();
    t.height(a), 0 == a ? t.stop().animate({
        height: i
    }, e) : t.stop().animate({
        height: 0
    }, e)
}

function autoAnimation() {
    shakeButton(), setTimeout(showLabel, 6e3), setTimeout(shakeButton, 12e3)
}
$("body").append("<style>.getcall__wrapper .ta{ top:65px;} @media(min-width:769px){ .topbottom{ bottom:120px !important;}} @media (max-width:768px){ .topbottom{ bottom:100px!important;}}</style>");
var GC_CONFIG = {
        date: new Date,
        domain: "//cdn.bizconstructor.com/getcall/",
        trigger: "[data-show]",
        wrapper: ".getcall__inner",
        workForm: "work.php",
        holidayForm: "holidays.html",
        expand: !1,
        loaded: !1,
        postUrl: "//cbk.bizconstructor.com/proceed.php",
        css: "//cdn.bizconstructor.com/getcall/build/css/style.css"
    },
    GETCALLHTML = '<div class="getcall__wrapper"><div class="getcall__inner"><div class="getcall__header"><div class="getcall__button" data-show="false" ><div><img src="//cdn.bizconstructor.com/getcall/build/img/phone.svg" alt=""></div><span></span></div><div class="getcall__hover" data-show="false"><span>Напишите нам</span><span>в удобный для вас мессенджер</span></div></div><div class="ta"> <a href="https://m.me/business.constructor" target="_blank"><img src="https://cdn.bizconstructor.com/getcall/build/img/fb.svg" alt=""></a> <a href="https://t.me/romatheawesome" target="_blank"><img src="https://cdn.bizconstructor.com/getcall/build/img/tg.svg" alt=""></a> <a href="viber://chat?number=0685280583" target="_blank"><img src="https://cdn.bizconstructor.com/getcall/build/img/vb.svg" alt=""></a> <a href="mailto:r.sagan@bizconstructor.com" target="_blank"><img src="https://cdn.bizconstructor.com/getcall/build/img/email.svg" alt=""></a></div></div></div>',
    GETCALL = {
        init: function () {
            $("head").append('<link rel="stylesheet" href="' + GC_CONFIG.css + '" type="text/css" />'), $(document).on("click", GC_CONFIG.trigger, this.showform), $("body").append(GETCALLHTML), $("body").hasClass("lp-pom-body") && $("html").attr("unbounce", !0)
        },
        showform: function () {
            $(GC_CONFIG.trigger).toggleClass("getcall__button--expand"), $(GC_CONFIG.wrapper).toggleClass("getcall__content--expand"), $(".wait__wrapper, .rating__wrapper, .thanks__wrapper").removeClass("wait__wrapper--visible"), $(".getcall__wrapper").toggleClass("topbottom")
        },
        getDayStatus: function () {
            return GC_CONFIG.date.getDay(), !0
        }
    };
GETCALL.init(), $(document).on("submit", "#getcall__form", (function (t) {
    t.preventDefault(), checkValidPhone() && $.post(GC_CONFIG.postUrl, $(this).serialize(), (function (t) {
        $(".wait__wrapper").addClass("wait__wrapper--visible"), setTimeout((function () {
            $(".wait__wrapper").removeClass("wait__wrapper--visible"), $(".rating__wrapper").addClass("wait__wrapper--visible")
        }), 6e4)
    }))
})), $(document).on("click", "#getcall__repeat", (function (t) {
    t.preventDefault(), $(".rating__wrapper, .thanks__wrapper").removeClass("wait__wrapper--visible"), checkValidPhone() && $.post(GC_CONFIG.postUrl, $("#getcall__form").serialize(), (function (t) {
        $(".wait__wrapper").addClass("wait__wrapper--visible"), setTimeout((function () {
            $(".wait__wrapper").removeClass("wait__wrapper--visible"), $(".rating__wrapper").addClass("wait__wrapper--visible")
        }), 6e4)
    }))
})), $(document).on("mouseover", ".rating__item", (function (t) {
    t.preventDefault(), $(".rating__item").removeClass("rating__item--color"), $(this).addClass("rating__item--color").prevAll(".rating__item").addClass("rating__item--color")
})), $(document).on("click", ".rating__item", (function (t) {
    t.preventDefault(), $.post(GC_CONFIG.postUrl, {
        value: $(this).attr("data-rating")
    }, (function (t) {
        $(".wait__wrapper, .rating__wrapper").removeClass("wait__wrapper--visible"), $(".thanks__wrapper").addClass("wait__wrapper--visible")
    }))
})), $(document).on("mouseleave", ".rating__list", (function (t) {
    t.preventDefault(), $(".rating__item").removeClass("rating__item--color")
})), setTimeout((function () {
    autoAnimation(), setInterval(autoAnimation, 18e3)
}), 3e3);
var showLabel = function () {
        return !($(window).width() < 769) && ($(".getcall__hover").addClass("getcall__hover--visible"), $(".getcall__button").addClass("getcall__button--rotate"), void setTimeout((function () {
            $(".getcall__hover").removeClass("getcall__hover--visible"), $(".getcall__button").removeClass("getcall__button--rotate")
        }), 3e3))
    },
    shakeButton = function () {
        $(".getcall__button").addClass("shake-bottom"), setTimeout((function () {
            $(".getcall__button").removeClass("shake-bottom")
        }), 2100)
    };
$(".getcall__header").click((function () {
    $(".ta").toggleClass("visible")
})), $(".getcall__button").delay(1e4).animate({
    opacity: "1"
}, 300), $(window).width() < 768 && $(".getcall__hover").click(!1);