$(function() {
    //*************初始化***************
    //初始化窗口模式
    BaseFun.Initialize.windowModelFun();


    //*************侧栏部分*************

    //菜单顶部点击折叠
    $(".top_nav").on('click', BaseFun.collapse);

    //一级菜单点击事件
    $(".side_bar>.menu>ul>li").on('click', BaseFun.menuItem);

    //一级菜单折叠时移动事件
    $(".side_bar>.menu>ul>li").hover(BaseFun.menuItemHover);

    //二级菜单点击事件 
    //$('.menu_item').on('click', BaseFun.menuItemSub);


    //*************工具栏部分*************

    //点击TAB关闭相对应页面
    // $('.J_menuTabs').on('click', '.J_menuTab i', BaseFun.closeTab);

    //激活页面
    // $('.J_menuTabs').on('click', '.J_menuTab', BaseFun.activeTab);

    //切换主题颜色
    $('.J-color-model').on('click', BaseFun.checkColor);

    //切换窗口模式
    $(".J-window-model").on('click', BaseFun.switchWindow);

    //左移按扭
    $('.J_tabLeft').on('click', BaseFun.scrollTabLeft);

    //右移按扭
    $('.J_tabRight').on('click', BaseFun.scrollTabRight);

    //定位到当前选项卡
    $('.J_tabShowActive').on('click', BaseFun.showActiveTab);

    //关闭全部
    $('.J_tabCloseAll').on('click', BaseFun.closeAllTabs);

    //关闭其它
    $('.J_tabCloseOther').on('click', BaseFun.closeOtherTabs);
});


