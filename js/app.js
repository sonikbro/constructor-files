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
            e.bodyBlock.html('<p style="font-size: 1.2em;">The countdown is finished!</p>')
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


initPromoHelp();
searchToObject();

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
                // $('[name="'+pair[0]+'"]').inputmask('setvalue', decodeURIComponent( pair[1]) );
                $('[name="' + pair[0] + '"]').val(decodeURIComponent(pair[1]));
                setTimeout(function () {
                    $('#phone').blur()
                }, 1000);
            }
        }

    }

    return obj;
}


function initPromoHelp() {
    var $promo = $('[name="promocode"], #promo');
    var $icon = $('<span id="promoicon"></span>');
    var $text = $('<div class="promotext"></div>');
    var css = {
        'display': 'block',
        'position': 'absolute',
        'bottom': '2px',
        'right': 0,
        'background': 'url(https://forstas.bizconstructor.com/tilda-assets/src/help-icon.min.svg) no-repeat center center',
        'cursor': 'pointer',
        'width': $promo.outerHeight(),
        'height': $promo.outerHeight(),
    }
    var cssText = {
        'display': 'block',
        'position': 'absolute',
        'top': '90%',
        'right': 0,
        'background': '#fff',
        'width': '100%',
        'opacity': 0,
        'margin-top': '-1px',
        'z-index': 500,
        'padding': '1rem',
        'border': '1px solid rgba(99, 103, 103, 0.15)',
        'transition': '0.2s ease-in-out',
        'pointer-events': 'none',
        'font-size': '11px'
    }
    var text = {
        title: 'Промокоды «Бизнес-Конструктор»:',
        content: 'Получите скидку 5%, введя промокод или ФИО человека, порекомендовавшего обучение или введите промокод из рассылки и получите скидку, указанную в тексте письма.'
    }
    $text.append('<strong></strong>');
    $text.append('<p></p>');
    $text.find('strong').text(text.title).css({
        'color': '#818888',
        'font-weight': 600
    });
    $text.find('p').text(text.content).css({
        'margin': '0.5rem 0 0 0',
        'color': '#b6b8b8',
        'line-height': '16px'
    });
    $icon.css(css);
    $text.css(cssText);
    $promo.parent().append($icon);
    $promo.parent().append($text);

}
$(document).on('mouseenter', '#promoicon', function () {
    $(this).siblings('.promotext').addClass('isShow')
})
$(document).on('mouseleave', '#promoicon', function () {
    $(this).siblings('.promotext').removeClass('isShow')
});

function checkPromoCode() {
    var location = window.location.href.replace(window.location.search, '');
    var codes = []
    $('[name="promocode"]').keyup(function () {
        var val = $(this).val().replace(' ', '').toUpperCase();
        var currentVal;
        codes.forEach(function (c) {
            if (c.code.toUpperCase() == val && ((c.enabled.length ? c.enabled.indexOf(location) != -1 : true))) {
                window.activated_promo = true;
                currentVal = val;
                $('.sale-price').addClass('active-promocode');
                $('[data-price]').text(c.percent ? window.price * ((100 - c.value) / 100) : window.price - c.value);
                $('[data-total-price]').text(window.totalPrice);


                setInterval(function () {
                    var landing_id = $('input[name=landing_id]').val();
                    c.rules(landing_id);
                    autoPriceChange('[data-price]', '[data-total-price]', '[data-deadline]');
                }, 1500)
            }
        });
        if (window.activated_promo && val != currentVal) {
            window.activated_promo = false;
            $('[data-price]').text(window.price);
            $('[data-total-price]').text(window.totalPrice);
        }
    });
}

