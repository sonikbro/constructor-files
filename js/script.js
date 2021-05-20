"use strict";

// Установка после загрузки
window.addEventListener('DOMContentLoaded', function () {
    $(".hamburger").click(function () {
        $(this).hasClass("is-active") ? LP.MENU.close() : LP.MENU.open()
    });
    LP.HERO.setSize();
    LP.CORE.init();
    LP.CORE.loadPrice();
    $(".tabs__tab:first-child").click();

    setBackground();
    searchToObject();

    LP.CUSTOM.setVaidPhone();
    LP.CUSTOM.setInputAllRequired();
    LP.CUSTOM.setFondy();
    LP.CUSTOM.setLocationHref();
    LP.CUSTOM.setCookie();
    LP.CUSTOM.updateStaticInfo();
});


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var slice = Array.prototype.slice; // save ref to original slice()
    var splice = Array.prototype.splice; // save ref to original slice()

    var defaults = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: 'is-sticky',
            wrapperClassName: 'sticky-wrapper',
            center: false,
            getWidthFrom: '',
            widthFromWrapper: true, // works only when .getWidthFrom is empty
            responsiveWidth: false,
            zIndex: 'inherit'
        },
        $window = $(window),
        $document = $(document),
        sticked = [],
        windowHeight = $window.height(),
        scroller = function () {
            var scrollTop = $window.scrollTop(),
                documentHeight = $document.height(),
                dwh = documentHeight - windowHeight,
                extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

            for (var i = 0, l = sticked.length; i < l; i++) {
                var s = sticked[i],
                    elementTop = s.stickyWrapper.offset().top,
                    etse = elementTop - s.topSpacing - extra;

                //update height in case of dynamic content
                s.stickyWrapper.css('height', s.stickyElement.outerHeight());

                if (scrollTop <= etse) {
                    if (s.currentTop !== null) {
                        s.stickyElement
                            .css({
                                'width': '',
                                'position': '',
                                'top': '',
                                'z-index': ''
                            });
                        s.stickyElement.parent().removeClass(s.className);
                        s.stickyElement.trigger('sticky-end', [s]);
                        s.currentTop = null;
                    }
                } else {
                    var newTop = documentHeight - s.stickyElement.outerHeight() -
                        s.topSpacing - s.bottomSpacing - scrollTop - extra;
                    if (newTop < 0) {
                        newTop = newTop + s.topSpacing;
                    } else {
                        newTop = s.topSpacing;
                    }
                    if (s.currentTop !== newTop) {
                        var newWidth;
                        if (s.getWidthFrom) {
                            padding = s.stickyElement.innerWidth() - s.stickyElement.width();
                            newWidth = $(s.getWidthFrom).width() - padding || null;
                        } else if (s.widthFromWrapper) {
                            newWidth = s.stickyWrapper.width();
                        }
                        if (newWidth == null) {
                            newWidth = s.stickyElement.width();
                        }
                        s.stickyElement
                            .css('width', newWidth)
                            .css('position', 'fixed')
                            .css('top', newTop)
                            .css('z-index', s.zIndex);

                        s.stickyElement.parent().addClass(s.className);

                        if (s.currentTop === null) {
                            s.stickyElement.trigger('sticky-start', [s]);
                        } else {
                            // sticky is started but it have to be repositioned
                            s.stickyElement.trigger('sticky-update', [s]);
                        }

                        if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
                            // just reached bottom || just started to stick but bottom is already reached
                            s.stickyElement.trigger('sticky-bottom-reached', [s]);
                        } else if (s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
                            // sticky is started && sticked at topSpacing && overflowing from top just finished
                            s.stickyElement.trigger('sticky-bottom-unreached', [s]);
                        }

                        s.currentTop = newTop;
                    }

                    // Check if sticky has reached end of container and stop sticking
                    var stickyWrapperContainer = s.stickyWrapper.parent();
                    var unstick = (s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight()) && (s.stickyElement.offset().top <= s.topSpacing);

                    if (unstick) {
                        s.stickyElement
                            .css('position', 'absolute')
                            .css('top', '')
                            .css('bottom', 0)
                            .css('z-index', '');
                    } else {
                        s.stickyElement
                            .css('position', 'fixed')
                            .css('top', newTop)
                            .css('bottom', '')
                            .css('z-index', s.zIndex);
                    }
                }
            }
        },
        resizer = function () {
            windowHeight = $window.height();

            for (var i = 0, l = sticked.length; i < l; i++) {
                var s = sticked[i];
                var newWidth = null;
                if (s.getWidthFrom) {
                    if (s.responsiveWidth) {
                        newWidth = $(s.getWidthFrom).width();
                    }
                } else if (s.widthFromWrapper) {
                    newWidth = s.stickyWrapper.width();
                }
                if (newWidth != null) {
                    s.stickyElement.css('width', newWidth);
                }
            }
        },
        methods = {
            init: function (options) {
                return this.each(function () {
                    var o = $.extend({}, defaults, options);
                    var stickyElement = $(this);

                    var stickyId = stickyElement.attr('id');
                    var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
                    var wrapper = $('<div></div>')
                        .attr('id', wrapperId)
                        .addClass(o.wrapperClassName);

                    stickyElement.wrapAll(function () {
                        if ($(this).parent("#" + wrapperId).length == 0) {
                            return wrapper;
                        }
                    });

                    var stickyWrapper = stickyElement.parent();

                    if (o.center) {
                        stickyWrapper.css({
                            width: stickyElement.outerWidth(),
                            marginLeft: "auto",
                            marginRight: "auto"
                        });
                    }

                    if (stickyElement.css("float") === "right") {
                        stickyElement.css({
                            "float": "none"
                        }).parent().css({
                            "float": "right"
                        });
                    }

                    o.stickyElement = stickyElement;
                    o.stickyWrapper = stickyWrapper;
                    o.currentTop = null;

                    sticked.push(o);

                    methods.setWrapperHeight(this);
                    methods.setupChangeListeners(this);
                });
            },

            setWrapperHeight: function (stickyElement) {
                var element = $(stickyElement);
                var stickyWrapper = element.parent();
                if (stickyWrapper) {
                    stickyWrapper.css('height', element.outerHeight());
                }
            },

            setupChangeListeners: function (stickyElement) {
                if (window.MutationObserver) {
                    var mutationObserver = new window.MutationObserver(function (mutations) {
                        if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
                            methods.setWrapperHeight(stickyElement);
                        }
                    });
                    mutationObserver.observe(stickyElement, {
                        subtree: true,
                        childList: true
                    });
                } else {
                    if (window.addEventListener) {
                        stickyElement.addEventListener('DOMNodeInserted', function () {
                            methods.setWrapperHeight(stickyElement);
                        }, false);
                        stickyElement.addEventListener('DOMNodeRemoved', function () {
                            methods.setWrapperHeight(stickyElement);
                        }, false);
                    } else if (window.attachEvent) {
                        stickyElement.attachEvent('onDOMNodeInserted', function () {
                            methods.setWrapperHeight(stickyElement);
                        });
                        stickyElement.attachEvent('onDOMNodeRemoved', function () {
                            methods.setWrapperHeight(stickyElement);
                        });
                    }
                }
            },
            update: scroller,
            unstick: function (options) {
                return this.each(function () {
                    var that = this;
                    var unstickyElement = $(that);

                    var removeIdx = -1;
                    var i = sticked.length;
                    while (i-- > 0) {
                        if (sticked[i].stickyElement.get(0) === that) {
                            splice.call(sticked, i, 1);
                            removeIdx = i;
                        }
                    }
                    if (removeIdx !== -1) {
                        unstickyElement.unwrap();
                        unstickyElement
                            .css({
                                'width': '',
                                'position': '',
                                'top': '',
                                'float': '',
                                'z-index': ''
                            });
                    }
                });
            }
        };

    // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
    if (window.addEventListener) {
        window.addEventListener('scroll', scroller, false);
        window.addEventListener('resize', resizer, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scroller);
        window.attachEvent('onresize', resizer);
    }

    $.fn.sticky = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }
    };

    $.fn.unstick = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.unstick.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }
    };
    $(function () {
        setTimeout(scroller, 0);
    });
}));