var BaseFun = {
    //全局变量，0代表多窗口，1代表单窗口
    varName: {
        windowModel: 0,
    },
    //初始化
    Initialize: {
        windowModelFun: function() {
            if (localStorage.getItem("windowModel")) {
                BaseFun.varName.windowModel = localStorage.getItem("windowModel");
            }
            if (BaseFun.varName.windowModel == 0) {
                $(".main_tabs").css("display", "block");
                $(".J_mainContent").css("height", "calc(100% - 73px)");
                $(".J-window-model").html("<i class='fa fa-window-maximize'></i> 切换单窗口");
            } else {
                $(".main_tabs").css("display", "none");
                $(".J_mainContent").css("height", "calc(100% - 36px)");
                $(".J-window-model").html("<i class='fa fa-window-restore'></i> 切换多窗口");
            }
        }
    },
    //菜单顶部点击折叠
    collapse: function() {
        $(".side_bar .menu").animate({ opacity: '0' }, 0);
        if ($("body").hasClass("mini-navbar")) {
            $(".side_bar").animate({ "width": "180px" }, 200);
            $(".main").animate({ marginLeft: "180px" }, 200);
        } else {
            $(".side_bar").animate({ "width": "60px" }, 200);
            $(".main").animate({ marginLeft: "60px" }, 200);
        }

        $(".side_bar .menu").animate({ opacity: '1' }, 500);
        $("body").toggleClass("mini-navbar");
    },
    //一级菜单点击事件
    menuItem: function() {
        var speed = 200;
        var liMenuNew = $(this); //第一级菜单项
        var ulMenuSubNew = liMenuNew.children("ul"); //第二级菜单项

        var liMenuOld = $(".side_bar>.menu>ul>li.active").not(liMenuNew);
        var ulMenuSubOld = liMenuOld.children("ul");

        ulMenuSubOld.animate({
            height: 'toggle',
            opacity: 'toggle'
        }, speed);
        liMenuOld.removeClass("active");
        ulMenuSubOld.attr("expanded", false);
        liMenuOld.find(".arrow").removeClass("fa-angle-down");

        ulMenuSubNew.animate({
            height: 'toggle',
            opacity: 'toggle'
        }, speed);
        liMenuNew.toggleClass("active");
        liMenuNew.find(".arrow").toggleClass("fa-angle-down");

        if (liMenuNew.hasClass('active')) {
            ulMenuSubNew.attr("expanded", true);

        } else {
            ulMenuSubNew.attr("expanded", false);

        }
    },
    //二级菜单点击事件
    menuItemSub: function() {
        var dataIndex = $(this).attr("data-index");
        var menuName = $.trim($(this).text());
        var dataUrl = $(this).attr("href");
        var flag = true;

        //单窗口时全部删除
        if (!$(".main_tabs").is(':visible')) {
            $('.page-tabs-content').children("[data-id]").not(":first").each(function() {
                $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
                $(this).remove();
            });
        }

        //增加激活样式
        $(".menu_item.active").removeClass("active");
        $(this).addClass("active");

        //页面存在时重新加载
        if ($(".main_tabs").is(':visible')) {
            $('.J_menuTab').each(function() {
                if ($(this).data('id') == dataIndex) {
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                        BaseFun.scrollToTab(this);
                    }
                }
            });
        }


        $('.J_mainContent .J_iframe').each(function() {
            if ($(this).data('id').toString() == dataIndex) {
                $(this).show().siblings('.J_iframe').hide();
                //重新加载
                $(this).attr('src', dataUrl).load(function() {});
                flag = false;
            }
        });

        // 添加选项卡对应的iframe
        if (flag) {
            var new_iframe = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataIndex + '" seamless></iframe>';
            $('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(new_iframe);


            // $('.J_mainContent iframe:visible').load();

            var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataIndex + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
            $('.J_menuTab').removeClass('active');
            $('.J_menuTabs .page-tabs-content').append(str);
        }
        return false;
    },
    //折叠时移动事件
    menuItemHover: function() {
        if (!$("body").hasClass("mini-navbar")) {
            return;
        }

        $("ul", this).css("top", $(this).offset().top + "px");
    },
    //判断浏览器是否支持html5本地存储    
    localStorageSupport: function() {
        return (('localStorage' in window) && window['localStorage'] !== null)
    },
    //点击TAB关闭相对应页面
    closeTab: function() {
        var closeTabId = $(this).parents('.J_menuTab').data('id');

        // 当前元素处于活动状态
        if ($(this).parents('.J_menuTab').hasClass('active')) {
            // 当前元素后面有同辈元素，使后面的一个元素处于活动状态
            if ($(this).parents('.J_menuTab').next('.J_menuTab').size()) {
                var activeId = $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').data('id');
                $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').addClass('active');
                $('.J_mainContent .J_iframe').each(function() {
                    if ($(this).data('id') == activeId) {
                        $(this).show().siblings('.J_iframe').hide();
                        return false;
                    }
                });

                //  移除当前选项卡
                $(this).parents('.J_menuTab').remove();
                // 移除tab对应的内容区
                $('.J_mainContent .J_iframe').each(function() {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
            }

            // 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
            if ($(this).parents('.J_menuTab').prev('.J_menuTab').size()) {
                var activeId = $(this).parents('.J_menuTab').prev('.J_menuTab:last').data('id');
                $(this).parents('.J_menuTab').prev('.J_menuTab:last').addClass('active');
                $('.J_mainContent .J_iframe').each(function() {
                    if ($(this).data('id') == activeId) {
                        $(this).show().siblings('.J_iframe').hide();
                        return false;
                    }
                });

                //  移除当前选项卡
                $(this).parents('.J_menuTab').remove();

                // 移除tab对应的内容区
                $('.J_mainContent .J_iframe').each(function() {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
            }
        } else {
            //  移除当前选项卡
            $(this).parents('.J_menuTab').remove();

            // 移除相应tab对应的内容区
            $('.J_mainContent .J_iframe').each(function() {
                if ($(this).data('id') == closeTabId) {
                    $(this).remove();
                    return false;
                }
            });
            BaseFun.scrollToTab($('.J_menuTab.active'));
        }
        return false;
    },
    //激活页面
    activeTab: function() {
        var dataId = $(this).attr("data-id");
        if ($(".main_tabs").is(':visible') || $(this).attr("data-id") == "0") {
            // 选项卡菜单已存在
            $('.J_menuTab').each(function() {
                if ($(this).data('id') == dataId) {
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                        BaseFun.scrollToTab(this);
                        // 显示tab对应的内容区
                        $('.J_mainContent .J_iframe').each(function() {
                            if ($(this).data('id') == dataId) {
                                $(this).show().siblings('.J_iframe').hide();
                                return false;
                            }
                        });
                    }
                    flag = false;
                    return false;
                }
            });
        }
    },
    //切换窗口模式
    switchWindow: function() {
        if (BaseFun.varName.windowModel == 0) {
            localStorage.setItem("windowModel", 1);
        } else {
            localStorage.setItem("windowModel", 0);
        }
        BaseFun.Initialize.windowModelFun();
    },
    //切换主题颜色
    checkColor: function() {
        less.modifyVars({
            'color-base': $('.input_color').val()
        });
    },
    //左移按扭
    scrollTabLeft: function() {
        var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
        // 可视区域非tab宽度
        var tabOuterWidth = BaseFun.calSumWidth($(".main_tabs").children().not(".J_menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".main_tabs").outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content").width() < visibleWidth) {
            return false;
        } else {
            var tabElement = $(".J_menuTab:first");
            var offsetVal = 0;
            while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) { //找到离当前tab最近的元素
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).next();
            }
            offsetVal = 0;
            if (BaseFun.calSumWidth($(tabElement).prevAll()) > visibleWidth) {
                while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).prev();
                }
                scrollVal = BaseFun.calSumWidth($(tabElement).prevAll());
            }
        }
        $('.page-tabs-content').animate({
            marginLeft: 0 - scrollVal + 'px'
        }, "fast");
    },
    //右移按扭
    scrollTabRight: function() {
        var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
        // 可视区域非tab宽度
        var tabOuterWidth = BaseFun.calSumWidth($(".main_tabs").children().not(".J_menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".main_tabs").outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content").width() < visibleWidth) {
            return false;
        } else {
            var tabElement = $(".J_menuTab:first");
            var offsetVal = 0;
            while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) { //找到离当前tab最近的元素
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).next();
            }
            offsetVal = 0;
            while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).next();
            }
            scrollVal = BaseFun.calSumWidth($(tabElement).prevAll());
            if (scrollVal > 0) {
                $('.page-tabs-content').animate({
                    marginLeft: 0 - scrollVal + 'px'
                }, "fast");
            }
        }
    },
    //定位到当前选项卡
    showActiveTab: function() {
        BaseFun.scrollToTab($('.J_menuTab.active'));
    },
    //关闭全部
    closeAllTabs: function() {
        $('.page-tabs-content').children("[data-id]").not(":first").each(function() {
            $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
            $(this).remove();
        });
        $('.page-tabs-content').children("[data-id]:first").each(function() {
            $('.J_iframe[data-id="' + $(this).data('id') + '"]').show();
            $(this).addClass("active");
        });
        $('.page-tabs-content').css("margin-left", "0");
    },
    //关闭其它
    closeOtherTabs: function() {
        $('.page-tabs-content').children("[data-id]").not(":first").not(".active").each(function() {
            $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
            $(this).remove();
        });
        $('.page-tabs-content').css("margin-left", "0");
    },
    //工具栏定位
    scrollToTab: function(element) {
        var marginLeftVal = BaseFun.calSumWidth($(element).prevAll()),
            marginRightVal = BaseFun.calSumWidth($(element).nextAll());
        // 可视区域非tab宽度
        var tabOuterWidth = BaseFun.calSumWidth($(".main_tabs").children().not(".J_menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".main_tabs").outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content").outerWidth() < visibleWidth) {
            scrollVal = 0;
        } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
            if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
                scrollVal = marginLeftVal;
                var tabElement = element;
                while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
                    scrollVal -= $(tabElement).prev().outerWidth();
                    tabElement = $(tabElement).prev();
                }
            }
        } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
            scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
        }
        $('.page-tabs-content').animate({
            marginLeft: 0 - scrollVal + 'px'
        }, "fast");
    },
    //计算元素集合的总宽度
    calSumWidth: function(elements) {
        var width = 0;
        $(elements).each(function() {
            width += $(this).outerWidth(true);
        });
        return width;
    }
}