define(function(require, exports, module) {
    var preload = require('preloadImg');
    var $ = require('fx');
    var Fireworks = require('flowers');


    //预设值
    var bodyH = $('body').height();
    var bodyW = document.documentElement.clientWidth;
    var wellPos = 40;
    var bootW;
    var flagWrapW;
    var jinmaoW;
    var castleW;
    var page2BgMoveH;

    var page1Dom = {
        $hongmao: $('.page1 .screen3 .icon-hongmao'),
        $bg: $('.page1 .background'),
        $mushroom: $('.page1 .screen4 .icon-mushroom'),
        $bootGift: $('.page1 .screen4 .boot-gift-wrap'),
        $screen1: $('.page1 .screen1'),
        $screen2: $('.page1 .screen2'),
        $screen3: $('.page1 .screen3'),
        $screen4: $('.page1 .screen4'),
        $screen5: $('.page1 .screen5'),
        $eggWrap: $('.page1 .screen2 .egg-wrap'),
        $light: $('.page1 .screen3 .icon-light'),
        $speed: $('.page1 .screen3 .icon-speed'),
        $born: $('.page1 .screen3 .icon-born'),
        $title: $('.page1 .screen3 .title'),
        $caption: $('.page1 .screen3 .caption'),
        $arrow: $('.page1 .screen3 .icon-tips-wrap'),
        $timepoint: $('.page1 .time-wrap .timepoint')
    }

    var page2Dom = {
        $hongmao: $('.page2 .screen1 .icon-hongmao'),
        $coin1: $('.page2 .screen2 .icon-coin').eq(0),
        $coin2: $('.page2 .screen2 .icon-coin').eq(1),
        $coin3: $('.page2 .screen2 .icon-coin').eq(2),
        $coin4: $('.page2 .screen2 .icon-coin').eq(3),
        $coinText1: $('.page2 .screen2 .coin-text').eq(0),
        $coinText2: $('.page2 .screen2 .coin-text').eq(1),
        $coinText3: $('.page2 .screen2 .coin-text').eq(2),
        $coinText4: $('.page2 .screen2 .coin-text').eq(3),
        $screen2: $('.page2 .screen2'),
        $bg: $('.page2 .background'),
        $title: $('.page2 .background .title'),
        $caption: $('.page2 .background .caption'),
        $timepoint: $('.page2 .time-wrap .timepoint')

    }

    var page3Dom = {
        $screen1: $('.page3 .screen1'),
        $screen2: $('.page3 .screen2'),
        $bootGift: $('.page3 .screen1 .boot-gift-wrap'),
        $hongmao: $('.page3 .screen1 .icon-hongmao'),
        $smog: $('.page3 .icon-smog'),
        $bg: $('.page3 .background'),
        $light: $('.page3 .screen2 .icon-yellow-light'),
        $born: $('.page3 .screen2 .icon-jinmao-born'),
        $jinmao: $('.page3 .screen2 .icon-jinmao'),
        $speed: $('.page3 .screen2 .icon-speed'),
        $well: $('.page3 .screen2 .icon-v-well'),
        $caption: $('.page3 .background .caption'),
        $title: $('.page3 .background .title'),
        $duang: $('.page3 .screen2 .icon-duang'),
        $arrow: $('.page3 .screen2 .icon-tips-wrap'),
        $timepoint: $('.page3 .time-wrap .timepoint')
    }

    var page4Dom = {
        $well: $('.page4 .screen1 .icon-v-r-well'),
        $flagWrap: $('.page4 .screen1 .icon-flag-wrap'),
        $jinmao: $('.page4 .screen1 .icon-jinmao-wrap'),
        $castle: $('.page4 .screen1 .icon-castle-wrap'),
        $bg: $('.page4 .background'),
        $cflag: $('.page4 .screen1 .icon-castle-flag-wrap'),
        $gspeed1: $('.page4 .screen1 .icon-global-speed1'),
        $gspeed2: $('.page4 .screen1 .icon-global-speed2'),
        $vipTitle: $('.page4 .screen1 .icon-svip-title'),
        $vipBtn: $('.page4 .screen1 .btn-open'),
        $caption1: $('.page4 .background .caption1'),
        $caption2: $('.page4 .background .caption2'),
        $timepoint: $('.page4 .time-wrap .timepoint')
    }

    //获取当前的系统版本号
    var version = /Android (\d.\d.\d)/i.test(window.navigator.userAgent) && /android (\d.\d.\d)/i.exec(window.navigator.userAgent)[1];

    if (version && version.indexOf(2.3) >= 0) {}

    //小屏幕缩放

    if (bodyH < 480) {

        $('.page1 .screen1,.page1 .screen2').css({
            '-webkit-transform': 'matrix(0.8,0,0,0.8,0,0)',
            '-webkit-transform-origin': '50% 12px'
        })
        $('.page1 .egg-wrap').css({
            '-webkit-transform': 'translateY(60px)'
        })
    }
    //图片预加载
    preload.init({
        imgs: [
            './img/p2_bg.png',
            './img/yellow-light.png',
            './img/light.png',
            './img/background-scd9ab21850.png',
            './img/brick-se25e374d52.png',
            './img/egg-se468f40169.png',
            './img/flag-sf4e3434961.png',
            './img/global-speed1.png',
            './img/global-speed2.png',
            './img/hongmao-s1372d001b3.png',
            './img/icons0-sab4ed1818a.png',
            './img/icons1-s5cfebe1081.png',
            './img/icons2-s7327669f78.png',
            './img/icons3-s5fa9af8aa1.png',
            './img/icons4-s7c48cb9270.png',
            './img/jinmao-s162a461063.png',
            './img/smog-see873f31f1.png',
            './img/speed-sa23ff03c79.png'
        ],
        callback: function(o) {
            $('.loading .bar').width(o.progress + '%')
            if (o.isFinish == true) {
                setTimeout(function() {
                    $('.loading').remove()
                }, 200)

                $('.page1').removeClass('none')
                bootW = page1Dom.$bootGift.width();

                //预设值
                page1Dom.$bootGift.css('left', bodyW + 'px')
                page1Dom.$timepoint.css('left', bodyW + 'px');
                page2Dom.$timepoint.css('left', (bodyW / 2 - 35) + 'px')
                page3Dom.$timepoint.css('left', bodyW + 'px')
                page4Dom.$timepoint.css('left', bodyW + 'px')
                page3Dom.$bootGift.css('left', bodyW + 'px')
                page4Dom.$flagWrap.css('left', bodyW + 'px')
                page4Dom.$castle.css('left', bodyW + 'px')
                page2Dom.$hongmao.css('-webkit-transform', 'matrix(1,0,0,1,0,' + -bodyH + ')')

            }
        }
    })

    var View = {
            action: pubsub(),
            init: function() {

            }
        }
        //消息接口

    function pubsub() {
        var lib = {};
        return {
            fire: function(subject, args) {

                if (lib[subject]) {
                    lib[subject].forEach(function(handler) {
                        handler.apply(this, args)
                    })
                }
            },
            on: function(subject, handler) {
                var observer = lib[subject];
                if (!observer) {
                    observer = lib[subject] = [];
                }
                observer.push(handler)
            },
            off: function(subject, handler) {
                var observer = lib[subject];
                if (observer) {
                    if (handler) {
                        var i = observer.indexOf(handler);
                        if (i !== -1) {
                            observer.splice(i, 1);
                        }
                    } else {
                        observer.length = 0;
                    }
                }
            }
        }
    }

    //实现事件代理
    function delegate(elm, subject, table) {
        var selectors = Object.keys(table);

        if (subject == 'webkitTransitionEnd') {
            selectors.forEach(function(sel) {

                if ($(sel)[0] !== undefined) {
                    $(sel)[0].addEventListener(subject, function() {
                        table[sel].call($(sel)[0])
                    })
                } else {
                    console.log(sel + ' is undefined')
                }
            }, table)
        } else {
            elm.addEventListener(subject, function(e) {
                var target = e.target;
                var $sel = $(target)[0];
                selectors.forEach(function(sel) {
                    if ($sel == target) {
                        table[sel].call(target, e);
                    }
                }, table)
            })
        }
    }

    var page1Event = {
        '.page1 .screen1 .egg-wrap': function() {
            View.action.fire('egg:start');
        },
        '.page1 .screen3 .born-wrap': function() {
            View.action.fire('hongmao:start');
        }
    }

    var page1Anievent = {
        '.page1 .screen2 .egg-wrap': function() {
            View.action.fire('egg:up')
        },
        '.page1 .screen2 .icon-egg-break': function() {
            View.action.fire('egg:break')
        },
        '.page1 .screen2 .icon-smog': function() {
            View.action.fire('smog:disappear')
        },
        '.page1 .screen3 .icon-born': function() {
            View.action.fire('hongmao:fall')
        },
        '.page1 .screen3 .icon-hongmao': function() {
            View.action.fire('hongmao:jump')
        },
        '.page1 .screen4 .icon-mushroom': function() {
            View.action.fire('mushroom:move')
        },
        '.page1 .screen4 .icon-well': function() {
            View.action.fire('well:start')
        }
    }

    //注册touchend事件
    delegate($('.page1')[0], 'touchend', page1Event)

    //注册动画回调事件
    delegate($('.page1')[0], 'webkitTransitionEnd', page1Anievent)

    //点击蛋触发的动画
    View.action.on('egg:start', function() {
        page1Dom.$screen1.remove();
        page1Dom.$screen2.removeClass('hide')
        setTimeout(function() {
            page1Dom.$eggWrap.css({
                'bottom': '180px'
            });
        }, 100)
        page1Dom.$timepoint.animate({
            left: bodyW / 2 - 35 + 'px'
        }, 2500, function() {
            page1Dom.$timepoint.addClass('scale')
            page1Dom.$timepoint.find('p').removeClass('none')
        })
    })

    //蛋往上漂浮的动画后的回调
    View.action.on('egg:up', function() {
        page1Dom.$screen2.addClass('p1-s1-anim-start')
    })

    //蛋裂了动画后的回调
    View.action.on('egg:break', function() {
        page1Dom.$eggWrap.animate({
            visibility: 'hidden'
        }, 100)
        page1Dom.$screen2.addClass('p1-s2-anim-start')
    })
    //烟雾消失后的回调
    View.action.on('smog:disappear', function() {
        View.action.off('egg:start')
        page1Dom.$screen2.addClass('p1-s2-anim-end')
        page1Dom.$screen3.removeClass('none').addClass('p1-s3-anim-start')
        //点击发光的红毛 MARK
        View.action.on('hongmao:start', function() {
            page1Dom.$light.addClass('hide')
            page1Dom.$born.find('.icon-star').remove();
            page1Dom.$screen3.addClass('p1-s4-anim-start');
            page1Dom.$born.addClass('hide')
            page1Dom.$hongmao.show();
            page1Dom.$arrow.remove()


            //预加载第二屏dom
            $('.page2').removeClass('none').addClass('hide')

            page2BgMoveH = page2Dom.$bg.find('.bg1').height();
        })

    })

    //红毛掉下来的动画回调
    View.action.on('hongmao:fall', function() {
        page1Dom.$screen4.removeClass('hide')
        page1Dom.$hongmao.addClass('anim-hongmao')
        page1Dom.$bg.addClass('p1-s5-anim-start');

        page1Dom.$title.addClass('anim-fadeOutDown')

        page1Dom.$bootGift.animate({
            left: bodyW / 2 - bootW / 2 + 'px'
        }, 1500, function() {
            //蘑菇砖头来袭

            if (page1Dom.$bootGift.css('left') == (bodyW / 2 - bootW / 2) + 'px') {
                page1Dom.$hongmao.removeClass('anim-hongmao').addClass('move1');
                page1Dom.$bg.addClass('pause')
            }
            page1Dom.$timepoint.animate({
                left: -70 + 'px'
            }, 2500)
        })

    })


    //红毛动作回调
    View.action.on('hongmao:jump', function() {
        if (page1Dom.$hongmao.css('top') == '40px') {
            page1Dom.$hongmao.addClass('move2');

            page1Dom.$screen4.addClass('p1-s6-anim-start');
            page1Dom.$mushroom.removeClass('hide').addClass('appear');

        }
        page1Dom.$screen5.removeClass('none');

    })
    //蘑菇的回调
    View.action.on('mushroom:move', function() {
        var $mushroom = page1Dom.$mushroom;
        if ($mushroom.css('top') == '0px') {
            $mushroom.addClass('move1')

        } else if (($mushroom.css('top') == '11px') && ($mushroom.css('left') == '84px')) {
            $mushroom.addClass('move2')
        } else if (($mushroom.css('top') == '11px') && ($mushroom.css('left') == '146px')) {
            $mushroom.addClass('move3')
        } else if (($mushroom.css('top') == '187px') && ($mushroom.css('left') == '146px')) {
            $mushroom.addClass('move4')
        } else if (($mushroom.css('top') == '187px') && ($mushroom.css('left') == '90px')) {
            $mushroom.remove();
            page1Dom.$hongmao.addClass('anim-speed-hongmao');
            page1Dom.$speed.removeClass('hide');
            page1Dom.$bootGift.animate({
                'left': '-100%'
            }, 1500)
            page1Dom.$bg.addClass('speed').removeClass('pause')
            page1Dom.$screen5.addClass('p1-s7-anim-start')
            page1Dom.$screen4.addClass('p1-s7-anim-start')


        }

    })
    //井的回调
    View.action.on('well:start', function() {
        page1Dom.$speed.remove();
        page1Dom.$hongmao.removeClass('anim-speed-hongmao').css('height', '70px')
        page1Dom.$bg.addClass('pause');
        var hmWidth = page1Dom.$hongmao.width();
        var curTop = parseInt(page1Dom.$hongmao.css('top'));


        var finalW = (bodyW - hmWidth) / 2 - wellPos - 10;
        var middleTop = -62;
        var finalTop = 28;

        page1Dom.$hongmao.animate({
            translate3d: finalW - 10 + 'px,' + middleTop + 'px,0'
        }, 500, 'ease', function() {
            page1Dom.$hongmao.animate({
                translate3d: finalW + 'px,' + finalTop + 'px,0',
                opacity: 0
            }, 800, 'ease', function() {
                $('.page1').addClass('none')
                $('.page2').removeClass('hide')

                page2Dom.$hongmao.css('-webkit-transform', 'matrix(1,0,0,1,0,-374)')
                page2Dom.$screen2.addClass('animate-init')

                //预加载第三屏dom
                $('.page3').removeClass('none').addClass('hide')
            })
        })

    })
    /*---------------------  第二屏  --------------------*/

    var page2Anievent = {
        '.page2 .screen1 .icon-hongmao': function() {
            View.action.fire('hongmao:lfall')
        },
        '.page2 .screen2 .coin1': function() {
            View.action.fire('coin1:disappear')
        },
        '.page2 .screen2 .coin2': function() {
            View.action.fire('coin2:disappear')
        },
        '.page2 .screen2 .coin3': function() {
            View.action.fire('coin3:disappear')
        },
        '.page2 .screen2 .coin4': function() {
            View.action.fire('coin4:disappear')
        }
    }

    //注册动画回调事件
    delegate($('.page2')[0], 'webkitTransitionEnd', page2Anievent)

    //红毛下落触屏金币回调
    View.action.on('hongmao:lfall', function() {

        var $hongmao = page2Dom.$hongmao;

        if ($hongmao.css('-webkit-transform') == 'matrix(1, 0, 0, 1, 0, -374)') {
            page2Dom.$coin1.addClass('hide')
            $hongmao.css('-webkit-transform', 'matrix(1,0,0,1,0,-274)')
        } else if ($hongmao.css('-webkit-transform') == 'matrix(1, 0, 0, 1, 0, -274)') {
            page2Dom.$coin2.addClass('hide')
            $hongmao.css('-webkit-transform', 'matrix(1,0,0,1,0,-184)')
        } else if ($hongmao.css('-webkit-transform') == 'matrix(1, 0, 0, 1, 0, -184)') {
            page2Dom.$coin3.addClass('hide')
            $hongmao.css('-webkit-transform', 'matrix(1, 0, 0, 1, 0, -84)')
        } else if ($hongmao.css('-webkit-transform') == 'matrix(1, 0, 0, 1, 0, -84)') {
            page2Dom.$coin4.addClass('hide');
            $hongmao.css({
                '-webkit-transform': 'matrix(1,0,0,1,0,70)'
            })
        }


    })
    //金币回调
    View.action.on('coin1:disappear', function() {
        page2Dom.$coinText1.removeClass('hidden').addClass('show')
    })
    View.action.on('coin2:disappear', function() {
        page2Dom.$coinText2.removeClass('hidden').addClass('show')
    })
    View.action.on('coin3:disappear', function() {
        page2Dom.$coinText3.removeClass('hidden').addClass('show')
    })
    View.action.on('coin4:disappear', function() {
        page2Dom.$coinText4.removeClass('hidden').addClass('show')

        setTimeout(function() {
            page2Dom.$hongmao.css({
                'bottom': '198px'
            })
            page2Dom.$screen2.css('-webkit-transform', 'matrix(1,0,0,1,0,' + -page2BgMoveH + ')');
            page2Dom.$bg.css('-webkit-transform', 'matrix(1,0,0,1,0,' + -page2BgMoveH + ')');
            page2Dom.$bg.find('.bg2').addClass('anim-start')


        }, 1200)
        setTimeout(function() {
            page2Dom.$timepoint.addClass('scale')
            page2Dom.$timepoint.find('p').removeClass('none')
        }, 2000)
        setTimeout(function() {
            var bootW = page3Dom.$bootGift.width();

            page2Dom.$title.removeClass('anim-fadeInDown')
            page2Dom.$timepoint.animate({
                left: -70 + 'px'
            }, 1200)
            page2Dom.$title.animate({
                opacity: 0,
                top: '5%'
            }, 1200, function() {

                $('.page2').addClass('none')
                $('.page3').removeClass('hide').addClass('p3-s1-anim-start')
                page3Dom.$bootGift.animate({
                    left: bodyW / 2 - bootW / 2 + 'px'
                }, 1500, function() {
                    page3Dom.$hongmao.addClass('move1').removeClass('anim-hongmao')
                    page3Dom.$bg.addClass('pause')
                })

                page3Dom.$hongmao.animate({
                    translate3d: '-77px,0,0'
                }, 500)

                page3Dom.$timepoint.animate({
                    left: bodyW / 2 - 35 + 'px'
                }, 3000, function() {
                    page3Dom.$timepoint.addClass('scale')
                    page3Dom.$timepoint.find('p').removeClass('none')
                })
            })

        }, 4500)


    })

    /*---------------------  第三屏  --------------------*/

    var page3Anievent = {
        '.page3 .screen1 .icon-hongmao': function() {
            View.action.fire('hongmao:eat')
        },
        '.page3 .icon-smog': function() {
            View.action.fire('smog2:end')
        },
        '.page3 .screen2 .icon-jinmao': function() {
            View.action.fire('jinmao:move')
        },
        '.page3 .screen2 .icon-v-well': function() {
            View.action.fire('vwell:appear')
        },
    }
    var page3Event = {
        '.page3 .screen2 .icon-jinmao-born': function() {
            View.action.fire('jinmao:down');
        }
    }

    //注册动画回调事件
    delegate($('.page3')[0], 'webkitTransitionEnd', page3Anievent)
    //注册touchend事件
    delegate($('.page3')[0], 'touchend', page3Event)

    //红毛吃花回调
    View.action.on('hongmao:eat', function() {
        var $hongmao = page3Dom.$hongmao;
        if ($hongmao.css('bottom') == '290px' && $hongmao.css('margin-left') == '-10px') {
            $hongmao.addClass('move2')
        } else if ($hongmao.css('margin-left') == '-5px') {
            page3Dom.$smog.removeClass('hide').addClass('anim-smog')
            page3Dom.$screen1.addClass('anim-end')
        }
    })
    //烟雾消失回调
    View.action.on('smog2:end', function() {
        page3Dom.$smog.remove();
        page3Dom.$light.removeClass('hide')
        page3Dom.$arrow.removeClass('hide')
        page3Dom.$born.removeClass('hide').addClass('anim-bounceIn')
        page3Dom.$duang.removeClass('hide').addClass('anim-bounceIn')

        //预加载第四屏dom
        $('.page4').removeClass('none').addClass('hide')
        flagWrapW = page4Dom.$flagWrap.width();
        jinmaoW = page4Dom.$jinmao.find('.icon-jinmao').width();
        castleW = page4Dom.$castle.width();

        //点击发光的金毛
        View.action.on('jinmao:down', function() {
            page3Dom.$light.remove();
            page3Dom.$born.remove();
            page3Dom.$duang.addClass('hide').removeClass('anim-bounceIn')
            page3Dom.$title.removeClass('none')
            page3Dom.$arrow.addClass('hide')
            page3Dom.$jinmao.removeClass('hide').css('bottom', '124px')

        })
    })
    //金毛动作回调
    View.action.on('jinmao:move', function() {
        page3Dom.$speed.removeClass('hide')
        page3Dom.$jinmao.addClass('anim-speed-jinmao')
        page3Dom.$bg.addClass('speed').removeClass('pause')
        page3Dom.$well.css('right', '0')
        page3Dom.$timepoint.animate({
            left: -70 + 'px'
        }, 3000)
    })
    //横井出现回调
    View.action.on('vwell:appear', function() {
        page3Dom.$bg.addClass('pause')
        page3Dom.$speed.animate({
            translate3d: '370px,0,0'
        }, 1000, 'ease')
        page3Dom.$jinmao.animate({
            translate3d: '370px,0,0'
        }, 1000, 'ease', function() {

            //切换第四屏

            $('.page3').addClass('none')
            $('.page4').removeClass('hide')

            page4Dom.$jinmao.animate({
                left: bodyW / 2 - jinmaoW - flagWrapW + 'px'
            }, 400, 'linear')

            page4Dom.$flagWrap.animate({
                left: bodyW / 2 - flagWrapW / 2 + 'px'
            }, 1800, 'linear', function() {
                if (parseInt(page4Dom.$flagWrap.css('left')) > 0) {
                    page4Dom.$jinmao.find('.icon-jinmao').removeClass('anim-jinmao')
                    page4Dom.$bg.addClass('pause')

                    page4Dom.$jinmao.animate({
                        left: bodyW / 2 - flagWrapW / 2 - jinmaoW / 2 + 4 + 'px',
                        bottom: '320px'
                    }, 300, 'ease', function() {
                        page4Dom.$jinmao.find('.icon-jinmao').addClass('hide')
                        page4Dom.$jinmao.find('.icon-jinmao-hold').removeClass('hide')
                        page4Dom.$flagWrap.find('.icon-flag').addClass('down')
                    })
                }
            })
            page4Dom.$timepoint.animate({
                left: bodyW / 2 - 35 + 'px'
            }, 7500, function() {
                page4Dom.$timepoint.addClass('scale')
                page4Dom.$timepoint.find('p').removeClass('none')
            })
            page4Dom.$well.addClass('disappear')

        })
    })

    /*---------------------  第四屏  --------------------*/
    var page4AniEvent = {
            '.page4 .screen1 .icon-flag': function() {
                View.action.fire('flag:down')
            },
            '.page4 .screen1 .icon-castle-wrap': function() {
                View.action.fire('castle:show')
            },
            '.page4 .screen1 .icon-castle-flag-wrap': function() {
                View.action.fire('flag:up')
            }
        }
        //注册动画回调事件
    delegate($('.page4')[0], 'webkitTransitionEnd', page4AniEvent)


    View.action.on('flag:down', function() {
        page4Dom.$jinmao.addClass('flip')
        page4Dom.$jinmao.find('.icon-jinmao-hold').animate({
            top: '190px'
        }, 1000, 'ease', function() {

        })
        page4Dom.$jinmao.find('.icon-jinmao').animate({
            top: '190px'
        }, 1000, 'ease', function() {
            page4Dom.$jinmao.removeClass('flip').animate({
                bottom: '312px',
                left: bodyW / 2 - jinmaoW / 2 + 'px',
            }, 300, 'ease', function() {
                page4Dom.$flagWrap.animate({
                    left: '-100px'
                }, 1800, 'linear')
                page4Dom.$castle.css('left', (bodyW / 2 - castleW / 2) + 'px')
                page4Dom.$cflag.css('left', (bodyW / 2 - castleW / 2) + 'px')
            })
            page4Dom.$jinmao.find('.icon-jinmao-hold').addClass('hide')
            page4Dom.$jinmao.find('.icon-jinmao').removeClass('hide').addClass('anim-jinmao')
            page4Dom.$bg.removeClass('pause')

        })

    })
    View.action.on('castle:show', function() {
        //
        if (parseInt(page4Dom.$castle.css('left')) == parseInt(bodyW / 2 - castleW / 2)) {
            page4Dom.$bg.addClass('pause')
            page4Dom.$jinmao.addClass('hide')
            page4Dom.$cflag.css({
                'bottom': '175px',
                'opacity': 1
            });
        }
    })
    View.action.on('flag:up', function() {

        setTimeout(function() {
            page4Dom.$gspeed1.removeClass('none')
            page4Dom.$gspeed2.removeClass('hide')
            page4Dom.$cflag.animate({
                scale: '.4'
            }, 500, 'ease')
            page4Dom.$castle.animate({
                scale: '.4'
            }, 500, 'ease', function() {
                page4Dom.$gspeed1.addClass('none')
                page4Dom.$gspeed2.addClass('none')
                page4Dom.$vipTitle.removeClass('none')
                page4Dom.$vipBtn.removeClass('none')
                page4Dom.$bg.find('.icon-cloud').animate({
                    opacity: 0
                }, 300)
                page4Dom.$bg.find('.icon-mountain').animate({
                    opacity: 0
                }, 300)

                var fworks = new Fireworks("fire-canvas");

            })
        }, 500)


    })
})