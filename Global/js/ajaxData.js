//ajax全局事件调用
var ajaxGloble = function() {
    $.ajaxSetup({ //设置全局性的Ajax选项
        type: "POST",
        timeout: 30000, //超时时间设置，单位毫秒
        dataType: "json"
    })
    var index;
    var loadTimeOut = true;
    $(document).ajaxStart(function() {
        //超过500毫秒才会显示加载层
        setTimeout(function() {
            if (loadTimeOut) {
                window.top.$(".loadingBox.ajax", window.top.document).show();
            }

        }, 500);
    }).ajaxSuccess(function(e, xhr, o) {
        //判断返回状态是否为真
        if (xhr.responseJSON.result == true) {
            if (xhr.responseJSON.message != "" && xhr.responseJSON.message != null) {
                parent.layer.msg(xhr.responseJSON.message, {
                    icon: 6,
                    offset: 't',
                    anim: 4
                });
            }
        }
        //判断返回状态是否为否
        if (xhr.responseJSON.result == false) {
            parent.layer.msg(xhr.responseJSON.message, {
                icon: 5,
                offset: 't',
                anim: 6
            });
            if (xhr.responseJSON.direct) {
                window.location.href = xhr.responseJSON.direct;
            }
        }
    }).ajaxError(function(e, xhr, o) {
        if (xhr.statusText == "abort") {
            return;
        }

        if (xhr.statusText == "timeout") {
            parent.layer.msg("访问超时！", {
                icon: 5,
                offset: 't',
                anim: 6
            });
        } else {
            parent.layer.msg(xhr.statusText, {
                icon: 5,
                offset: 't',
                anim: 6
            });
        }
        //layer.close(index);
        loadTimeOut = false;
        window.top.$(".loadingBox.ajax", window.top.document).hide();
    }).ajaxComplete(function(e, xhr, o) {

    }).ajaxStop(function() {
        //layer.close(index);
        loadTimeOut = false;
        window.top.$(".loadingBox.ajax", window.top.document).hide();
    });
}


var ajaxData = function(url, option) {
    ajaxGloble();
    var _defaults = {
        url: url,
        type: 'POST',
        async: true,
        global: true,
        beforeSend: function(xhr) {
            var _ticket = $.cookie('Ticket');
            if (_ticket) {
                xhr.setRequestHeader('Authorization', 'BasicAuth ' + _ticket);
            }
        },
        success: function(result) {
            return result;
        },
        error: function(e) {
            return e;
        }
    }

    var opts = $.extend({}, _defaults, option);
    opts.url = getUrl(opts.url);
    return $.ajax(opts);
}


// var hostUrl = 'http://localhost:64573/';
var hostUrl = 'http://localhost/webDmsApi/';
var getUrl = function(url) {
    return hostUrl + url;
}