/**
 * SyoTimer v.1.1.0 | under MIT licence
 * https://github.com/mrfratello/SyoTimer#readme
 */
! function (e) {
    const t = 86400,
        i = 3600,
        o = 60;
    var n = {
        rus: {
            second: ["секунда", "секунды", "секунд"],
            minute: ["минута", "минуты", "минут"],
            hour: ["час", "часа", "часов"],
            day: ["день", "дня", "дней"]
        },
        eng: {
            second: ["second", "seconds"],
            minute: ["minute", "minutes"],
            hour: ["hour", "hours"],
            day: ["day", "days"]
        }
    };
    const r = {
        year: 2014,
        month: 7,
        day: 31,
        hour: 0,
        minute: 0,
        second: 0,
        timeZone: "local",
        ignoreTransferTime: !1,
        periodic: !1,
        periodInterval: 7,
        periodUnit: "d",
        dayVisible: !0,
        dubleNumbers: !0,
        doubleNumbers: !0,
        effectType: "none",
        lang: "eng",
        headTitle: "",
        footTitle: "",
        afterDeadline: function (e) {
            e.bodyBlock.html('<p style="font-size: 1.2em;">Мероприятие закончилось</p>')
        }
    };
    var a = {
            init: function (t) {
                var i = e.extend({}, r, t || {});
                return t.hasOwnProperty("dubleNumbers") && (i.doubleNumbers = t.dubleNumbers), this.each(function () {
                    var t = e(this);
                    t.data("syotimer-options", i), a._render.apply(this, []), a._perSecondHandler.apply(this, [])
                })
            },
            _render: function () {
                var t, i = e(this),
                    o = i.data("syotimer-options"),
                    n = o.dayVisible ? s.getCellDom("day", "0") : "";
                t = '<div class="timer-head-block">' + o.headTitle + '</div><div class="timer-body-block">' + n + s.getCellDom("hour") + s.getCellDom("minute") + s.getCellDom("second") + '</div><div class="timer-foot-block">' + o.footTitle + "</div>", i.addClass("syotimer").addClass("timer").html(t);
                var r = e(".timer-head-block", i),
                    a = e(".timer-body-block", i),
                    d = e(".timer-foot-block", i),
                    l = {
                        headBlock: r,
                        bodyBlock: a,
                        footBlock: d
                    };
                i.data("syotimer-blocks", l)
            },
            _perSecondHandler: function () {
                var t = e(this),
                    i = t.data("syotimer-options");
                e(".second .tab-val", t).css("opacity", 1);
                var o = new Date,
                    n = new Date(i.year, i.month - 1, i.day, i.hour, i.minute, i.second),
                    r = s.getDifferenceWithTimezone(o, n, i),
                    d = s.getSecondsToDeadLine(r, i);
                d >= 0 ? (a._refreshUnitsDom.apply(this, [d]), a._applyEffectSwitch.apply(this, [i.effectType])) : (t = e.extend(t, t.data("syotimer-blocks")), i.afterDeadline(t))
            },
            _refreshUnitsDom: function (t) {
                var i = e(this),
                    o = i.data("syotimer-options"),
                    r = ["day", "hour", "minute", "second"],
                    a = s.getUnitsToDeadLine(t),
                    d = n[o.lang];
                o.dayVisible || (a.hour += 24 * a.day, r.splice(0, 1));
                for (var l = 0; l < r.length; l++) {
                    var c = r[l],
                        u = "." + c;
                    e(u + " .tab-val", i).html(s.format2(a[c], "day" != c && o.doubleNumbers)), e(u + " .tab-unit", i).html(s.definitionOfNumerals(a[c], d[c], o.lang))
                }
            },
            _applyEffectSwitch: function (t) {
                var i = this,
                    o = e(i);
                switch (t) {
                    case "none":
                        setTimeout(function () {
                            a._perSecondHandler.apply(i, [])
                        }, 1e3);
                        break;
                    case "opacity":
                        e(".second .tab-val", o).animate({
                            opacity: .1
                        }, 1e3, "linear", function () {
                            a._perSecondHandler.apply(i, [])
                        })
                }
            }
        },
        s = {
            getCellDom: function (e, t) {
                return e = e || "", t = t || "00", '<div class="table-cell ' + e + '"><div class="tab-val">' + t + '</div><div class="tab-metr tab-unit"></div></div><div class="timer-dots">:</div>'
            },
            getSecondsToDeadLine: function (e, t) {
                var i, o = e / 1e3;
                if (o = Math.floor(o), t.periodic) {
                    var n, r, a = s.getPeriodUnit(t.periodUnit),
                        d = e / (1e3 * a);
                    d = Math.ceil(d), d = Math.abs(d), o >= 0 ? (r = d % t.periodInterval, r = 0 == r ? t.periodInterval : r, r -= 1) : r = t.periodInterval - d % t.periodInterval, n = o % a, 0 == n && o < 0 && r--, i = Math.abs(r * a + n)
                } else i = o;
                return i
            },
            getUnitsToDeadLine: function (e) {
                for (var t = ["day", "hour", "minute", "second"], i = {}, o = 0; o < t.length; o++) {
                    var n = t[o],
                        r = s.getPeriodUnit(n);
                    i[n] = Math.floor(e / r), e %= r
                }
                return i
            },
            getPeriodUnit: function (e) {
                switch (e) {
                    case "d":
                    case "day":
                        return t;
                    case "h":
                    case "hour":
                        return i;
                    case "m":
                    case "minute":
                        return o;
                    case "s":
                    case "second":
                        return 1
                }
            },
            getDifferenceWithTimezone: function (e, t, i) {
                var o, n = t.getTime() - e.getTime(),
                    r = 0,
                    a = 0;
                if ("local" !== i.timeZone) {
                    var d = parseFloat(i.timeZone) * s.getPeriodUnit("hour"),
                        l = -e.getTimezoneOffset() * s.getPeriodUnit("minute");
                    r = 1e3 * (d - l)
                }
                if (i.ignoreTransferTime) {
                    var c = -e.getTimezoneOffset() * s.getPeriodUnit("minute"),
                        u = -t.getTimezoneOffset() * s.getPeriodUnit("minute");
                    a = 1e3 * (c - u)
                }
                return o = r + a, n - o
            },
            format2: function (e, t) {
                return t = t !== !1, e <= 9 && t ? "0" + e : "" + e
            },
            definitionOfNumerals: function (e, t, i) {
                switch (i) {
                    case "rus":
                        var o, n = [2, 0, 1, 1, 1, 2];
                        return o = e % 100 > 4 && e % 100 < 20 ? 2 : n[e % 10 < 5 ? e % 10 : 5], t[o];
                    case "eng":
                        return t[1 == e ? 0 : 1]
                }
            }
        },
        d = {
            setOption: function (t, i) {
                var o = e(this),
                    n = o.data("syotimer-options");
                n.hasOwnProperty(t) && (n[t] = i, o.data("syotimer-options", n))
            }
        };
    e.fn.syotimer = function (t) {
        if ("string" == typeof t && "setOption" === t) {
            var i = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                d[t].apply(this, i)
            })
        }
        return null === t || "object" == typeof t ? a.init.apply(this, [t]) : void e.error("SyoTimer. Error in call methods: methods is not exist")
    }
}(jQuery);

