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

    //*************工具栏部分*************
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