// TODO: FIX REMOVE
function autoPriceChange(price, maxprice, maxdate) {
    var id = $('[name="landing_id"]').val();
    var month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    var url;
    if ($('.zoho_url').length) {
        url = '//crm-oz.constructor.biz.ua/landing/price?landing_id=' + id + '&token=LapQMWHF9k5QPPGRkfRnAtACAGwUcX2tkaVgyDuQe76crMGnrU'
    } else {
        url = '//proceed.bizconstructor.com/price?landingId=' + id;
    };

    $.get(url, function (data) {
        var date = new Date(data.beforeDate);
        window.price = data.price;
        window.totalPrice = data.maxPrice;
        var timestamp = date.getTime();
        var dates = data.beforeDate.split('-');
        var monthIndex = (dates[0][0] == 0) ? dates[0].replace('0', '') : dates[0];
        $(maxdate).text(dates[1] + ' ' + month[monthIndex - 1]);
        $(maxprice).text(data.maxPrice);
        $(price).text(data.price ? data.price : 9000);
        data.price == 9000 ? $("[currency]").text('USD') : $("[currency]").text('грн');


        if ($('.timer_content').length) {
            $('.timer_content').syotimer({
                year: dates[2],
                month: dates[0],
                day: dates[1],
                hour: 24,
                lang: 'rus'
            });
        }

        checkPromoCode();
    });
}

try {
    jQuery(document).ready(function ($) {
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
    });
} catch (error) {
    console.error(error);
}

function initMegaTimer(timestamp) {
    var _id = "490576b02be4f094ad7354524c8caec7";
    while (document.getElementById("timer" + _id)) _id = _id + "0";
    $('[id^="timer"]').html("<div class='megaatimer__wrapper' id='timer" + _id + "' style='min-width:429px;height:73px;'></div>");
    var _t = document.createElement("script");
    _t.src = "https://megatimer.ru/timer/timer.min.js";
    var _f = function (_k) {
        var l = new MegaTimer(_id, {
            "view": [1, 1, 1, 1],
            "type": {
                "currentType": "1",
                "params": {
                    "usertime": true,
                    "tz": "3",
                    "utc": timestamp
                }
            },
            "design": {
                "type": "plate",
                "params": {
                    "round": "0",
                    "background": "opacity",
                    "effect": "none",
                    "space": "0",
                    "separator-margin": "0",
                    "number-font-size": "36",
                    "number-font-color": "#0066cc",
                    "padding": "0",
                    "separator-on": true,
                    "separator-text": ":",
                    "text-on": true,
                    "text-font-size": "13",
                    "text-font-color": "#a7a7a7"
                }
            },
            "designId": 4,
            "theme": "white",
            "width": 193,
            "height": 52
        });
        if (_k != null) l.run();
        setInterval(function () {
            $('.megaatimer__wrapper').removeAttr('style');
        }, 500);
    }
    _t.onload = _f;
    _t.onreadystatechange = function () {
        if (_t.readyState == "loaded") _f(1);
    }
    var _h = document.head || document.getElementsByTagName("head")[0];
    document.getElementsByTagName("head")[0].appendChild(_t);
}

$('body').append('<style>.timer-body-block{display:flex}</style>');

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

$('.zoho_url').submit(function (e) {
    e.preventDefault();
    var form = $(this);
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
        console.log('success');

        if (server_response.status == 'ok') {
            $(form).find('.send-form').text('Форма отправлена').addClass('send-success');

            if ($(form).data('form') == 'callback') {

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
                if (server_response.link != false) {
                    setTimeout(function () {
                        document.location.href = server_response.link;
                    }, 250);
                }
            }
        }
    });
});

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


$('body').append('<style>.timer-body-block{display:flex}#promoicon { opacity: 0.5; transition: 0.2s; } #promoicon:hover { opacity: 1; } .isShow {opacity: 1 !important; top: 100%  !important;} .timer-body-block { display: -webkit-box; display: -webkit-flex; display: -moz-box;display: -ms-flexbox;display: flex;font-family:Open Sans, sans-serif; font-weight: 300; } .table-cell:after { display: none !important; } /* [data-phone] { padding-left: 50px !important; } */ .phone_wrapper { position: relative; } .input__line { position: absolute; width: 43px; height: 27px; border-right: 1px solid #EDEDED; display: block; left: 0; top: 50%; transform: translateY(-50%); -webkit-background-size: 20px !important; background-size: 20px !important; background-position: 11px center !important; background-repeat: no-repeat !important; } </style>');