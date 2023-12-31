/* ScrollAnimations
 */
(function(t, i, a, n) {
    var e = "scrollAnimations",
        s = {
            offset: .7
        };
    var o;

    function m(a, n) {
        if (a) {
            this.element = a;
            this.animationElements = [];
            this.triggerPoint = null;
            this.lastScrollPos = -1;
            this.options = t.extend({}, s, n);
            this._defaults = s;
            this._name = e;
            i.onload = this.init()
        }
    }
    m.prototype = {
        init: function() {
            var a = this;
            var n = t(this.element);
            i.requestAnimationFrame = i.requestAnimationFrame || i.mozRequestAnimationFrame || i.webkitRequestAnimationFrame || i.msRequestAnimationFrame || function(t) {
                setTimeout(t, 1e3 / 60)
            };
            a.setup(n);
            a.updatePage();
            t(i).on("resize", function() {
                a.resize()
            })
        },
        resize: function() {
            var t = this;
            clearTimeout(o);
            o = setTimeout(function() {
                t.setTriggerpoint()
            }, 50)
        },
        setTriggerpoint: function() {
            this.triggerPoint = i.innerHeight * this.options.offset
        },
        setup: function(i) {
            this.setTriggerpoint();
            var a = t(i),
                n = a.find("[data-animation-text]");
            if (n.length) {
                n.each(function() {
                    var i = t(this);
                    var a = i.attr("data-animation-delay");
                    i.css({
                        "-webkit-animation-delay": a,
                        "-moz-animation-delay": a,
                        "-ms-animation-delay": a,
                        "-o-animation-delay": a,
                        "animation-delay": a
                    })
                })
            } else {
                var e = a.attr("data-animation-delay");
                a.css({
                    "-webkit-animation-delay": e,
                    "-moz-animation-delay": e,
                    "-ms-animation-delay": e,
                    "-o-animation-delay": e,
                    "animation-delay": e
                })
            }
            this.animationElements.push(a)
        },
        updatePage: function() {
            var t = this;
            this.animateElements();
            requestAnimationFrame(this.updatePage.bind(this))
        },
        animateElements: function() {
            var a = this;
            var n = i.pageYOffset;
            if (n === this.lastScrollPos) return;
            this.lastScrollPos = n;
            t(a.animationElements).each(function() {
                var i = t(this),
                    e = i.find("[data-animation-text]");
                if (i.hasClass("animated") || n < i.offset().top - a.triggerPoint) return;
                if (e.length) {
                    i.addClass("animated");
                    e.each(function() {
                        t(this).addClass("animated").addClass(t(this).attr("data-animation"))
                    })
                } else {
                    i.addClass("animated").addClass(i.attr("data-animation"))
                }
            })
        }
    };
    t.fn[e] = function(i) {
        return this.each(function() {
            if (!t.data(this, "plugin_" + e)) {
                t.data(this, "plugin_" + e, new m(this, i))
            }
        })
    };
    if (typeof define === "function" && define.amd) {
        define(function() {
            return m
        })
    }
})(jQuery, window, document);