// Имитация модулей
var LP = {
    CORE: {
        init: function () {
            $("header").sticky({
                topSpacing: 0
            }), $("[data-href],  .header__menu a:not(.menu__item--phone)").click(function (t) {
                t.preventDefault();
                var e = $(this).data("href") ? $(this).data("href") : $(this).attr("href");
                $("html, body").animate({
                    scrollTop: $(e).offset().top - parseInt($(".header").height())
                }, 800), LP.MENU.close()
            }), $("[data-modal]").click(function (t) {
                t.preventDefault(), LP.CORE.showModal($(this).data("modal"))
            }), $("[data-modal-close]").click(function (t) {
                t.preventDefault(), LP.CORE.closeModal($(this).data("modal-close"))
            }), $(".tabs__tab, [data-id]").click(function () {
                $(".tabs__tab").removeClass("tabs__tab--active"), $(this).not('.package_price').addClass("tabs__tab--active"), LP.CORE.selectPackage($(this))
            })
        },
        loadPrice: function () {
            autoPriceChange("[data-price]", "[data-total-price]", "[data-deadline]")
        },
        showModal: function (t) {
            $(t).addClass("modal--active");
            $('body').css("overflow", "hidden");
            $(".getcall__wrapper").css("display", "none")
        },
        closeModal: function (t) {
            $(t).removeClass("modal--active");
            $('body').css("overflow", "visible");
            $(".getcall__wrapper").css("display", "block")
        },
        selectPackage: function (t) {
            t.attr("data-package-type") && $("[data-pckg-text]").length && $("[data-pckg-text]").text(t.attr("data-package-type")), LP.CORE.getPriceByID(t.data("id"))
        },
        getPriceByID: function (t) {
            if (!t) return !1;
            var e;
            e = $(".zoho_url").length ? "https://crm-oz.constructor.biz.ua/landing/price?landing_id=" + t + "&token=LapQMWHF9k5QPPGRkfRnAtACAGwUcX2tkaVgyDuQe76crMGnrU" : "//proceed.bizconstructor.com/price?landingId=" + t;
            var n = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
            $.get(e, function (t) {
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
        getSearchJson: function () {
            var t, e, a = window.location.search.substring(1).split("&"),
                n = {};
            for (e in a)
                if ("" !== a[e] && (t = a[e].split("="), !n[decodeURIComponent(t[0])])) {
                    if (n[decodeURIComponent(t[0])] = decodeURIComponent(t[1]), "landing_id" != t[0] && "phone" != t[0] && $('[name="' + t[0] + '"]').length) {
                        var i = decodeURIComponent(t[1]);
                        $('[name="' + t[0] + '"]').val(i.replace("+", " "))
                    }
                    "phone" == t[0] && setTimeout(function () {
                        $("#phone").blur()
                    }, 1e3)
                }
            return n
        },
        setActivaButtonsByID: function (t) {
            $("[data-id]").not('.package_price').removeClass("active__button__id tabs__tab--active"), $('[data-id="' + t + '"]').not('.package_price').addClass("active__button__id tabs__tab--active")
        },
        setPriceThanks: function (t, e, a) {
            let n;
            if ($(".zoho_url").length) {
                n = "https://crm-oz.constructor.biz.ua/landing/price?landing_id=" + t + "&token=LapQMWHF9k5QPPGRkfRnAtACAGwUcX2tkaVgyDuQe76crMGnrU";

                $.get(n, function (t) {
                    $(e).text(t.maxPrice),
                        $(a).text(t.price)
                })
            }

        }
    },
    MENU: {
        open: function () {
            $(".hamburger").addClass("is-active"), $(".header__menu").addClass("header__menu--active")
        },
        close: function () {
            $(".hamburger").removeClass("is-active"), $(".header__menu").removeClass("header__menu--active")
        }
    },
    HERO: {
        setSize: function () {
            var t = $(".hero"),
                e = parseInt($(".wrapper").css("padding-top")) + parseInt($(".header").height());
            t.css("min-height", $window.height() - e)
        }
    },
    CUSTOM: {
        setFondy: function () {
            // fondy autochange id
            const fondyMerchant = document.querySelectorAll('input[name="f_m_id"]');

            function setMerchant() {
                fondyMerchant.forEach(function (item) {
                    // Программы
                    if (item.value == 'fondy_pr') {
                        item.value = '1475292';
                    }
                    // Самитты
                    else if (item.value == 'fondy_sm') {
                        item.value = '1439508';
                    }
                    // ПМ, МК
                    else if (item.value == 'fondy_mk_pm') {
                        item.value = '1450447';
                    }
                     // RU all
                    else if (item.value == 'fondy_ru') {
                        item.value = '1452337';
                    }
                });
            };
            if (!fondyMerchant.length == 0) {
                setMerchant();
            };
        },
        setCookie: function () {
            try {
                if ($('.zoho_url').length) {
                    var getId = getGA();

                    if (getId) {
                        $('input[name="google_client_id"]').val(getId);
                    } else {
                        var timerID = setInterval(checkGA, 200);
                    }

                    function checkGA() {
                        //get GA from cookie
                        getId = getGA();

                        if (getId) {
                            $('input[name="google_client_id"]').val(getId);
                            clearInterval(timerID);
                        }
                    }

                    function getGA() {
                        var res = getCookie('_ga');
                        if (res !== null) {
                            var parts = res.split('.', 4);
                            if (parts.length === 4) {
                                return parts[2] + '.' + parts[3];
                            }
                        }
                        return false;
                    }

                    function getCookie(name) {
                        var nameEQ = name + "=";
                        var ca = document.cookie.split(';');
                        for (var i = 0; i < ca.length; i++) {
                            var c = ca[i];
                            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                        }
                        return null;
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        setVaidPhone: function () {
            // Валидация tel
            function setCursorPosition(pos, elem) {
                elem.focus();
                if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
                else if (elem.createTextRange) {
                    var range = elem.createTextRange();
                    range.collapse(true);
                    range.moveEnd("character", pos);
                    range.moveStart("character", pos);
                    range.select()
                }
            };

            function maskPhone(event) {
                let matrix = "+ ____________",
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, "");

                if (def.length >= val.length) val = def;
                this.value = matrix.replace(/./g, function (a) {
                    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
                });

                if (event.type == "blur") {
                    if (this.value.length == 2) this.value = ""
                } else setCursorPosition(this.value.length, this)
            };

            let validPhone = document.querySelectorAll('input[name="phone"]');
            if (validPhone) {
                validPhone.forEach(item => {
                    item.addEventListener("input", maskPhone, false);
                    item.addEventListener("focus", maskPhone, false);
                    item.addEventListener("blur", maskPhone, false);
                })
            }
        },
        setInputAllRequired: function () {
            // Сделать все поля обязательными
            let inputsName = document.getElementsByName("name"),
                inputsEmail = document.getElementsByName("email"),
                inputsPhone = document.getElementsByName("phone");

            function setInputAllRequired(item) {
                item.forEach(input => {
                    input.setAttribute("required", "true");
                })
            };

            setInputAllRequired(inputsName);
            setInputAllRequired(inputsEmail);
            setInputAllRequired(inputsPhone);
        },
        setLocationHref: function () {
            const newInputs = '<input type="hidden" name="rolecompany" value=""><input type="hidden" name="countcompany" value="">',
                inputlocationHref = `<input type="hidden" name="location_href" value="${window.location.href}">`,
                forms = document.querySelectorAll('.zoho_url');

            forms.forEach(item => {
                item.insertAdjacentHTML('beforeend', newInputs);
                item.insertAdjacentHTML('beforeend', inputlocationHref)
            });
        },
        updateStaticInfo: function () {
            // footer change url terms-conditions
            $('.footer-col.second-col .footer-col-list .list-footer a').last().text('Публичная оферта UA');
            $('.footer-col.second-col .footer-col-list .list-footer').last().after("<li class='list-footer'><a href='http://terms-conditions.bizconstructor.com/kz' target='_blank'>Публичная оферта KZ</a></li>");

            // footer contact change url text
            $(".form__contact span").each(function () {
                var text = $(this).text();
                text = text.replace("Или напишите нам письмо:", "Или напишите письмо:");
                $(this).text(text);
            });

            // footer contact change UA address
            $('.footer-col.four-col .footer-col-list ul .list-footer.footer--contacts:nth-child(1) p:nth-child(2)').html('Киев, Боричев Ток, 35В' + '<br style="display: block">' + 'Platforma Fortuna');

            // footer contact change KZ address
            $('.footer-col.four-col .footer-col-list ul .list-footer.footer--contacts:nth-child(2) p:nth-child(2)').html('Алматы, ул. Байзакова, 280,' + '<br style="display: block">' + 'БЦ «Almaty Towers»');


            // Update contact us UA
            $(".form__contact a[href='https://goo.gl/maps/z4gUF1AKAJRSFfge8").attr('href', 'https://g.page/coworking-platforma-fortuna?share').html('Киев, Боричев Ток, 35В, Platforma Fortuna');
            $(".form__contact a[href='https://goo.gl/maps/9LMtuVv7yqCwTziMA").attr('href', 'https://g.page/coworking-platforma-fortuna?share').html('Киев, Боричев Ток, 35В, Platforma Fortuna');

            // Update contact us KZ
            $(".form__contact a[href='https://2gis.kz/almaty/firm/70000001018896711?m=76.939694%2C43.253276%2F16").attr('href', 'https://goo.gl/maps/W9WbpiC1VtsXDmWg9').html('Алматы, ул. Байзакова, 280, БЦ «Almaty Towers», SmArt.Point');
            $(".form__contact a[href='https://goo.gl/maps/jEYTh6j5z2QjLEpg8").attr('href', 'https://goo.gl/maps/W9WbpiC1VtsXDmWg9').html('Алматы, ул. Байзакова, 280, БЦ «Almaty Towers», SmArt.Point');
        }
    }
};


var $window = $(window);
$window.resize(function () {
    LP.HERO.setSize()
});

// setup lg-xs HERO.bg
$(window).resize(setBackground);

function setBackground() {
    if ($(window).width() < 768) {
        $('.hero').css('background-image', 'url(' + $('.hero').data('img-xs') + ')')
    } else {
        $('.hero').css('background-image', 'url(' + $('.hero').data('img-lg') + ')')
    }
};

// Установка полей формы после регистрации
function searchToObject() {
    var pairs = window.location.search.substring(1).split("&"),
        obj = {},
        pair,
        i;

    for (i in pairs) {
        if (pairs[i] === "") continue;

        pair = pairs[i].split("=");

        if (!obj[decodeURIComponent(pair[0])]) {
            obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);

            if (pair[0] != 'landing_id' && pair[0] != 'phone') {
                if ($('[name="' + pair[0] + '"]').length) {
                    var val = decodeURIComponent(pair[1]);
                    $('[name="' + pair[0] + '"]').val(val.replace('+', ' ')).blur();
                }
            }
            if (pair[0] == 'phone') {
                $('[name="' + pair[0] + '"]').val(decodeURIComponent(pair[1]));
                setTimeout(function () {
                    $('#phone').blur()
                }, 1000);
            }
        }
    }
    return obj;
}

// Установка цен на таймере
function autoPriceChange(price, maxprice, maxdate) {
    var id = $('[name="landing_id"]').val();
    var month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    var url;
    if ($('.zoho_url').length) {
        url = '//crm-oz.constructor.biz.ua/landing/price?landing_id=' + id + '&token=LapQMWHF9k5QPPGRkfRnAtACAGwUcX2tkaVgyDuQe76crMGnrU';

        $.get(url, function (data) {
            var date = new Date(data.beforeDate);
            window.price = data.price;
            window.totalPrice = data.maxPrice;
            var dates = data.beforeDate.split('-');
            var monthIndex = (dates[0][0] == 0) ? dates[0].replace('0', '') : dates[0];
            $(maxdate).text(dates[1] + ' ' + month[monthIndex - 1]);
            $(maxprice).text(data.maxPrice);
            $(price).text(data.price);


            if ($('.timer_content').length) {
                $('.timer_content').syotimer({
                    year: dates[2],
                    month: dates[0],
                    day: dates[1],
                    hour: 24,
                    lang: 'rus'
                });
            }
        });
    }
}


// Квиз формы
let quizComplete = false;
let activeForm = null;

const formWithQuiz = document.querySelector('[data-quiz]');

// Если нету квиза - запрос серверу сразу
if (!formWithQuiz) {
    quizComplete = true;
} else {
    modalQuiz();
}

function modalQuiz() {
    const templateTitle = `<div class="quiz--header flex direction--mcolumn--drow space-between"><span>Вопрос <span id="countQuestions">1</span> из ${questions.length}</span><h6 class="quiz__title active_color">Спасибо за ваш ответ!</h6></div>`;

    $('#modal__quiz .module-item__list h6').remove();
    $('#modal__quiz .module-item__list').prepend(templateTitle);

    let questionCounter = 0,
        selections = [],
        quiz = $('#quiz');

    // показываем вопросы
    displayNext();

    // Кнопка вперед
    $('#next').on('click', function (e) {
        e.preventDefault();

        choose();

        if (isNaN(selections[questionCounter])) {
            alert('Выберите один вариант ответа');
        } else {
            questionCounter++;
            displayNext();
        }
    });

    // Кнопка назад
    $('#prev').on('click', function (e) {
        e.preventDefault();

        choose();
        questionCounter--;
        displayNext();
    });

    function createQuestionElement(index) {
        let qElement = $('<div>', {
            id: 'question'
        });

        let question = $('<p>').append(questions[index].question);
        qElement.append(question);

        let radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    // Создает список вариантов ответа
    function createRadios(index) {
        let answers = document.createElement('ul')

        questions[index].choices.forEach((item, i = 0) => {
            answers.insertAdjacentHTML('beforeend', `<li><input type="radio" data-num="${i}" id="${i}" name="answer" value=${item.value} answerkey=${questions[index].key}><label for="${i}">${item.text}</label></li>`)
        });

        return answers;
    }

    // Считывает выбор пользователя и помещает значение в массив и input
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').attr('data-num');

        let currentQuestion = $('input[name="answer"]:checked').attr('answerkey'),
            questionAnswer = $('input[name="answer"]:checked').val();

        $('input[name=' + currentQuestion + ']').val(questionAnswer);
    }

    // Отображает следующий запрошенный элемент
    function displayNext() {
        quiz.fadeOut(function () {
            $('#question').remove();

            if (questionCounter < questions.length) {
                let nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();

                if (!(isNaN(selections[questionCounter]))) {
                    $('input[data-num=' + selections[questionCounter] + ']').prop('checked', true);
                }
                

                if (questionCounter > 0) {
                    $('#prev').show();
                    $('#countQuestions').html(questionCounter + 1)
                } else if (questionCounter == 0) {
                    $('#prev').hide();
                    $('#next').show();
                    $('#countQuestions').html(questionCounter + 1)
                }
            } else {
                $('#modal__quiz').remove();
                quizComplete = true;

                if (activeForm !== null) {
                    activeForm.submit()
                }
            }
        });
    };
}

// Обработчик на форму
$('.zoho_url').submit(function (e) {
    e.preventDefault();

    var form = $(this);
    activeForm = $(this);
    var data = $(form).serialize();
    var url = $(form).attr('action');
    if ($('.zoho_url').length) {
        data = new FormData();
        url = 'https://crm-oz.constructor.biz.ua/landing/save';
        var arrayData = $(form).serializeArray();
        arrayData.forEach(function (el) {
            data.append(el.name, el.value + '');
        });
    };

    $(form).find('.send-form').prop('disabled', true).text('Отправка формы...');

    $.ajax({
        data: data,
        url: url,
        type: $(form).attr('method') || "POST",
        method: $(form).attr('method') || "POST",
        cache: false,
        processData: false,
        contentType: false,
        dataType: 'json'
    }).done(function (server_response) {
        if (server_response.status == 'ok') {
            $(form).find('.send-form').text('Форма отправлена').addClass('send-success');

            if ($(form).data('form') == 'callback') {
                console.log(arrayData);
            } else {
                if (window.dataLayer) {
                    console.log('formsend');
                    dataLayer.push({
                        'event': 'formsend'
                    });
                }
                if ($(form).attr('ga-id') && window.send_GA_event) {
                    send_GA_event($(form).attr('ga-id'))
                }
                window._vis_opt_queue = window._vis_opt_queue || [];
                window._vis_opt_queue.push(function () {
                    _vis_opt_goal_conversion(200);
                });
                if (server_response.link !== false) {
                    if (!quizComplete) {
                        LP.CORE.showModal('#modal__quiz');
                    } else {
                        setTimeout(function () {
                            document.location.href = server_response.link;
                        }, 250);
                    }
                }
            }
        }
    })
    .fail(function (request, status, error) {
        $(form).find('.send-form').text('Что-то не так :(');

        const statusCode = `error_formsend with code: ${request.status}`;
        console.log(statusCode);
        if (window.dataLayer) {
            dataLayer.push({
                'event': statusCode
            });
        }
    })
});


// accordeon section items
function o(t, e) {
    var a = t.height(),
        i = t.css("height", "auto").height();
    t.height(a),
        t.stop().animate({
            height: i
        }, e)
};

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


// Spoiler items section
! function (i) {
    var o, n;
    i(".spoiler__title").on("click", function () {
        o = i(this).parents(".spoiler--item"), n = o.find(".spoiler__info"),
            o.hasClass("active_block") ? (o.removeClass("active_block"), n.slideUp()) : (o.addClass("active_block"), n.stop(!0, !0).slideDown(), o.siblings(".active_block").removeClass("active_block").children(".spoiler__info").stop(!0, !0).slideUp())
    })
}(jQuery);
$('.spoiler--item:first .spoiler__title').click();


// open link with taget
$('.footer a, .form__contact a').click(function () {
    $(this).target = "_blank";
    window.open($(this).prop('href'));
    return false;
});

// footer last year
$('#lastYearFooter, #lastYearFooterMob').html(new Date().getFullYear());


$('body').append('<style>.timer-body-block{display:flex}.timer-body-block {display: flex; font-weight: 400;} .table-cell:after { display: none !important; }</style>');